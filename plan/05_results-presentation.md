# Tache 5 · Presentation des resultats et partage

## Objectif
Mettre en scene les resultats de numerologie en cartes attrayantes, lisibles, avec des invites au partage et des suggestions de prochaine action.

## Livrables
- Composant `ResultPanel`.
- Cartes pour P1, P2, Couple avec couleurs differenciees.
- Modules `ShareModal` et `DownloadSummary` (PDF ou image).
- Section `Prochaines etapes` (CTA vers consultation, partage).

## Etapes detaillees
1. Deplacer la logique `computed` dans un hook `useCoupleResults`.
2. `ResultPanel` doit accepter { results, onShare }.
3. Designer 3 cartes `grid md:grid-cols-3 gap-6` avec degrade `from-primary/20`.
4. Ajouter badges (compatibilite, archetype, score /100).
5. Integrer boutons `Partager`, `Enregistrer en PDF`, `Envoyer par email`.
6. `ShareModal` (Headless UI `Dialog`) propose:  
   - Copie lien (utilise `navigator.clipboard.writeText`).  
   - Partage reseaux (Meta tags og:title, og:description).  
   - Option email (lance `mailto:` pre-rempli).
7. Creer module `generatePdfSummary(results)` (utiliser `pdfmake` ou `jspdf` si scope OK).
8. Ajouter `InsightsList` (3 bullet points) + `RecommendedNextSteps`.
9. Tester affichage multi langues (placeholder pour Tache 9).
10. Couvrir par tests `ResultPanel.test.tsx`.

## Definition of Done
- Les resultats sont lisibles, differencies.
- Bouton partage ouvre une modale fonctionnelle.
- Score formate consistent (0 decimals).
