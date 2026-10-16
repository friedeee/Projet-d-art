import { Link, useRouteError } from 'react-router-dom'

// Affiché si une page plante ou ne se charge pas (ex. connexion coupée).
export default function RouteError() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="min-h-screen container-page flex flex-col justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-4">Erreur</p>
      <h1 className="font-display font-medium text-4xl md:text-5xl mb-4">Cette page n’a pas pu s’afficher.</h1>
      <p className="text-ivoire/55 max-w-md mb-10">
        Vérifiez votre connexion puis rechargez la page. Si le problème persiste, revenez à l’accueil.
      </p>
      <div className="flex gap-6 text-sm">
        <button onClick={() => window.location.reload()} className="bg-laiton text-onyx font-medium px-6 py-3 rounded-sm hover:brightness-110 transition">
          Recharger
        </button>
        <Link to="/" className="self-center border-b border-laiton pb-0.5">Retour à l’accueil</Link>
      </div>
    </div>
  )
}
