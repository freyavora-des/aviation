export type LoungeType = "lounge" | "service";

export type LoungeRule = {
  label: string;
  value: string;
};

export type Lounge = {
  id: string;
  airportIata: string;
  type: LoungeType;
  name: string;
  terminal: string;
  locationHint: string;
  address: string;
  acceptedPrograms: string[]; // e.g. ["Priority Pass", "Amex Platinum"]
  rules: LoungeRule[];
};

// Demo data to make the UI functional end-to-end.
// Swap this out later for a real lounge dataset/API.
export const LOUNGES: Lounge[] = [
  {
    id: "lax-pp-1",
    airportIata: "LAX",
    type: "lounge",
    name: "The Lounge (Demo)",
    terminal: "Terminal B",
    locationHint: "Airside, near Gate 52",
    address: "1 World Way, Los Angeles, CA 90045",
    acceptedPrograms: ["Priority Pass"],
    rules: [
      { label: "Access window", value: "Up to 3 hours before departure" },
      { label: "Guests", value: "2 guests included (subject to capacity)" },
      { label: "Dress code", value: "Smart casual" },
    ],
  },
  {
    id: "lax-amex-1",
    airportIata: "LAX",
    type: "lounge",
    name: "Skybrand Blue Lounge (Demo)",
    terminal: "Terminal 4",
    locationHint: "Level 3, across from security",
    address: "1 World Way, Los Angeles, CA 90045",
    acceptedPrograms: ["Amex Platinum", "Centurion"],
    rules: [
      { label: "Access window", value: "Same-day boarding pass required" },
      { label: "Guests", value: "Guest policy varies by card tier" },
    ],
  },
  {
    id: "jfk-service-1",
    airportIata: "JFK",
    type: "service",
    name: "JetLag Massage (Demo)",
    terminal: "Terminal 5",
    locationHint: "Landside, near Arrivals",
    address: "Queens, NY 11430",
    acceptedPrograms: ["Visa Infinite", "Mastercard World Elite"],
    rules: [
      { label: "Complimentary", value: "15 min chair massage" },
      { label: "Discount", value: "20% off extended services" },
    ],
  },
];

export function normalizeProgram(s: string) {
  return s.trim().toLowerCase();
}

export function hasAccess(userPrograms: string[], loungePrograms: string[]) {
  const set = new Set(userPrograms.map(normalizeProgram));
  return loungePrograms.some((p) => set.has(normalizeProgram(p)));
}

