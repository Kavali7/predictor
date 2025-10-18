# Backend API – Aa Predictor

## Prérequis
- Node.js 20+
- npm

## Installation
```bash
cd server
npm install
```

## Scripts
- `npm run dev` : démarre le serveur Fastify en mode développement (ts-node-dev).
- `npm run build` : compile TypeScript vers `dist/`.
- `npm start` : lance la version compilée.

## Variables d’environnement
Créer un fichier `.env` à la racine du dossier `server/` :
```
PORT=4000
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=change-me-please
LOG_LEVEL=info
```

## Endpoints
Voir `openapi.yaml` pour la spécification OpenAPI (Swagger).

## Docker
Une image Node 20 Alpine est fournie via `Dockerfile` (build dans `/dist`).
