import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { formatPrice } from '../../lib/format.js'
import { whatsappLink } from '../../lib/contact.js'

// Encadré prix + demande de réservation, commun à toutes les fiches.
export default function BookingPanel({ price, priceUnit, meta = [], ctaLabel, ctaTo, subject }) {
  const whatsapp = whatsappLink(`Bonjour ALAFIA, je souhaite des informations sur « ${subject} ».`)

  return (
    <div className="border filet rounded-sm p-6 md:p-7 bg-panel/60">
      <p className="flex items-baseline gap-2">
        <span className="font-mono text-2xl text-laiton">{formatPrice(price)}</span>
        {price != null && priceUnit && <span className="text-sm text-ivoire/50">{priceUnit}</span>}
      </p>

      {meta.length > 0 && (
        <dl className="mt-6 pt-6 border-t filet grid grid-cols-2 gap-x-6 gap-y-4">
          {meta.map((m) => (
            <div key={m.label} className={m.wide ? 'col-span-2' : ''}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ivoire/50">{m.label}</dt>
              <dd className="text-sm mt-1">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <Link
        to={ctaTo}
        className="mt-7 block text-center bg-laiton text-onyx font-medium px-8 py-3.5 rounded-sm hover:brightness-110 transition"
      >
        {ctaLabel}
      </Link>
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 border border-laiton/50 text-ivoire px-8 py-3 rounded-sm hover:border-laiton transition-colors text-sm"
        >
          <MessageCircle size={16} strokeWidth={1.5} /> Écrire sur WhatsApp
        </a>
      )}
      <p className="text-xs text-ivoire/50 mt-4 leading-relaxed">
        Demande sans engagement : nous confirmons avec vous la disponibilité et le tarif.
      </p>
    </div>
  )
}
