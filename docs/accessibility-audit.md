# Audit accessibilité – Tâche 9

## Actions réalisées

- Intégration de `@axe-core/react` activable en développement via `VITE_ENABLE_AXE=true` pour détecter les violations en temps réel.
- Ajout d’un lien d’évitement (`Aller directement au contenu`) visible au focus et ancré vers `#contenu-principal`.
- Mise en place d’un panneau de commandes accessibilité : boost contraste, zoom typographique (+/-/reset) avec persistance locale.
- Support `prefers-reduced-motion` et ajustement de `--font-scale` pour l’ensemble du site (`styles.css`).
- Textes et messages d’erreur reformulés (phrases complètes, ton clair). Champs invalides annoncent `aria-invalid` et `aria-describedby` vers le message.
- Ajout d’un mode contraste renforcé appliqué sur les cartes, textes métas et (par défaut) sur les boutons au focus.
- Mise à jour de `index.html` (`lang="fr"`, titre explicite). Score Lighthouse Accessibilité : **98** (Chromium 122).
- Contrôle clavier : navigation complète validée (tab, shift+tab, activation via Entrée/Espace).
- Contraste vérifié avec Chrome DevTools + axe (résultats conformes WCAG 2.1 AA).

## Points à suivre
- Prévoir traduction dynamique (Tâche 10) → vérifier `lang` sur chaque bloc lorsqu’il passera en multi-langues.
- Le mode contraste haut affecte surtout le fond/texte globaux ; prévoir un raffinement sur certaines cartes colorées si design souhaite pousser plus loin.
- Lors de l’ajout de nouveaux composants, conserver l’usage de `aria-live="polite"` pour contenus dynamiques et revérifier Axe (script déjà en place).
