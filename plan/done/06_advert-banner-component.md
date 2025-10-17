# Tache 6 · Bannière publicitaire rotative

## Objectif
Implementer un composant publicitaire rectangulaire positionne en haut des pages qui fait defiler des visuels toutes les 5 secondes, clique-tracke et reste performant.

## Livrables
- Composant `AdBanner` (taille 970x250 desktop, 320x100 mobile).
- Hook `useRotatingBanner`.
- Config dynamique (liste d'annonces via props ou API).
- Tracking evenementiel (console placeholder en attendant backend).

## Etapes detaillees
1. Creer `src/components/ads/AdBanner.tsx` avec props `{ items: AdItem[], intervalMs?: number }`.
2. `AdItem` = `{ id, imageUrl, alt, link, background, label }`.
3. `useRotatingBanner` utilise `useEffect` + `setInterval` (5000 ms).  
   - Pause rotation on hover (clear interval, resume on mouse leave).  
   - Reset index sur changement de `items`.
4. Utiliser `aria-live="polite"` pour accessibilite.
5. Prevoir skeleton `animate-pulse` pendant chargement.
6. Ajouter points de controle `Indicators` (progress dots) cliquables.
7. Integrer fallback visuel si `items` vide (message promotion).
8. Declencher `onClick` -> `console.log('ad-click', id)` (remplacera plus tard par tracking backend).
9. Ajouter tests `AdBanner.test.tsx`.
10. Injecter `AdBanner` dans `PromoBannerSlot` (Tache 2), passer un jeu de donnees mock depuis `App`.

## Definition of Done
- La rotation est fluide, sans ecraser le layout.
- Accessible clavier (tab focus, Enter ouvre le lien).
- Animation responsive OK.
