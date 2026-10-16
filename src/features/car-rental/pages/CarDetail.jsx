import { useParams } from 'react-router-dom'
import { Car } from 'lucide-react'
import DetailView from '../../../components/common/DetailView.jsx'
import NotFound from '../../not-found/pages/NotFound.jsx'
import { contactPath } from '../../../lib/contact.js'
import { CARS } from '../data.js'

export default function CarDetail() {
  const { slug } = useParams()
  const car = CARS.find((c) => c.slug === slug)

  if (!car) return <NotFound backTo="/voitures" backLabel="Voir les véhicules" />

  return (
    <DetailView
      backTo="/voitures"
      backLabel="Retour aux voitures"
      image={car.image}
      photo={car.photo}
      icon={Car}
      eyebrow={car.category}
      title={car.title}
      subtitle={car.options}
      description="Véhicule entretenu, assurance incluse."
      notes={['Kilométrage et caution à confirmer à la réservation']}
      meta={[
        { label: 'Catégorie', value: car.category },
        { label: 'Options', value: car.options },
      ]}
      price={car.price}
      priceUnit="/ jour"
      ctaLabel="Réserver ce véhicule"
      ctaTo={contactPath({ service: 'voitures', subject: car.title })}
    />
  )
}
