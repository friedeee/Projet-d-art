import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceRow({ service }) {
  return (
    <Link
      to={service.path}
      className="group flex items-center justify-between gap-6 py-7 md:py-6 px-1 transition-all hover:pl-4"
    >
      <div className="flex items-baseline gap-6 md:gap-8">
        <span className="font-mono text-xs text-laiton tracking-wide w-6 shrink-0">{service.n}</span>
        <div>
          <h3 className="font-display font-medium text-2xl md:text-3xl tracking-tight group-hover:text-laiton transition-colors">{service.label}</h3>
          <p className="text-ivoire/55 text-sm mt-1.5 max-w-md">{service.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-8 shrink-0">
        {service.image && (
          <div className="hidden md:block w-44 h-28 rounded-sm overflow-hidden">
            <img
              src={service.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale-[60%] opacity-70 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        )}
        <ArrowRight
          size={20}
          aria-hidden="true"
          className="text-laiton md:opacity-0 md:-translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
        />
      </div>
    </Link>
  )
}
