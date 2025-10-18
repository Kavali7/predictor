# Tache 13 · Service de partage et permalien

## Objectif
Permettre la creation de liens partageables stockant les resultats pour consultation ulterieure par les partenaires.

## Livrables
- Endpoint `POST /api/share` (cree un slug unique).
- Endpoint `GET /api/share/:slug`.
- Table `shares` (ou collection) persistant resultats.
- Expiration configurable (ex: 30 jours).

## Etapes detaillees
1. Choisir un generateur de slug (`nanoid`): `npm install nanoid`.
2. Definir schema BDD `shares`:  
   - `id SERIAL`, `slug VARCHAR(12) UNIQUE`, `payload JSONB`, `created_at TIMESTAMP`, `expires_at TIMESTAMP`, `share_channel TEXT`.
3. `POST /api/share`  
   - Input: `results` (structure Tache 5) + `metadata` (channel).  
   - Creer `slug`, stocker `payload`, `expires_at`.  
   - Retourner `{ slug, url }`.
4. `GET /api/share/:slug`  
   - Verifier expiration, renvoyer payload.
5. Ajouter job cron (Tache 17) pour nettoyer slug perimes.
6. Couvrir par tests integration (create + retrieve).
7. Documenter dans OpenAPI (schemas, erreurs: 404 slug, 410 expired).
8. Mettre en place index BDD sur `slug`.

## Definition of Done
- API share operationnelle.
- ShareFlow frontend (Tache 10) peut consommer l'endpoint (mock dans l'attente).
