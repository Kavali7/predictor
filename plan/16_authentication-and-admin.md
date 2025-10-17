# Tache 16 · Authentification et espace admin

## Objectif
Protegger les endpoints sensibles (gestion pub, consultation analytics) via un espace admin simple role-based.

## Livrables
- Auth JWT ou session (ex: Lucia, NextAuth, ou auth maison).
- Interface admin (peut etre separate app) pour gerer annonces.
- Roles (`admin`, `editor`).
- Scripts de creation utilisateur.

## Etapes detaillees
1. Choisir strategie auth (ex: `fastify-jwt` + hashed passwords).
2. Ajouter table `users` (`email`, `password_hash`, `role`).
3. Endpoint `POST /auth/login` -> delivre JWT (exp 1h).  
   - Stocker refresh tokens (table `refresh_tokens`).
4. Middleware `verifyAdmin` protege `/api/ads` (POST/PATCH/DELETE).
5. Creer petite interface admin (React + Tailwind) accessible via `/admin`.  
   - Utiliser `react-query` pour fetch.  
   - Forms pour ajouter/modifier annonce, voir stats.
6. Ajouter script `npm run seed:admin` pour generer super admin.
7. Ecrire tests (login succes/erreur, refresh token).
8. Mettre a jour documentation pour procedure de connexion.

## Definition de Done
- Admin peut se connecter et modifier une annonce.
- Tokens securises (HTTPOnly cookie).
- Tests passent.
