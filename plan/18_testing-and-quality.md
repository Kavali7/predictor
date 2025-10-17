# Tache 18 · Tests et qualite logicielle

## Objectif
Mettre en place une strategie de tests multi-niveaux et des outils de qualite (lint, format, audit perf) pour securiser le delivery.

## Livrables
- ESLint + Prettier codes communs front/back.
- Vitest + React Testing Library (front).
- Vitest/Jest (back).
- Playwright pour E2E critique.

## Etapes detaillees
1. Installer ESLint config (ex: `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-prettier`).
2. Ajouter `.eslintrc.cjs` partage (monorepo config).
3. Configurer Prettier + `npm run lint` + `npm run format`.
4. Mettre en place `vitest` front (`npm install -D vitest @testing-library/react jsdom`).
5. Ajouter tests pour Hero, Calculator, ResultPanel, ShareFlow, AdBanner.
6. Coté backend, utiliser `vitest --config vitest.config.ts`.
7. Installer Playwright (`npx playwright install`), ecrire scenario:  
   - Lancer site, remplir formulaires, generer resultats, partager, verifier banner.
8. Configurer coverage (80% minimum).
9. Mettre en place `npm run test:ci` script.

## Definition de Done
- Pipelines de tests passent.
- Rapport coverage >80%.
- Documentation tests accessible.
