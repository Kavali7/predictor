# Tache 4 · Experience formulaire calculateur

## Objectif
Transformer le calculateur en experience fluide avec validation temps reel, labels flottants et accompagnement contextuel.

## Livrables
- Composant `CoupleCalculator` isole (`src/components/calculator/CoupleCalculator.tsx`).
- Utilisation de `react-hook-form` + `zod` pour validation.
- Gestion des erreurs UX (messages clairs, focus automatique).
- Datepicker accessible (ex. `@headlessui` + `date-fns`).

## Etapes detaillees
1. Installer libs: `npm install react-hook-form zod @hookform/resolvers date-fns`.
2. Decouper `App.tsx` pour deleguer le calculateur au nouveau composant.
3. Definir un schema `z.object({ firstName: z.string().min(2) ... })`.
4. Creer champs avec `FloatingLabel` (Tailwind: wrapper `relative`, label `absolute`).
5. Ajouter `aria-describedby` pour feedbacks.
6. Implementer formatage auto de date (mask `YYYY-MM-DD`).
7. Ajouter bouton `Comparer` desactive tant que form invalide.
8. Afficher spinner ou skeleton pendant calcul (micro interaction).
9. Ajouter callout `Tip` sur la droite (desktop) reprenant conseils.
10. Proposer un mode `Echange des partenaires` (swap).
11. Mettre en place tests unitaires sur `CoupleCalculator.test.tsx` (React Testing Library).

## Definition of Done
- Aucune erreur console.
- Validation s'affiche correctement.
- Les tests passent via `npm test -- CouplesCalculator`.
