import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getSqlitePath() {
  const url = process.env["DATABASE_URL"] ?? "file:./dev.db";
  if (!url.startsWith("file:")) {
    throw new Error('DATABASE_URL must start with "file:" for sqlite');
  }
  const raw = url.slice("file:".length);
  const path = raw.startsWith("//") ? raw.slice(2) : raw;
  return path === "" ? "./dev.db" : path;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: getSqlitePath() }),
    log: process.env["NODE_ENV"] === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;

