import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { SERVICES } from '../../lib/services.js'
import { SITE } from '../../config/site.js'
import { telLink, whatsappLink } from '../../lib/contact.js'

export default function Footer() {
  const tel = telLink()
  const whatsapp = whatsappLink('Bonjour ALAFIA, ')
  const linkClass = 'flex items-center gap-2.5 hover:text-laiton transition-colors w-fit'

  return (
    <footer className="mt-32">
      <div className="container-page">
        <div className="hairline-gold" />
      </div>

      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="font-display font-medium text-xl tracking-[0.08em] text-ivoire">{SITE.name}</p>
          <p className="text-ivoire/55 text-[14px] leading-relaxed mt-4 max-w-xs">
            Une agence basée à Cotonou qui organise circuits, mobilité et
            hébergement pour préparer un séjour au Bénin sans y penser deux fois.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-ivoire/50 text-[13px] mb-4">Services</p>
          <nav aria-label="Services" className="flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <Link key={s.id} to={s.path} className="text-[14px] text-ivoire/70 hover:text-laiton transition-colors w-fit">
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-5">
          <p className="text-ivoire/50 text-[13px] mb-4">Contact</p>
          <address className="not-italic flex flex-col gap-3 text-[14px] text-ivoire/70">
            {tel && (
              <a href={tel} className={linkClass}>
                <Phone size={15} strokeWidth={1.5} /> {SITE.phone}
              </a>
            )}
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MessageCircle size={15} strokeWidth={1.5} /> WhatsApp
              </a>
            )}
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              <Mail size={15} strokeWidth={1.5} /> {SITE.email}
            </a>
            <p className="flex items-center gap-2.5">
              <MapPin size={15} strokeWidth={1.5} /> {SITE.city}
            </p>
          </address>
          <Link to="/contact" className="inline-block mt-6 text-sm text-laiton border-b border-laiton pb-0.5">
            Envoyer une demande
          </Link>
        </div>
      </div>

      <div className="border-t border-ivoire/10">
        <p className="text-center text-xs text-ivoire/50 tracking-wide py-6">
          © {new Date().getFullYear()} {SITE.name} · {SITE.city} ·{' '}
          <Link to="/credits" className="hover:text-laiton transition-colors">Crédits photo</Link>
        </p>
      </div>
    </footer>
  )
}
