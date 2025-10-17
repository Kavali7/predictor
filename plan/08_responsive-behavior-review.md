# Tache 8 · Revue responsive multi devices

## Objectif
Garantir une experience irreprochable sur mobile, tablette, desktop, incluant orientation paysage et grands ecrans 1440px+.

## Livrables
- Checkliste responsive renseignee.
- Corrections Tailwind (breakpoints `sm`, `md`, `lg`, `xl`).
- Captures ecran ou video Loom presentant le rendu.

## Etapes detaillees
1. Definir les breakpoints cibles: 360, 414, 768, 1024, 1280, 1440, 1920.
2. Utiliser `@media (prefers-reduced-motion)` pour limiter animations.
3. Ajuster typographies (`text-balance`, `leading-relaxed` mobile).
4. Revoir grilles:  
   - `Hero`: `flex-col` mobile, `flex-row` desktop.  
   - `Calculator`: collapse sur 1 colonne < 1024px.
5. Tester advertisement slot sur petits ecrans (scroll, sticky).
6. Utiliser `responsive mode` dans Chrome DevTools + `npm run dev`.
7. Documenter les cas limites et correctifs appliques.
8. Ajouter tests visuels via `@chromaui/local` ou `loki` (optionnel mais recommande).

## Definition of Done
- Aucun overflow horizontal.
- Le banner pub reste lisible et non intrusif.
- Rapport partage (doc) signe par design/dev.
