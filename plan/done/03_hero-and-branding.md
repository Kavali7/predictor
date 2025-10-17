# Tache 3 · Hero et branding immersif

## Objectif
Creer un hero section captivant qui raconte la promesse numerologie, met en avant le CTA principal et integre visuels modernes (degrade, particules, illustration).

## Livrables
- Composant `HeroSection` dans `src/components/landing/HeroSection.tsx`.
- Assets optimises (SVG background, image couple heureux, pattern etoile).
- CTA principal `Commencer votre lecture`.
- Texte (headline, subhead) valide par marketing.

## Etapes detaillees
1. Rassembler copywriting (headline 8-10 mots, sous-titre 2 phrases, bullet proof).
2. Creer `HeroSection.tsx`:  
   - Container `max-w-5xl mx-auto px-6 py-20 text-center`.  
   - `h1` gradient `from-primary to-secondary`.  
   - Paragraphe comfortable `text-lg text-muted`.  
   - Boutons: `Commencer` (primary), `Decouvrir un extrait` (ghost).
3. Ajouter un background degrade `bg-gradient-to-br from-primary/10 via-white to-secondary/5`.
4. Integre un visuel (SVG ou Lottie) sur la droite en desktop, stacke en mobile.
5. Ajouter `StatHighlights` (utilisateurs, avis, precision) sous le CTA pour rassurer.
6. Connexion du bouton `Commencer` a l'ancre `#simulations` (section du calculateur).
7. Optimiser le hero pour 700px de hauteur, responsive <768px (stack, center).
8. Qualifier les couleurs via `text-balance` (Tailwind plugin) pour faciliter lecture.
9. Ajouter micro animation: fade-in via `framer-motion` ou `@headlessui` (facultatif).  
   - Installer `npm install framer-motion`.
10. Valider accessibilite (contraste 4.5:1 minimum) avec `axe` devtools.

## Definition of Done
- Section hero remplace l'intro brute actuelle.
- CTA scroll vers le calculateur.
- Tests viewport 360/768/1280 OK.
