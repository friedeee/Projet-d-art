# ALAFIA — Le Bénin à votre rythme

Site vitrine d’une agence basée à Cotonou : circuits guidés, galerie d’art
béninois, location de voitures et d’appartements.

## Démarrer

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
npm run lint      # vérification du code (oxlint)
npm run images    # régénérer les images optimisées
```

## Stack

React 19 · Vite · Tailwind CSS 4 · React Router 7 (pages chargées à la demande) ·
react-hook-form + zod (formulaire de contact) · lucide-react (icônes).

## Organisation

```
src/
  config/site.js        Coordonnées (e-mail, téléphone, WhatsApp) — à renseigner
  lib/                  Utilitaires : services, prix, liens de contact
  components/layout/    Navbar, Footer, page d’erreur
  components/common/    Briques réutilisables (cartes, fiche, encadré de réservation…)
  features/<domaine>/   data.js (contenu) + pages/
  routes/index.jsx      Toutes les routes du site
```

## Modifier le contenu

- **Circuits, œuvres, voitures, logements** : `src/features/<domaine>/data.js`.
  Le `slug` forme l’URL (`/circuits/ganvie`) ; `price` est un nombre en FCFA,
  ou `null` pour afficher « Sur devis ».
- **Coordonnées** : `src/config/site.js`. Tant que `phone` ou `whatsapp` vaut
  `null`, les liens correspondants sont masqués.

## Images

Les originaux sont dans `assets/originals/` (non publiés). `npm run images`
génère des versions WebP redimensionnées dans `public/images/`, référencées
par le site. Pour ajouter une photo : la déposer dans `assets/originals/`,
lancer `npm run images`, puis utiliser le chemin `.webp` dans `data.js`.

## Formulaire de contact

Il n’y a pas de serveur : le formulaire valide la saisie puis ouvre la
messagerie du visiteur (ou WhatsApp si un numéro est configuré) avec la
demande pré-remplie.

## Déploiement

Site statique (dossier `dist/`). Les fichiers `vercel.json` (Vercel) et
`public/_redirects` (Netlify) renvoient toutes les URL vers `index.html` pour
que les liens directs fonctionnent. Penser à mettre une URL absolue dans la
balise `og:image` de `index.html` une fois le domaine connu.
