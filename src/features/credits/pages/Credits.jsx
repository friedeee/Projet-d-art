import { Link } from 'react-router-dom'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import { ARTWORKS } from '../../art-gallery/data.js'
import { CARS } from '../../car-rental/data.js'
import { APARTMENTS } from '../../apartment-rental/data.js'

// Liste générée à partir des champs `photo` des données : rien à maintenir à la main.
const GROUPS = [
  { label: 'Galerie d’art', base: '/galerie', items: ARTWORKS },
  { label: 'Voitures', base: '/voitures', items: CARS },
  { label: 'Appartements', base: '/appartements', items: APARTMENTS },
].map((g) => ({ ...g, items: g.items.filter((i) => i.photo) }))

export default function Credits() {
  return (
    <Page>
      <Seo title="Crédits photo" />
      <PageHeader
        eyebrow="Crédits"
        title="Crédits photo"
        description="Certaines images sont des visuels d’illustration issus de Wikimedia Commons, utilisés selon les termes de leur licence."
      />
      <div className="space-y-12 max-w-4xl">
        {GROUPS.filter((g) => g.items.length > 0).map((g) => (
          <section key={g.label}>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-4">{g.label}</h2>
            <ul className="divide-y divide-ivoire/10 border-y filet">
              {g.items.map((item) => (
                <li key={item.slug} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <Link to={`${g.base}/${item.slug}`} className="text-ivoire hover:text-laiton transition-colors">{item.title}</Link>
                  <a href={item.photo.source} target="_blank" rel="noopener noreferrer" className="text-ivoire/55 hover:text-laiton transition-colors">
                    {item.photo.author} · {item.photo.license}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Page>
  )
}
