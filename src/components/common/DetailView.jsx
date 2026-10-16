import BackLink from './BackLink.jsx'
import BookingPanel from './BookingPanel.jsx'
import Media from './Media.jsx'
import Page from './Page.jsx'
import Seo from './Seo.jsx'

// Fiche générique : œuvre, véhicule, logement.
export default function DetailView({
  backTo, backLabel, image, photo, icon, eyebrow, title, subtitle, description, notes = [],
  meta, price, priceUnit, ctaLabel, ctaTo,
}) {
  return (
    <Page>
      <Seo title={title} description={`${subtitle}. ${description}`} />
      <BackLink to={backTo}>{backLabel}</BackLink>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
        <figure>
          <div className="aspect-[4/3] bg-panel rounded-sm overflow-hidden">
            <Media src={image} alt={title} icon={icon} iconSize={44} eager />
          </div>
          {photo && (
            <figcaption className="mt-2.5 text-[11px] text-ivoire/45">
              Photo d’illustration, non contractuelle ·{' '}
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className="hover:text-laiton transition-colors">
                {photo.author}, {photo.license}
              </a>
            </figcaption>
          )}
        </figure>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-3">{eyebrow}</p>
          <h1 className="font-display font-medium text-4xl md:text-5xl mb-3 leading-tight">{title}</h1>
          <p className="text-ivoire/55 mb-8">{subtitle}</p>
          <p className="text-ivoire/75 leading-relaxed mb-6">{description}</p>

          {notes.length > 0 && (
            <ul className="mb-10 space-y-2 text-sm text-ivoire/70">
              {notes.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-laiton shrink-0" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          )}

          <BookingPanel
            price={price}
            priceUnit={priceUnit}
            meta={meta}
            ctaLabel={ctaLabel}
            ctaTo={ctaTo}
            subject={title}
          />
        </div>
      </div>
    </Page>
  )
}
