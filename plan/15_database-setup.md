# Tache 15 · Mise en place base de donnees

## Objectif
Installer et configurer la base relationnelle (PostgreSQL recommande) pour stocker partages, annonces, analytics.

## Livrables
- Docker Compose `docker-compose.yml` (postgres + pgadmin).
- Migration initiale (via Prisma ou Drizzle).
- Variables d'environnement configurees.
- Script `npm run db:migrate`.

## Etapes detaillees
1. Choisir ORM (Prisma recommande). Installer: `npm install prisma @prisma/client`.
2. `npx prisma init` -> configure `.env` `DATABASE_URL`.
3. Ecrire schemas Prisma: `Share`, `Ad`, `AdImpression`.
4. Lancer `npx prisma migrate dev --name init`.
5. Ajouter seed script `prisma/seed.ts`.
6. Mettre en place `docker-compose` avec volume persistant.
7. Documenter procedures (local, staging, prod).
8. Configurer `DATABASE_URL` sur pipeline CI (Tache 19).

## Definition of Done
- Prisma Client generer.
- Migrations appliquées sans erreur.
- Donnees seeds visibles dans `prisma studio`.
