import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import {
  fetchCoupleNumerology,
  type CoupleNumerologyResponse,
  type IndividualReport,
  type CoupleReport,
} from '../lib/api/numerologyClient';

export interface PartnerInput {
  firstName: string;
  lastName: string;
  date: string;
}

export interface PartnerResult {
  number: number;
  title: string;
  summary: string;
  report: IndividualReport;
}

export interface CoupleResultView {
  number: number;
  archetype: string;
  dynamic: string;
  report: CoupleReport;
}

export interface CoupleResults {
  partnerA: PartnerResult;
  partnerB: PartnerResult;
  couple: CoupleResultView;
  score: number;
  raw: CoupleNumerologyResponse;
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const MIN_NAME_LENGTH = 2;
const DEBOUNCE_DELAY = 200;

export function useCoupleResults(partnerA: PartnerInput, partnerB: PartnerInput) {
  const [results, setResults] = useState<CoupleResults | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
  const requestKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const isValid = isPartnerValid(partnerA) && isPartnerValid(partnerB);

    if (!isValid) {
      abortOngoingRequest(controllerRef, timeoutRef);
      requestKeyRef.current = null;
      setResults(null);
      return;
    }

    const key = JSON.stringify({ partnerA, partnerB });
    requestKeyRef.current = key;

    abortOngoingRequest(controllerRef, timeoutRef);

    const controller = new AbortController();
    controllerRef.current = controller;

    const timeoutId = globalThis.setTimeout(async () => {
      try {
        const apiResult = await fetchCoupleNumerology(partnerA, partnerB, { signal: controller.signal });
        if (requestKeyRef.current === key) {
          setResults(mapToCoupleResults(apiResult));
        }
      } catch (error) {
        if ((error as DOMException | Error).name === 'AbortError') return;
        console.warn('Erreur de calcul numerologique', error);
        if (requestKeyRef.current === key) {
          setResults(null);
        }
      }
    }, DEBOUNCE_DELAY);

    timeoutRef.current = timeoutId;

    return () => {
      controller.abort();
      globalThis.clearTimeout(timeoutId);
    };
  }, [
    partnerA.firstName,
    partnerA.lastName,
    partnerA.date,
    partnerB.firstName,
    partnerB.lastName,
    partnerB.date,
  ]);

  return results;
}

function isPartnerValid(partner: PartnerInput) {
  return (
    partner.firstName.trim().length >= MIN_NAME_LENGTH &&
    partner.lastName.trim().length >= MIN_NAME_LENGTH &&
    DATE_REGEX.test(partner.date)
  );
}

function abortOngoingRequest(
  controllerRef: MutableRefObject<AbortController | null>,
  timeoutRef: MutableRefObject<ReturnType<typeof globalThis.setTimeout> | null>,
) {
  if (controllerRef.current) {
    controllerRef.current.abort();
    controllerRef.current = null;
  }
  if (timeoutRef.current !== null) {
    globalThis.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
}

function mapToCoupleResults(apiResult: CoupleNumerologyResponse): CoupleResults {
  return {
    partnerA: {
      number: apiResult.partnerA.number,
      title: apiResult.partnerA.report.title,
      summary: apiResult.partnerA.report.summary,
      report: apiResult.partnerA.report,
    },
    partnerB: {
      number: apiResult.partnerB.number,
      title: apiResult.partnerB.report.title,
      summary: apiResult.partnerB.report.summary,
      report: apiResult.partnerB.report,
    },
    couple: {
      number: apiResult.couple.number,
      archetype: apiResult.couple.report.archetype,
      dynamic: apiResult.couple.report.dynamic,
      report: apiResult.couple.report,
    },
    score: apiResult.score,
    raw: apiResult,
  };
}
