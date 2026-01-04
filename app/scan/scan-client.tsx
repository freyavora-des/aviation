"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createWorker } from "tesseract.js";

type Detected = {
  program?: string;
  category?: string;
  last4?: string;
  rawText?: string;
};

const PROGRAM_PATTERNS: Array<{ program: string; category: string; re: RegExp }> = [
  { program: "Priority Pass", category: "priority-pass", re: /\bpriority\s+pass\b/i },
  { program: "Amex Platinum", category: "credit", re: /\b(platinum)\b/i },
  { program: "Centurion", category: "credit", re: /\bcenturion\b/i },
  { program: "Visa Infinite", category: "credit", re: /\bvisa\s+infinite\b/i },
  { program: "Mastercard World Elite", category: "credit", re: /\bworld\s+elite\b/i },
];

function guessProgram(text: string): Detected {
  for (const p of PROGRAM_PATTERNS) {
    if (p.re.test(text)) return { program: p.program, category: p.category };
  }
  return {};
}

function extractLast4(text: string): string | undefined {
  // Only capture "last 4" candidates; never store full PAN.
  // Looks for patterns like "1234" or "... 1234" near card-like digits.
  const digits = text.replaceAll(/\s+/g, " ");
  const candidates = digits.match(/\b(\d{4})\b/g);
  if (!candidates || candidates.length === 0) return undefined;
  return candidates[candidates.length - 1];
}

export default function ScanClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<string>("");
  const [detected, setDetected] = useState<Detected>({});
  const [busy, setBusy] = useState(false);

  const canSave = useMemo(() => Boolean(detected.program && detected.category), [detected]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        for (const t of streamRef.current.getTracks()) t.stop();
        streamRef.current = null;
      }
    };
  }, []);

  async function startCamera() {
    setStatus("Starting camera…");
    setDetected({});
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("Camera ready. Tap “Scan”.");
    } catch {
      setStatus("Could not access camera. Use manual entry instead.");
    }
  }

  async function scanFrame() {
    if (!videoRef.current || !canvasRef.current) return;
    setBusy(true);
    setStatus("Scanning (OCR)…");
    setDetected({});

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);

    // Light contrast boost
    const img = ctx.getImageData(0, 0, w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const r = img.data[i] ?? 0;
      const g = img.data[i + 1] ?? 0;
      const b = img.data[i + 2] ?? 0;
      const v = 0.299 * r + 0.587 * g + 0.114 * b;
      const boosted = Math.max(0, Math.min(255, (v - 128) * 1.2 + 128));
      img.data[i] = boosted;
      img.data[i + 1] = boosted;
      img.data[i + 2] = boosted;
    }
    ctx.putImageData(img, 0, 0);

    try {
      const worker = await createWorker("eng");
      const {
        data: { text },
      } = await worker.recognize(canvas);
      await worker.terminate();

      const raw = (text ?? "").trim();
      const g = guessProgram(raw);
      const last4 = extractLast4(raw);
      setDetected({ ...g, last4, rawText: raw });
      setStatus(g.program ? `Detected: ${g.program}` : "Couldn’t detect a known program. Try again or use manual entry.");
    } catch {
      setStatus("OCR failed. Try again with better lighting.");
    } finally {
      setBusy(false);
    }
  }

  async function saveDetected() {
    if (!detected.program || !detected.category) return;
    setBusy(true);
    setStatus("Saving…");

    const fd = new FormData();
    fd.set("category", detected.category);
    fd.set("program", detected.program);
    fd.set("label", detected.program);
    if (detected.last4) fd.set("last4", detected.last4);
    fd.set("source", "scan");

    const resp = await fetch("/api/cards?next=/lounges", { method: "POST", body: fd });
    if (resp.redirected) window.location.href = resp.url;
    else window.location.href = "/lounges";
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="relative aspect-video">
          <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-40 w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-skybrand-400/70 bg-skybrand-50/10" />
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void startCamera()}
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-skybrand-300"
          disabled={busy}
        >
          Start camera
        </button>
        <button
          type="button"
          onClick={() => void scanFrame()}
          className="rounded-md bg-skybrand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-skybrand-500 disabled:opacity-60"
          disabled={busy}
        >
          Scan
        </button>
        <button
          type="button"
          onClick={() => void saveDetected()}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
          disabled={busy || !canSave}
        >
          Save
        </button>
        <Link
          href="/cards/new?next=/lounges"
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-skybrand-300"
        >
          Enter manually
        </Link>
      </div>

      {status ? (
        <div className="rounded-lg border border-skybrand-200/40 bg-skybrand-50 px-4 py-3 text-sm text-slate-700">
          {status}
        </div>
      ) : null}

      {detected.rawText ? (
        <details className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          <summary className="cursor-pointer font-semibold text-slate-900">OCR details</summary>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-600">{detected.rawText}</pre>
        </details>
      ) : null}
    </div>
  );
}

