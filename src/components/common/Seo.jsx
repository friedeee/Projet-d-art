import { SITE } from '../../config/site.js'

// React 19 place automatiquement <title> et <meta> dans le <head>.
export default function Seo({ title, description }) {
  return (
    <>
      <title>{title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`}</title>
      {description && <meta name="description" content={description} />}
    </>
  )
}
