# Tache 17 · Integration front-back et environnements

## Objectif
Cabler le frontend avec le backend via services typed, gerer les environnements (dev, staging, prod) et assurer la resilence des appels.

## Livrables
- Client API (`src/lib/apiClient.ts`) base sur `fetch` + interceptors.
- Hooks `useShare`, `useAds`, `useCalculations`.
- Gestion des env vars via `import.meta.env`.
- Fallback offline (message degrade).

## Etapes detaillees
1. Definir `VITE_API_URL` (dev/staging/prod) et ajouter a `.env.example`.
2. Creer `apiClient` avec `fetch` wrapper: gestion 401, JSON, timeouts.
3. Implementer `useCalculations` -> `POST /api/calc/...`.
4. `useShare` consomme `POST /api/share` (Tache 13).
5. `useAds` recupere `GET /api/ads/active`, met en cache 5 min.
6. Ajouter `ErrorBoundary` + `RetryButton`.
7. Mettre en place `MSW` (Mock Service Worker) pour tests frontend.
8. Tester integration via `npm run dev` (backend sur 3001, frontend 5173).
9. Documenter la configuration (README).

## Definition de Done
- Frontend communique avec backend en dev (via proxy Vite si besoin).
- Erreurs API affichent message utilisateur clair.
- Tests MSW passent.
