import { Link } from 'react-router-dom'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'

export default function NotFound({ backTo = '/', backLabel = 'Retour à l’accueil' }) {
  return (
    <Page className="min-h-[60vh] flex flex-col justify-center">
      <Seo title="Page introuvable" />
      <meta name="robots" content="noindex" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-4">Erreur 404</p>
      <h1 className="font-display font-medium text-4xl md:text-6xl mb-5">Cette page n’existe pas.</h1>
      <p className="text-ivoire/55 max-w-md mb-10">
        Le lien est peut-être ancien, ou l’élément n’est plus proposé.
      </p>
      <div className="flex flex-wrap gap-6 text-sm">
        <Link to={backTo} className="bg-laiton text-onyx font-medium px-6 py-3 rounded-sm hover:brightness-110 transition">
          {backLabel}
        </Link>
        <Link to="/contact" className="self-center border-b border-laiton pb-0.5">Nous contacter</Link>
      </div>
    </Page>
  )
}
