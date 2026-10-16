import { Car } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import ListingGrid from '../../../components/common/ListingGrid.jsx'
import ListingCard from '../../../components/common/ListingCard.jsx'
import { CARS } from '../data.js'

export default function CarRental() {
  return (
    <Page>
      <Seo title="Location de voitures" description="Location de voitures au Bénin, avec ou sans chauffeur : citadines, berlines, 4x4 et minibus." />
      <PageHeader
        eyebrow="Location de voitures"
        title="Un véhicule pour chaque trajet"
        description="Avec ou sans chauffeur, disponible partout au Bénin."
      />
      <ListingGrid>
        {CARS.map((c) => (
          <ListingCard
            key={c.slug}
            to={`/voitures/${c.slug}`}
            image={c.image}
            icon={Car}
            badge={c.category}
            title={c.title}
            subtitle={c.options}
            price={c.price}
            priceUnit="/ jour"
          />
        ))}
      </ListingGrid>
    </Page>
  )
}
