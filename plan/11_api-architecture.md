# Tache 11 · Architecture backend API

## Objectif
Poser les fondations backend pour desservir le frontend: API REST (ou GraphQL) gerant calculs, partages, pub, analytics.

## Livrables
- Repo ou dossier `server/`.
- Stack Node.js + Fastify (ou Express) + TypeScript.
- Standard d'erreurs JSON + logger (Pino).
- Specification OpenAPI initiale.

## Etapes detaillees
1. Creer dossier `server` et initialiser `npm init -y`.
2. Installer dependances: `npm install fastify fastify-cors fastify-rate-limit zod pino` + dev `ts-node-dev typescript @types/node`.
3. Configurer `tsconfig.json` (baseUrl `src`, `esModuleInterop`).
4. Creer `src/index.ts` avec server Fastify, healthcheck `/health`.
5. Configurer `.env` (PORT, DATABASE_URL, JWT_SECRET).
6. Ecrire specification OpenAPI (`server/openapi.yaml`) listant endpoints:  
   - `POST /api/calc/personal`  
   - `POST /api/calc/couple`  
   - `POST /api/share`  
   - `GET /api/share/:slug`  
   - `GET /api/ads/active`
7. Mettre en place pipeline verification `npm run dev` (fastify).
8. Ajouter middlewares: rate limit, CORS, request logging.
9. Preparer dockerfile simple pour le backend (Node 20 Alpine).

## Definition of Done
- Serveur demarre avec `npm run dev`.
- OpenAPI accessible.
- README server explique comment lancer.
