# Tache 12 · Endpoints numerologie

## Objectif
Porter la logique numerologique existante vers le backend pour centraliser les calculs et assurer la coherence.

## Livrables
- Module `src/services/numerology.ts` (copie/adaptation du code frontend).
- Endpoints `POST /api/calc/personal`, `POST /api/calc/couple`.
- Tests unitaires sur ces services.

## Etapes detaillees
1. Copier la logique depuis `src/app-content/src/numerology.ts` vers le backend, en conservant les memes fonctions.
2. Ajouter validation zod schema:  
   ```
   z.object({
     date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
     firstName: z.string().min(2),
     lastName: z.string().min(2)
   })
   ```
3. `POST /api/calc/personal` -> renvoyer `{ number, report }` en utilisant contenu (Tache 14 gerera storage).
4. `POST /api/calc/couple` -> renvoyer `{ partnerA, partnerB, couple, score }`.
5. Charger les contenus numerologie depuis fichiers JSON (`import fs/promises` ou pre-load).
6. Ecrire tests Jest ou Vitest backend (`npm install -D vitest tsup`) pour valider diff de calcul.
7. Ajouter swagger doc detaillee (exemples de payload).
8. Mettre en place gestion d'erreurs (date invalide -> 400).

## Definition of Done
- Tests unitaires OK.
- Endpoints renvoient les memes resultats que le frontend actuel.
