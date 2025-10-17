# Tache 7 · Sections de contenu enrichies

## Objectif
Ajouter des sections editoriales modernes qui augmentent la confiance et le temps passe: temoignages, FAQ, Fonctionnement, galerie, blog teaser.

## Livrables
- `TestimonialsSection`, `HowItWorksSection`, `FaqSection`, `ResourceCards`.
- Donnees en JSON dans `src/content`.
- Images compressees (webp).
- CTA secondaires (blog, ressources gratuites).

## Etapes detaillees
1. Creer un dossier `src/content/marketing` pour stocker arrays (temoignages, faqs).
2. Implementer `TestimonialsSection`:  
   - Carousel auto (Swiper ou `keen-slider`).  
   - Cartes `bg-surface shadow-xl`.
3. `HowItWorksSection`: 3 etapes (Decouvrir → analyser → partager) avec icones lineaires.
4. `FaqSection`: accordions (Headless UI `Disclosure`).
5. Ajouter une `ResourceCards` grid (3 cartes) menant a des contenus plus longs (Notion, PDF).
6. Integrer ces sections dans `App` apres `ResultPanel`.
7. Verifier cohérence responsive.
8. Ajouter tests d'instantane via `@testing-library/react`.

## Definition of Done
- Sections visibles, textes placeholders valides.
- Temoignages animes sans ralentir la page.
