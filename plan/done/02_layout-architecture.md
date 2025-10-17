# Tache 2 · Architecture de layout responsive

## Objectif
Construire une structure de page robuste avec un layout reutilisable integrant un header collant, un slot publicitaire rectangulaire en haut, un contenu principal centre et un footer riche.

## Livrables attendus
- Composant `Layout` dans `src/components/Layout.tsx`.
- Sous-composants `Header`, `PromoBannerSlot`, `Footer`.
- Grille responsive definie (max-width 1280px, gutters 24px desktop, 16px mobile).
- Mise a jour de `App.tsx` pour utiliser le layout.

## Etapes detaillees
1. Creer `src/components/layout/Layout.tsx` avec structure:  
   ```
   <div className="min-h-screen bg-background text-slate-900">
     <PromoBannerSlot />
     <Header />
     <main className="mx-auto w-full max-w-6xl px-6 py-10 space-y-12">{children}</main>
     <Footer />
   </div>
   ```
2. `Header` doit inclure logo texte + navigation (ancrages Hero, Calcul, Ressources, FAQ) + bouton CTA `Explorer`. Utiliser `bg-white/90 backdrop-blur`.
3. `PromoBannerSlot` doit reserver 300px x 90px desktop (100% largeur mobile) avec placeholder `AdBanner` (Tache 6 implementera la rotation).
4. Ajouter un `ScrollProgressBar` optionnel (barre fine en haut) pour dynamiser la lecture.
5. `Footer` doit contenir sections contact, mentions legales, liens sociaux, newsletter.
6. Declarer un `PageSection` composant `section` tailwind `space-y-4` pour garantir uniformite.
7. Mettre a jour `App.tsx` pour remplacer `<main>` existant par `<Layout>...</Layout>`.
8. Supprimer les styles legacy qui font doublon avec Tailwind.
9. Tester sur 3 largeurs: 360px, 768px, 1280px via `npm run dev` + devtools.

## Dependencies / pre-requis
- Tache 1 complet

## Definition of Done
- Layout visible avec header fixe, slot publicitaire, main centre, footer riche.
- Pas de scroll horizontal sur mobile.
- Les sections existantes fonctionnent sans regression.
