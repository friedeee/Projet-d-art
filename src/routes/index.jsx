import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import RouteError from '../components/layout/RouteError.jsx'

// Chaque page est chargée à la demande pour alléger le premier affichage.
const page = (load) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="min-h-screen bg-onyx" />,
    children: [
      { index: true, lazy: page(() => import('../features/home/pages/Home.jsx')) },
      { path: 'galerie', lazy: page(() => import('../features/art-gallery/pages/Gallery.jsx')) },
      { path: 'galerie/:slug', lazy: page(() => import('../features/art-gallery/pages/ArtworkDetail.jsx')) },
      { path: 'circuits', lazy: page(() => import('../features/circuits/pages/Circuits.jsx')) },
      { path: 'circuits/:slug', lazy: page(() => import('../features/circuits/pages/CircuitDetail.jsx')) },
      { path: 'voitures', lazy: page(() => import('../features/car-rental/pages/CarRental.jsx')) },
      { path: 'voitures/:slug', lazy: page(() => import('../features/car-rental/pages/CarDetail.jsx')) },
      { path: 'appartements', lazy: page(() => import('../features/apartment-rental/pages/ApartmentRental.jsx')) },
      { path: 'appartements/:slug', lazy: page(() => import('../features/apartment-rental/pages/ApartmentDetail.jsx')) },
      { path: 'contact', lazy: page(() => import('../features/contact/pages/Contact.jsx')) },
      { path: 'credits', lazy: page(() => import('../features/credits/pages/Credits.jsx')) },
      { path: '*', lazy: page(() => import('../features/not-found/pages/NotFound.jsx')) },
    ],
  },
])
