# Design system – V1

## Palette de couleur
- `primary` · `#5B21B6` · violet prune signature (actions principales, accents hero).
- `secondary` · `#0EA5E9` · bleu cyan lumineux (contenu de soutien, badges).
- `accent` · `#F97316` · orange chaleureux (highlight compatibilite, hover states).
- `background` · `#F8FAFC` · gris tres clair (fond global).
- `surface` · `#FFFFFF` · panneaux et cartes.
- `muted` · `#64748B` · textes secondaires, meta.

## Typographie
- Police principale : **Sora** (Google Fonts), fallback `Inter`, `system-ui`.
- Titres : `font-heading` (`Sora` bold).
- Corps : `font-sans` (`Sora/Inter` regular 400–500).
- Interlignage par defaut `leading-relaxed`, intensifie la lisibilite longue.

## Tokens utilitaires
- `shadow-elevate` : `0 20px 45px -15px rgba(91, 33, 182, 0.35)` pour cartes principales.
- `rounded-xl` (~1.1rem) pour cartes, `rounded-lg` pour elements secondaires.
- `tracking-[0.32em]` pour pill label hero.
- `input-field` composant Tailwind personnalise pour champs formulaire.

## Integration
- Tailwind CSS 3.4 configure (`tailwind.config.js`) avec scannage `./index.html` et `./src/**/*`.
- Base CSS reduite : `@tailwind base|components|utilities` + styles globaux dans `src/styles.css`.
- Font Sora importee via Google Fonts (optimisation locale a planifier).
- Theme applique sur `App.tsx` avec container `max-w-5xl`, cartes surfaces degradees.

## Suivi
- Prevoir migration progressive des composants historiques vers classes Tailwind (tache 2+).
- Ajouter un ThemePreview (palette & boutons) quand la bibliotheque UI sera plus mature.
