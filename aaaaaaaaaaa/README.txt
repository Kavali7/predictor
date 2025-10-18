Numerology JSON Content (FR)
===========================

Dossiers
--------
- content/individual/1.json..9.json : rapports individuels
- content/couple/1.json..9.json    : rapports de couple
- schema/*.json                    : JSON Schemas (validation)
- src/numerology.ts                : fonctions de calcul (TS)
- src/contentLoader.ts             : chargeurs de contenu (TS)

Intégration (Expo React Native)
-------------------------------
1. Place ce dossier dans ton projet, par ex. ./app-content/
2. Active l'import de JSON (par défaut OK avec TypeScript).
3. Exemple d'usage:

   import { personalNumber, coupleNumber, compatScore } from './app-content/src/numerology';
   import { getIndividualReport, getCoupleReport } from './app-content/src/contentLoader';

   const a = personalNumber('1990-07-15', 'Alice', 'Durand'); // 1..9
   const b = personalNumber('1992-03-02', 'Bob', 'Martin');   // 1..9
   const c = coupleNumber(a, b);                               // 1..9
   const score = compatScore(a, b, c);                         // 40..100

   const repA = getIndividualReport(a);
   const repB = getIndividualReport(b);
   const repCpl = getCoupleReport(c);

Édition
-------
- Modifie directement les fichiers JSON pour corriger un rapport.
- Les schémas JSON (schema/*.json) documentent les champs requis.
- Ajoute des champs si besoin : le loader les passera tels quels.

Avertissement
-------------
Pratique spirituelle / bien-être : ce contenu ne remplace pas un avis médical, psychologique ou juridique.
Dernière mise à jour: 2025-10-17
