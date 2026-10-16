import { useSearchParams } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import ListingGrid from '../../../components/common/ListingGrid.jsx'
import ListingCard from '../../../components/common/ListingCard.jsx'
import { CIRCUITS, durationKind } from '../data.js'

const DURATIONS = [
  { id: 'demi', label: 'Demi-journée' },
  { id: 'jour', label: 'Journée' },
  { id: 'sejour', label: 'Plusieurs jours' },
]
const REGIONS = [
  { id: 'Sud', label: 'Sud' },
  { id: 'Centre', label: 'Centre' },
  { id: 'Nord', label: 'Nord' },
]

function FilterGroup({ label, name, options, value, onChange }) {
  const chip = (active) =>
    `px-3.5 py-1.5 rounded-full border text-[13px] transition-colors ${
      active ? 'border-laiton bg-laiton text-onyx' : 'filet text-ivoire/70 hover:border-laiton/60 hover:text-ivoire'
    }`

  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ivoire/50 w-20">{label}</span>
      <button type="button" aria-pressed={!value} onClick={() => onChange(name, null)} className={chip(!value)}>
        Tous
      </button>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(name, o.id)} className={chip(value === o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function Circuits() {
  // Les filtres vivent dans l'URL : ils se partagent et survivent au retour arrière.
  const [params, setParams] = useSearchParams()
  const duree = params.get('duree')
  const region = params.get('region')

  function setFilter(name, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const circuits = CIRCUITS.filter(
    (c) => (!duree || durationKind(c.duration) === duree) && (!region || c.region === region),
  )

  return (
    <Page>
      <Seo
        title="Circuits au Bénin"
        description="Circuits guidés au Bénin : Ganvié, Ouidah, Abomey, Pendjari, Grand-Popo… Itinéraires d’une demi-journée à plusieurs jours, guide local inclus."
      />
      <PageHeader
        eyebrow="Circuits"
        title="Itinéraires guidés à travers le pays"
        description="De la lagune de Ganvié aux palais d’Abomey, jusqu’aux savanes du Nord, avec guide local."
      />

      <div className="flex flex-col gap-3 mb-10 pb-8 border-b filet">
        <FilterGroup label="Durée" name="duree" options={DURATIONS} value={duree} onChange={setFilter} />
        <FilterGroup label="Région" name="region" options={REGIONS} value={region} onChange={setFilter} />
      </div>

      <p className="text-sm text-ivoire/50 mb-6" aria-live="polite">
        {circuits.length} circuit{circuits.length > 1 ? 's' : ''}
      </p>

      {circuits.length > 0 ? (
        <ListingGrid>
          {circuits.map((c) => (
            <ListingCard
              key={c.slug}
              to={`/circuits/${c.slug}`}
              image={c.images[0]}
              icon={Compass}
              badge={`${c.duration} · ${c.region}`}
              title={c.title}
              subtitle={c.stops}
              price={c.price}
              priceUnit="/ pers"
            />
          ))}
        </ListingGrid>
      ) : (
        <div className="py-16 text-center">
          <p className="text-ivoire/55 mb-4">Aucun circuit ne correspond à ces critères.</p>
          <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm text-laiton border-b border-laiton pb-0.5">
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </Page>
  )
}
