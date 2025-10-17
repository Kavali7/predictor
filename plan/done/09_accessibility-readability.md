# Tache 9 · Accessibilite et lisibilite

## Objectif
Atteindre un score 95+ sur Lighthouse Accessibilite et respecter les bonnes pratiques de lisibilite pour un public large.

## Livrables
- Audit axe DevTools et Lighthouse.
- Ajustements contrastes et roles ARIA.
- Mode contraste renforce (switch).
- Guidelines de contenus (longueur phrases, interlignes).

## Etapes detaillees
1. Installer `@axe-core/react` pour detecter en dev (`npm install @axe-core/react`).
2. Ajouter skip link `Viser directement le contenu`.
3. Controler contrastes (Tailwind `bg-primary/90` + `text-white`).
4. Ajouter `aria-live` sur resultats dynamiques.
5. Implementer toggles `Font size +` (utiliser CSS custom properties `--font-scale`).
6. Ajouter `lang="fr"` sur `<html>` et prevoir `lang` switch (Tache 10).
7. Re-ecrire messages d'erreur (phrases completes, ton bienveillant).
8. Executer Lighthouse (Chrome) et `npm run test-accessibility` si script configure.
9. Documenter checklist WCAG 2.1 AA.

## Definition of Done
- Score >=95 sur Lighthouse.
- Rapport d'audit joint.
- Resultats et formulaires accessibles clavier et lecteur d'ecran.
