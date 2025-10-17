export const LETTERS: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};

export const normalizeName = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');

export const reduce1to9 = (n: number): number => {
  if (n <= 0) return 0;
  let x = n;
  while (x > 9) x = x.toString().split('').reduce((a, d) => a + Number(d), 0);
  return x;
};

export const sumDate = (dateISO: string) => {
  const digits = dateISO.replace(/[^0-9]/g, '').split('').map(Number);
  return digits.reduce((a, b) => a + b, 0);
};

export const sumName = (fullName: string) => {
  const s = normalizeName(fullName);
  let total = 0;
  for (const ch of s) total += LETTERS[ch] || 0;
  return total;
};

export const personalNumber = (dateISO: string, firstName: string, lastName: string) => {
  const d = reduce1to9(sumDate(dateISO));
  const n = reduce1to9(sumName(`${firstName} ${lastName}`));
  return reduce1to9(d + n);
};

export const coupleNumber = (a: number, b: number) => reduce1to9(a + b);

export const compatScore = (a: number, b: number, cpl: number) => {
  const diff = Math.abs(a - b);
  const d = Math.min(diff, 9 - diff);
  const base = Math.round(100 - d * 11);
  const bonus: Record<number, number> = {1:5,2:3,3:2,4:0,5:1,6:4,7:-1,8:0,9:2};
  const withBonus = base + (bonus[cpl] ?? 0);
  return Math.max(40, Math.min(100, withBonus));
};
