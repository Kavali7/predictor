# Tache 10 · Parcours de partage utilisateur

## Objectif
Faciliter le partage des resultats via une interface dediee (modale, snackbars, reseaux sociaux) pour encourager la diffusion post-experience.

## Livrables
- Composant `ShareResultsFlow`.
- Boutons partage (WhatsApp, Messenger, Email, Copier lien).
- Snackbar confirmation.
- Tracking evenements (frontend).

## Etapes detaillees
1. Integrer `ShareResultsFlow` declenche par le CTA de la Tache 5.
2. Utiliser Web Share API (`navigator.share`) quand disponible.
3. Ajouter fallback modale avec options cliquees -> `window.open`.
4. Preparer slug placeholder (ex: `/partage/slug-temp`) en attendant backend (Tache 13).
5. Ajouter `ShareIllustration` (SVG) pour rendre l'ecran joyeux.
6. Inclure un callout `Invitez votre partenaire` (bouton email).
7. Suivre interactions via `analytics.track('share_clicked', { channel })`.
8. Tester sur iOS Safari et Android Chrome.
9. Ecrire tests `ShareResultsFlow.test.tsx`.

## Definition of Done
- Partage fonctionnel sur desktop + mobile.
- Feedback utilisateur (snackbar) visible.
- Tracking console en attendant branchement analytics.
