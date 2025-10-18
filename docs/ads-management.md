# Guide de gestion des annonces

Ce document s'adresse à l'équipe marketing pour alimenter le bandeau publicitaire d'Aa Predictor.

## Format des visuels
- Dimensions recommandées : **970 × 250 px** (bannière large) avec une zone centrale lisible.
- Poids maximal : **200 Ko** avec compression web (JPEG haute qualité ou PNG optimisé).
- Maintenir une marge interne de 16 px pour éviter les coupes sur mobile.

## Champs requis lors de la création
- **Titre** : utilisé pour les rapports et l'accessibilité (max 120 caractères).
- **Image URL** : lien HTTPS pointant vers le visuel optimisé.
- **Destination URL** : page d'atterrissage (HTTPS obligatoire).
- **Couleur de fond** (optionnelle) : hexadécimal `#RRGGBB` pour harmoniser le bandeau.
- **Label** (optionnel) : court libellé (ex. `Masterclass`, `Offre limitée`).
- **Texte alternatif** : description concise du visuel pour l'accessibilité.
- **Fenêtre de diffusion** : dates de début/fin si l'annonce est saisonnière.
- **Poids** : priorité d'affichage (0-100). Plus le poids est élevé, plus l'annonce est servie.

## Suivi des performances
- Les impressions sont enregistrées à chaque affichage du bandeau.
- Les clics sont traqués à l'ouverture du lien.
- Les métriques sont visibles via l'endpoint `GET /api/ads`.

## Processus recommandé
1. Optimiser le visuel (taille/poids) et déposer l'image sur un CDN fiable.
2. Créer l'annonce via l'interface back-office ou la commande API.
3. Vérifier l'affichage sur desktop/tablette/mobile.
4. Surveiller les métriques (impressions/clics) et ajuster le poids si nécessaire.
5. Désactiver ou planifier la fin de diffusion via `PATCH /api/ads/{id}`.
