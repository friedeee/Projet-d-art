import { Home } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import ListingGrid from '../../../components/common/ListingGrid.jsx'
import ListingCard from '../../../components/common/ListingCard.jsx'
import { APARTMENTS } from '../data.js'

export default function ApartmentRental() {
  return (
    <Page>
      <Seo title="Appartements" description="Studios, appartements et villas à Cotonou et Ouidah, pour une nuit ou plusieurs semaines." />
      <PageHeader
        eyebrow="Appartements"
        title="Un toit pour chaque séjour"
        description="Du studio à la villa, pour une nuit ou plusieurs semaines."
      />
      <ListingGrid>
        {APARTMENTS.map((a) => (
          <ListingCard
            key={a.slug}
            to={`/appartements/${a.slug}`}
            image={a.image}
            icon={Home}
            badge={a.type}
            title={a.title}
            subtitle={`${a.guests} pers · ${a.amenities.join(' · ')}`}
            price={a.price}
            priceUnit="/ nuit"
          />
        ))}
      </ListingGrid>
    </Page>
  )
}
