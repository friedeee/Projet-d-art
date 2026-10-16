import { Palette } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import ListingGrid from '../../../components/common/ListingGrid.jsx'
import ListingCard from '../../../components/common/ListingCard.jsx'
import { ARTWORKS } from '../data.js'

export default function Gallery() {
  return (
    <Page>
      <Seo title="Galerie d’art" description="Œuvres d’artistes béninois : pièces uniques et éditions limitées, livrées partout au Bénin." />
      <PageHeader
        eyebrow="Galerie d’art"
        title="Des œuvres d’artistes béninois"
        description="Pièces uniques et éditions limitées, livrées partout au Bénin."
      />
      <ListingGrid>
        {ARTWORKS.map((a) => (
          <ListingCard
            key={a.slug}
            to={`/galerie/${a.slug}`}
            image={a.image}
            icon={Palette}
            badge={a.technique}
            title={a.title}
            subtitle={`Par ${a.artist}`}
            price={a.price}
          />
        ))}
      </ListingGrid>
    </Page>
  )
}
