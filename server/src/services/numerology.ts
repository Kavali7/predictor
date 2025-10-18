import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const LETTERS: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

export const personalInputSchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((value) => isValidISODate(value), {
        message: "Invalid date",
      }),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  })
  .strict();

export const coupleInputSchema = z
  .object({
    partnerA: personalInputSchema,
    partnerB: personalInputSchema,
  })
  .strict();

export type PersonalInput = z.infer<typeof personalInputSchema>;
export type CoupleInput = z.infer<typeof coupleInputSchema>;

export interface IndividualReport {
  id: string;
  type: string;
  locale: string;
  number: number;
  version: number;
  updatedAt: string;
  title: string;
  summary: string;
  love: string;
  work: string;
  money: string;
  health: string;
  shadow: string;
  overallAdvice: string;
  luckyMonths: string[];
  keywords: string[];
}

export interface CoupleReport {
  id: string;
  type: string;
  locale: string;
  number: number;
  version: number;
  updatedAt: string;
  archetype: string;
  dynamic: string;
  strengths: string[];
  blindspots: string[];
  conflicts: string[];
  rituals: string[];
  advice: string;
}

export interface PersonalResult {
  number: number;
  report: IndividualReport;
}

export interface CoupleResult {
  partnerA: PersonalResult;
  partnerB: PersonalResult;
  couple: {
    number: number;
    report: CoupleReport;
  };
  score: number;
}

const CONTENT_ROOT = resolveContentRoot();
const INDIVIDUAL_REPORTS = loadReports<IndividualReport>("individual");
const COUPLE_REPORTS = loadReports<CoupleReport>("couple");

export function computePersonal(input: PersonalInput): PersonalResult {
  const number = personalNumber(input.date, input.firstName, input.lastName);
  const report = INDIVIDUAL_REPORTS[number];
  if (!report) {
    throw new Error(`No individual report found for number ${number}`);
  }
  return { number, report };
}

export function computeCouple(input: CoupleInput): CoupleResult {
  const resultA = computePersonal(input.partnerA);
  const resultB = computePersonal(input.partnerB);
  const coupleNumberValue = coupleNumber(resultA.number, resultB.number);
  const coupleReport = COUPLE_REPORTS[coupleNumberValue];
  if (!coupleReport) {
    throw new Error(`No couple report found for number ${coupleNumberValue}`);
  }
  const score = compatScore(resultA.number, resultB.number, coupleNumberValue);

  return {
    partnerA: resultA,
    partnerB: resultB,
    couple: {
      number: coupleNumberValue,
      report: coupleReport,
    },
    score,
  };
}

export function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

export function reduce1to9(n: number): number {
  if (n <= 0) return 0;
  let acc = n;
  while (acc > 9) {
    acc = acc
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return acc;
}

export function sumDate(dateISO: string) {
  const digits = dateISO.replace(/[^0-9]/g, "").split("").map(Number);
  return digits.reduce((total, digit) => total + digit, 0);
}

export function sumName(fullName: string) {
  const normalized = normalizeName(fullName);
  let total = 0;
  for (const char of normalized) {
    total += LETTERS[char] || 0;
  }
  return total;
}

export function personalNumber(dateISO: string, firstName: string, lastName: string) {
  const dateSum = reduce1to9(sumDate(dateISO));
  const nameSum = reduce1to9(sumName(`${firstName} ${lastName}`));
  return reduce1to9(dateSum + nameSum);
}

export function coupleNumber(a: number, b: number) {
  return reduce1to9(a + b);
}

export function compatScore(a: number, b: number, cpl: number) {
  const diff = Math.abs(a - b);
  const distance = Math.min(diff, 9 - diff);
  const base = Math.round(100 - distance * 11);
  const bonus: Record<number, number> = { 1: 5, 2: 3, 3: 2, 4: 0, 5: 1, 6: 4, 7: -1, 8: 0, 9: 2 };
  const withBonus = base + (bonus[cpl] ?? 0);
  return Math.max(40, Math.min(100, withBonus));
}

function resolveContentRoot() {
  const serverRoot = path.resolve(__dirname, "..", "..");
  return path.resolve(serverRoot, "../src/app-content/content");
}

function loadReports<T extends { number: number }>(type: "individual" | "couple") {
  const folder = path.resolve(CONTENT_ROOT, type);
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  const output: Record<number, T> = {};

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const fullPath = path.resolve(folder, entry.name);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const parsed = JSON.parse(raw) as T;
    output[parsed.number] = parsed;
  }

  return output;
}

function isValidISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
}
