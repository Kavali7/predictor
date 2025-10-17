# Tache 19 · Pipeline CI/CD et build

## Objectif
Automatiser le build, les tests et le deploiement vers les environnements (staging puis production) pour fiabiliser la livraison.

## Livrables
- Workflow GitHub Actions (ou GitLab CI) pour build/test/lint.
- Build docker multi stage (frontend + backend).
- Deploiement sur plateforme (Vercel/Netlify pour front, Render/Fly.io pour back) ou infrastructure container (AWS ECS).
- Gestion secrets.

## Etapes detaillees
1. Creer `.github/workflows/ci.yml`  
   - Jobs: Install -> Lint -> Test -> Build.  
   - Cache npm (actions/cache).
2. Ajouter job `deploy_staging` sur branch `develop` (apres tests OK).  
   - Frontend: `npm run build`, upload artifacts, deploy Vercel.  
   - Backend: Build docker, push registry, deploy Render.
3. Ajouter job `deploy_prod` triggered par release tag (ou merge `main`).
4. Gestions secrets via GitHub Secrets (API_URL, DATABASE_URL, JWT_SECRET).
5. Configurer notifications (Slack/Email) en cas d'echec.
6. Documenter rollback strategy.
7. Ajouter badge CI dans README.

## Definition de Done
- Workflow s'executent automatiquement.
- Deploiement staging auto apres push develop.
- Deploiement production manual `workflow_dispatch` avec approbation.
