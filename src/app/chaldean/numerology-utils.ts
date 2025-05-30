// Utility: get all digits of a number as array
export function getDigits(num: number): number[] {
  return num.toString().split('').map(Number);
}
// src/app/chaldean/numerology-utils.ts

// Utility functions for numerology calculations (Pythagorean, Vedic, Personal Year, etc.)
// Enhanced for multi-part names, advanced reduction, and basic locale support

// Remove diacritics and normalize to A-Z
function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase();
}

export function reduceToSingleDigit(num: number, allowMaster = true): number {
  // Also allow compound numbers (e.g. 13, 14, 19) to be returned if needed
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) break;
    num = num.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

// Returns both the compound (pre-reduction) and reduced number
export function getCompoundAndReduced(num: number, allowMaster = true): { compound: number, reduced: number } {
  let compound = num;
  let reduced = num;
  while (reduced > 9) {
    if (allowMaster && (reduced === 11 || reduced === 22 || reduced === 33)) break;
    reduced = reduced.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return { compound, reduced };
}

// Pythagorean letter chart
const PYTHAGOREAN_CHART: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

export function calculatePythagoreanNumber(name: string): number {
  if (!name.trim()) return 0;
  const norm = normalizeName(name);
  const sum = norm.split('').reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return reduceToSingleDigit(sum);
}

// Advanced: also return compound and reduced
export function calculatePythagoreanNumberAdvanced(name: string): { compound: number, reduced: number } {
  if (!name.trim()) return { compound: 0, reduced: 0 };
  const norm = normalizeName(name);
  const sum = norm.split('').reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return getCompoundAndReduced(sum);
}

export function calculatePythagoreanSoulUrge(name: string): number {
  if (!name.trim()) return 0;
  const norm = normalizeName(name);
  const vowels = 'AEIOU';
  const sum = norm.split('').filter(c => vowels.includes(c)).reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return reduceToSingleDigit(sum);
}

export function calculatePythagoreanSoulUrgeAdvanced(name: string): { compound: number, reduced: number } {
  if (!name.trim()) return { compound: 0, reduced: 0 };
  const norm = normalizeName(name);
  const vowels = 'AEIOU';
  const sum = norm.split('').filter(c => vowels.includes(c)).reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return getCompoundAndReduced(sum);
}

export function calculatePythagoreanPersonality(name: string): number {
  if (!name.trim()) return 0;
  const norm = normalizeName(name);
  const vowels = 'AEIOU';
  const sum = norm.split('').filter(c => !vowels.includes(c)).reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return reduceToSingleDigit(sum);
}

export function calculatePythagoreanPersonalityAdvanced(name: string): { compound: number, reduced: number } {
  if (!name.trim()) return { compound: 0, reduced: 0 };
  const norm = normalizeName(name);
  const vowels = 'AEIOU';
  const sum = norm.split('').filter(c => !vowels.includes(c)).reduce((acc, c) => acc + (PYTHAGOREAN_CHART[c] || 0), 0);
  return getCompoundAndReduced(sum);
}

export function calculateLifePath(birthdate: string): number {
  // Accepts MM/DD/YYYY or YYYY-MM-DD
  if (!birthdate) return 0;
  let digits: number[] = [];
  if (/\d{4}-\d{2}-\d{2}/.test(birthdate)) {
    // ISO format
    digits = birthdate.replace(/[^0-9]/g, '').split('').map(Number);
  } else {
    // fallback: MM/DD/YYYY
    digits = birthdate.replace(/[^0-9]/g, '').split('').map(Number);
  }
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

export function calculatePersonalYear(birthdate: string, now: Date): number {
  // Personal Year: birth month + birth day + current year
  const [month, day] = birthdate.split('/');
  const year = now.getFullYear();
  const digits = `${month}${day}${year}`.split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

export function calculatePersonalMonth(personalYear: number, now: Date): number {
  const month = now.getMonth() + 1;
  return reduceToSingleDigit(personalYear + month);
}

export function calculatePersonalDay(personalMonth: number, now: Date): number {
  const day = now.getDate();
  return reduceToSingleDigit(personalMonth + day);
}
