# Tache 14 · Gestion publicitaire back-office

## Objectif
Gerer les annonces publicitaires du bandeau (crud, activation, analytics basiques) pour permettre a l'equipe marketing d'alimenter le slot.

## Livrables
- Endpoints REST `/api/ads`.
- Table `ads` + table `ad_impressions`.
- Script seed d'annonces.
- Documentation pour l'equipe marketing.

## Etapes detaillees
1. Definir table `ads`:  
   - `id`, `title`, `image_url`, `destination_url`, `background_color`, `is_active`, `weight`, `starts_at`, `ends_at`.
2. Endpoint `GET /api/ads/active` -> renvoie liste filtree (date courante, `is_active`).
3. Endpoint `POST /api/ads` (admin): creation avec validation.
4. Endpoint `PATCH /api/ads/:id` (update) + `DELETE`.
5. Logger les impressions/clics:  
   - `POST /api/ads/:id/impression` (appel depuis front a l'affichage).  
   - `POST /api/ads/:id/click`.
6. Ajouter middleware auth (Tache 16) sur endpoints admin.
7. Ecrire seeds `npm run seed:ads` pour creer 3 annonces.
8. Preparer doc d'utilisation (Markdown) pour proposer guidelines format image (970x250, <200kb).

## Definition de Done
- `GET /api/ads/active` alimente `AdBanner`.
- Logs impressions/clics stockes.
- Tests integration passes.
