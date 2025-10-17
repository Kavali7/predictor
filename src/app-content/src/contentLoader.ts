import i1 from '../content/individual/1.json';
import i2 from '../content/individual/2.json';
import i3 from '../content/individual/3.json';
import i4 from '../content/individual/4.json';
import i5 from '../content/individual/5.json';
import i6 from '../content/individual/6.json';
import i7 from '../content/individual/7.json';
import i8 from '../content/individual/8.json';
import i9 from '../content/individual/9.json';

import c1 from '../content/couple/1.json';
import c2 from '../content/couple/2.json';
import c3 from '../content/couple/3.json';
import c4 from '../content/couple/4.json';
import c5 from '../content/couple/5.json';
import c6 from '../content/couple/6.json';
import c7 from '../content/couple/7.json';
import c8 from '../content/couple/8.json';
import c9 from '../content/couple/9.json';

export type IndividualReport = typeof i1;
export type CoupleReport = typeof c1;

const indMap: Record<number, IndividualReport> = {1:i1,2:i2,3:i3,4:i4,5:i5,6:i6,7:i7,8:i8,9:i9};
const cplMap: Record<number, CoupleReport> = {1:c1,2:c2,3:c3,4:c4,5:c5,6:c6,7:c7,8:c8,9:c9};

export const getIndividualReport = (n: number): IndividualReport => {
  const rep = indMap[n];
  if (!rep) throw new Error('Individual report not found: ' + n);
  return rep;
};

export const getCoupleReport = (n: number): CoupleReport => {
  const rep = cplMap[n];
  if (!rep) throw new Error('Couple report not found: ' + n);
  return rep;
};
