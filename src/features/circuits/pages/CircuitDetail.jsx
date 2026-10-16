import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Check, Compass, Minus } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import BackLink from '../../../components/common/BackLink.jsx'
import BookingPanel from '../../../components/common/BookingPanel.jsx'
import ListingCard from '../../../components/common/ListingCard.jsx'
import NotFound from '../../not-found/pages/NotFound.jsx'
import { contactPath } from '../../../lib/contact.js'
import { CIRCUITS } from '../data.js'

function SectionTitle({ children }) {
  return <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-5">{children}</h2>
}

function PhotoGallery({ images, title }) {
  const [current, setCurrent] = useState(0)

  return (
    <div>
      <div className="aspect-[16/9] bg-panel rounded-sm overflow-hidden">
        <img
          key={images[current]}
          src={images[current]}
          alt={`${title} — photo ${current + 1} sur ${images.length}`}
          fetchPriority={current === 0 ? 'high' : 'auto'}
          className="w-full h-full object-cover animate-hero-in"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Afficher la photo ${i + 1}`}
              aria-current={i === current}
              className={`aspect-[4/3] rounded-sm overflow-hidden border-2 transition ${
                i === current ? 'border-laiton' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CircuitDetail() {
  const { slug } = useParams()
  const circuit = CIRCUITS.find((c) => c.slug === slug)

  if (!circuit) return <NotFound backTo="/circuits" backLabel="Voir tous les circuits" />

  const related = CIRCUITS.filter((c) => c.slug !== circuit.slug && c.region === circuit.region).slice(0, 3)

  return (
    <Page>
      <Seo title={circuit.title} description={circuit.description} />
      <BackLink to="/circuits">Retour aux circuits</BackLink>

      <header className="mb-10 max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-3">
          {circuit.category} · {circuit.region}
        </p>
        <h1 className="font-display font-medium text-4xl md:text-6xl leading-[1.05] mb-4">{circuit.title}</h1>
        <p className="text-ivoire/55">{circuit.location}</p>
      </header>

      <PhotoGallery key={circuit.slug} images={circuit.images} title={circuit.title} />

      <div className="mt-14 grid lg:grid-cols-[1fr_380px] gap-14 items-start">
        <div className="space-y-14">
          <p className="text-lg md:text-xl text-ivoire/80 leading-relaxed max-w-2xl">{circuit.description}</p>

          <section>
            <SectionTitle>Points forts</SectionTitle>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {circuit.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ivoire/80">
                  <span className="mt-2.5 h-1 w-1 rounded-full bg-laiton shrink-0" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle>Programme</SectionTitle>
            <ol className="border-l filet ml-1.5">
              {circuit.program.map((step, i) => (
                <li key={step} className="relative pl-8 pb-5 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-laiton bg-onyx" aria-hidden="true" />
                  <span className="font-mono text-[11px] text-ivoire/50 mr-3">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-ivoire/85">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid sm:grid-cols-2 gap-10">
            <div>
              <SectionTitle>Inclus</SectionTitle>
              <ul className="space-y-2.5">
                {circuit.included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ivoire/80">
                    <Check size={16} className="text-laiton shrink-0 mt-0.5" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle>Non inclus</SectionTitle>
              <ul className="space-y-2.5">
                {circuit.notIncluded.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ivoire/55">
                    <Minus size={16} className="shrink-0 mt-0.5" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <BookingPanel
            price={circuit.price}
            priceUnit="/ pers"
            subject={circuit.title}
            ctaLabel="Demander ce circuit"
            ctaTo={contactPath({ service: 'circuits', subject: circuit.title })}
            meta={[
              { label: 'Durée', value: circuit.duration },
              { label: 'Groupe', value: circuit.groupSize },
              { label: 'Départ', value: circuit.meetingPoint },
              { label: 'Région', value: circuit.region },
              { label: 'Étapes', value: circuit.stops, wide: true },
            ]}
          />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-24 pt-12 border-t filet">
          <h2 className="font-display text-2xl md:text-3xl mb-8">Dans la même région</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((c) => (
              <ListingCard
                key={c.slug}
                to={`/circuits/${c.slug}`}
                image={c.images[0]}
                icon={Compass}
                badge={c.duration}
                title={c.title}
                subtitle={c.stops}
                price={c.price}
                priceUnit="/ pers"
              />
            ))}
          </div>
        </section>
      )}
    </Page>
  )
}
