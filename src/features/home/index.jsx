import { ArrowRight } from 'lucide-react'
import { SERVICES } from '../../../lib/services.js'
import ServiceRow from '../../../components/common/ServiceRow.jsx'

export default function Home() {
  return (
    <div>
      <section className="max-w-[1600px] mx-auto px-6 pt-28 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-7">
          Bienvenue au Bénin
        </p>

        <h1 className="font-display font-medium text-5xl md:text-7xl leading-[1.08] max-w-4xl">
          Prenez le temps de
          <em className="text-laiton not-italic italic">
            {' '}découvrir.
          </em>
        </h1>

        <p className="text-ivoire/55 mt-7 max-w-lg leading-relaxed">
          Art, voyages, mobilité et hébergement. Nous réunissons ce qu’il faut
          pour préparer votre séjour au Bénin, simplement.
        </p>

        <a
          href="/circuits"
          className="inline-flex items-center gap-2.5 mt-10 text-sm border-b border-laiton pb-1 hover:gap-3.5 transition-all"
        >
          Voir les circuits
          <ArrowRight size={15} className="text-laiton" />
        </a>
      </section>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="hairline-gold" />
      </div>

      <section className="max-w-[1600px] mx-auto px-6 pt-16 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ivoire/55 mb-2">
          Ce que nous proposons
        </p>

        <div className="border-b filet">
          {SERVICES.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  )
}