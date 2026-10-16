import { Link } from 'react-router-dom'
import Media from './Media.jsx'
import { formatPrice } from '../../lib/format.js'

export default function ListingCard({ to, image, icon, badge, title, subtitle, price, priceUnit }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-sm overflow-hidden border filet hover:border-laiton/50 transition-colors"
    >
      <div className="aspect-[4/3] bg-panel overflow-hidden">
        <Media
          src={image}
          alt={title}
          icon={icon}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 border-t filet">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ivoire/50 mb-2">{badge}</span>
        <h2 className="font-display font-medium text-lg leading-snug group-hover:text-laiton transition-colors">{title}</h2>
        <p className="text-sm text-ivoire/55 mt-1.5 flex-1">{subtitle}</p>
        <p className="flex items-baseline gap-1.5 mt-4">
          <span className="font-mono text-laiton">{formatPrice(price)}</span>
          {price != null && priceUnit && <span className="text-xs text-ivoire/50">{priceUnit}</span>}
        </p>
      </div>
    </Link>
  )
}
