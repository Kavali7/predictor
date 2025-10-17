import { useMemo } from 'react';
import { compatScore, coupleNumber, personalNumber } from '../app-content/src/numerology';
import { getCoupleReport, getIndividualReport } from '../app-content/src/contentLoader';

export interface PartnerInput {
  firstName: string;
  lastName: string;
  date: string;
}

export interface CoupleResults {
  partnerA: {
    number: number;
    title: string;
    summary: string;
  };
  partnerB: {
    number: number;
    title: string;
    summary: string;
  };
  couple: {
    number: number;
    archetype: string;
    dynamic: string;
  };
  score: number;
}

export function useCoupleResults(partnerA: PartnerInput, partnerB: PartnerInput) {
  const results = useMemo<CoupleResults | null>(() => {
    if (!partnerA.firstName || !partnerA.lastName || !partnerA.date) return null;
    if (!partnerB.firstName || !partnerB.lastName || !partnerB.date) return null;

    try {
      const numberA = personalNumber(partnerA.date, partnerA.firstName, partnerA.lastName);
      const numberB = personalNumber(partnerB.date, partnerB.firstName, partnerB.lastName);
      const numberCouple = coupleNumber(numberA, numberB);
      const score = compatScore(numberA, numberB, numberCouple);

      const reportA = getIndividualReport(numberA);
      const reportB = getIndividualReport(numberB);
      const reportCouple = getCoupleReport(numberCouple);

      return {
        partnerA: {
          number: numberA,
          title: reportA.title,
          summary: reportA.summary,
        },
        partnerB: {
          number: numberB,
          title: reportB.title,
          summary: reportB.summary,
        },
        couple: {
          number: numberCouple,
          archetype: reportCouple.archetype,
          dynamic: reportCouple.dynamic,
        },
        score,
      };
    } catch (error) {
      console.warn('Erreur de calcul numerologique', error);
      return null;
    }
  }, [partnerA.date, partnerA.firstName, partnerA.lastName, partnerB.date, partnerB.firstName, partnerB.lastName]);

  return results;
}
