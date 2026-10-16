import { useParams } from 'react-router-dom'
import { Palette } from 'lucide-react'
import DetailView from '../../../components/common/DetailView.jsx'
import NotFound from '../../not-found/pages/NotFound.jsx'
import { contactPath } from '../../../lib/contact.js'
import { ARTWORKS } from '../data.js'

export default function ArtworkDetail() {
  const { slug } = useParams()
  const artwork = ARTWORKS.find((a) => a.slug === slug)

  if (!artwork) return <NotFound backTo="/galerie" backLabel="Voir la galerie" />

  return (
    <DetailView
      backTo="/galerie"
      backLabel="Retour à la galerie"
      image={artwork.image}
      photo={artwork.photo}
      icon={Palette}
      eyebrow={artwork.technique}
      title={artwork.title}
      subtitle={`Par ${artwork.artist}`}
      description="Pièce unique, livrée avec certificat d’authenticité."
      notes={['Emballage soigné', 'Livraison partout au Bénin']}
      meta={[
        { label: 'Artiste', value: artwork.artist },
        { label: 'Technique', value: artwork.technique },
      ]}
      price={artwork.price}
      ctaLabel="Demander cette œuvre"
      ctaTo={contactPath({ service: 'galerie', subject: `${artwork.title} — ${artwork.artist}` })}
    />
  )
}
