import { useParams } from 'react-router-dom'
import { Home } from 'lucide-react'
import DetailView from '../../../components/common/DetailView.jsx'
import NotFound from '../../not-found/pages/NotFound.jsx'
import { contactPath } from '../../../lib/contact.js'
import { APARTMENTS } from '../data.js'

export default function ApartmentDetail() {
  const { slug } = useParams()
  const apartment = APARTMENTS.find((a) => a.slug === slug)

  if (!apartment) return <NotFound backTo="/appartements" backLabel="Voir les logements" />

  return (
    <DetailView
      backTo="/appartements"
      backLabel="Retour aux appartements"
      image={apartment.image}
      photo={apartment.photo}
      icon={Home}
      eyebrow={apartment.type}
      title={apartment.title}
      subtitle={`${apartment.location} · jusqu’à ${apartment.guests} pers.`}
      description="Logement vérifié, ménage inclus à l’arrivée."
      notes={['Check-in flexible', 'Contact direct avec l’hôte après réservation', ...apartment.amenities]}
      meta={[
        { label: 'Type', value: apartment.type },
        { label: 'Capacité', value: `${apartment.guests} pers.` },
        { label: 'Quartier', value: apartment.location, wide: true },
      ]}
      price={apartment.price}
      priceUnit="/ nuit"
      ctaLabel="Réserver ce logement"
      ctaTo={contactPath({ service: 'appartements', subject: apartment.title })}
    />
  )
}
