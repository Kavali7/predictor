import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const partnerAReport = {
  id: 'individual-7',
  type: 'individual',
  locale: 'fr',
  number: 7,
  version: 1,
  updatedAt: '2025-10-17',
  title: 'Nombre 7 – Le Chercheur',
  summary: 'Introspection, analyse, quête de sens. Besoin d’espace et de profondeur.',
  love: 'Profond mais réservé.',
  work: 'Recherche, data, stratégie.',
  money: 'Prudent et méthodique.',
  health: 'Tendance à l’isolement.',
  shadow: 'Scepticisme excessif.',
  overallAdvice: 'Relier la réflexion à l’action.',
  luckyMonths: ['juillet', 'janvier'],
  keywords: ['analyse', 'intériorité', 'sagesse'],
};

const partnerBReport = {
  ...partnerAReport,
  id: 'individual-2',
  number: 2,
  title: 'Nombre 2 – L’Harmonie',
  summary: 'Coopération, écoute, sensibilité. Besoin de connexion.',
};

const coupleReport = {
  id: 'couple-9',
  type: 'couple',
  locale: 'fr',
  number: 9,
  version: 1,
  updatedAt: '2025-10-17',
  archetype: 'Couple Visionnaire',
  dynamic: 'Votre duo rayonne par son inspiration commune.',
  strengths: ['vision partagée'],
  blindspots: ['idéalisation'],
  conflicts: ['rythme différent'],
  rituals: ['vision board mensuel'],
  advice: 'Canalisez votre inspiration dans des projets concrets.',
};

const defaultCoupleResponse = {
  partnerA: {
    number: 7,
    report: partnerAReport,
  },
  partnerB: {
    number: 2,
    report: partnerBReport,
  },
  couple: {
    number: 9,
    report: coupleReport,
  },
  score: 86,
};

const defaultPersonalResponse = {
  number: 7,
  report: partnerAReport,
};

const createAbortError = () => {
  try {
    return new DOMException('Aborted', 'AbortError');
  } catch {
    const error = new Error('Aborted');
    error.name = 'AbortError';
    return error;
  }
};

const respond = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const fetchMock = vi.fn(
  (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> =>
    new Promise((resolve, reject) => {
      const signal = init.signal;

      if (signal?.aborted) {
        reject(createAbortError());
        return;
      }

      const timer = globalThis.setTimeout(() => {
        try {
          const url =
            typeof input === 'string'
              ? input
              : input instanceof URL
              ? input.toString()
              : input.url;

          if (url.endsWith('/api/calc/couple')) {
            resolve(respond(defaultCoupleResponse));
            return;
          }

          if (url.endsWith('/api/calc/personal')) {
            resolve(respond(defaultPersonalResponse));
            return;
          }

          if (url.endsWith('/api/share') && (init.method ?? 'GET').toUpperCase() === 'POST') {
            resolve(
              respond(
                {
                  slug: 'mock-share',
                  url: 'https://example.com/share/mock-share',
                  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                },
                201,
              ),
            );
            return;
          }

          if (url.includes('/api/share/') && (init.method ?? 'GET').toUpperCase() === 'GET') {
            resolve(
              respond({
                slug: url.split('/').pop(),
                results: defaultCoupleResponse,
                metadata: { channel: 'test' },
                createdAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
              }),
            );
            return;
          }

          resolve(
            respond(
              { message: `No mock implemented for ${url}` },
              500,
            ),
          );
        } catch (error) {
          reject(error);
        }
      }, 5);

      signal?.addEventListener(
        'abort',
        () => {
          globalThis.clearTimeout(timer);
          reject(createAbortError());
        },
        { once: true },
      );
    }),
);

vi.stubGlobal('fetch', fetchMock);
(globalThis as Record<string, unknown>).__TEST_FETCH__ = fetchMock;

if (!('share' in navigator)) {
  Object.defineProperty(navigator, 'share', {
    value: vi.fn().mockResolvedValue(undefined),
    configurable: true,
  });
}

if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
    configurable: true,
  });
} else if (!navigator.clipboard.writeText) {
  (navigator.clipboard as unknown as { writeText: (text: string) => Promise<void> }).writeText =
    vi.fn().mockResolvedValue(undefined);
} else {
  vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => undefined);
}
