# Tache 1 · Design system Tailwind

## Objectif
Installer Tailwind CSS et definir un systeme visuel premium (couleurs, typo, espaces) pour unifier toutes les interfaces et preparer un rendu moderne, lumineux et coherent.

## Livrables attendus
- Tailwind CSS integre avec purge active et PostCSS configure.
- Palette primaire definie dans `tailwind.config.js`.
- Utilitaires globaux relies a une feuille de style minimale (fonts CSS importees).
- Documentation courte (README ou Notion) re-capitulant les decisions.

## Couleurs de reference
- `primary`: `#5B21B6` (Prune profonde).
- `secondary`: `#0EA5E9` (Cyan lumineux).
- `accent`: `#F97316` (Orange chaleur).
- `background`: `#F8FAFC` (Gris tres clair).
- `surface`: `#FFFFFF`.
- `muted`: `#64748B` (Texte secondaire).

## Etapes detaillees
1. Installer les dependances: `npm install -D tailwindcss postcss autoprefixer`.
2. Initialiser la config: `npx tailwindcss init -p`.
3. Mettre a jour `tailwind.config.js`  
   - Entrer `content: ['./index.html', './src/**/*.{ts,tsx}']`.  
   - Ajouter `theme.extend.colors` avec la palette ci-dessus et `fontFamily` (Inter, Sora ou Manrope).
4. Nettoyer `src/styles.css` en ne gardant que les styles utilitaires indispensables (font-face, keyframes) et transferer le reste en classes Tailwind.
5. Ajouter l'import Tailwind en tete de `src/main.tsx` ou `styles.css`:  
   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
6. Configurer une `:root` CSS custom properties pour les couleurs si besoin d'interoperabilite avec des libs non Tailwind.
7. Mettre en place un composant `ThemePreview` (facultatif) pour visualiser la palette (couleurs, boutons, carte, typography).
8. Documenter dans `docs/design-system.md` (ou README) les usages: hierarchie des titres, styles de boutons (`btn-primary`, `btn-ghost`), tokens de spacing (`space-y-6`, `px-6`, etc.).
9. Lancer `npm run dev` et verifier l'injection Tailwind (les classes generent bien le style).
10. Planifier un passage de cleanup pour retirer les anciennes classes inutiles apres migration.

## Dependencies / pre-requis
- Node 18+ (verifier `node -v`).
- Vite deja present (OK).

## Definition of Done
- Tailwind compile sans warning.
- Les nouvelles couleurs sont accessibles via classes (`bg-primary`, `text-muted`...).
- Documentation et filets de test visuel valides par l'equipe produit.
