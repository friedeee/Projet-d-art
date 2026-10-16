import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '../../../lib/services.js'
import { CIRCUITS } from '../../circuits/data.js'
import ServiceRow from '../../../components/common/ServiceRow.jsx'
import Seo from '../../../components/common/Seo.jsx'
import { formatPrice } from '../../../lib/format.js'

const STEPS = [
  { title: 'Vous nous écrivez', text: 'Un circuit, une voiture, un logement : indiquez vos dates, vos envies et le nombre de personnes.' },
  { title: 'Nous préparons votre proposition', text: 'Itinéraire, véhicule, hébergement : nous confirmons avec vous les disponibilités et le tarif.' },
  { title: 'Vous profitez du séjour', text: 'Guides locaux, véhicules et logements sont prêts. Il ne reste qu’à prendre le temps de découvrir.' },
]

// 1 grande tuile (2×2) + 8 petites = grille complète sur 2, 3 et 4 colonnes
const FEATURED = CIRCUITS.slice(0, 9)

const SECTIONS = [
  { id: 'hero', label: 'Bienvenue' },
  { id: 'services', label: 'Services' },
  { id: 'circuits', label: 'Circuits' },
  { id: 'etapes', label: 'Comment ça marche' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = SECTIONS.map((s) => s.id)

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0
      setProgress(Math.min(1, Math.max(0, pct)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

function ScrollThread({ progress, activeSection }) {
  return (
    <div className="hidden md:block fixed left-7 top-0 h-screen z-40 pointer-events-none">
      <div className="relative h-[70vh] mt-[15vh] w-px bg-ivoire/15">
        <div
          className="absolute top-0 left-0 w-px bg-laiton"
          style={{ height: `${progress * 100}%`, transition: 'height 0.15s linear' }}
        />
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            className="absolute left-0 -translate-x-1/2 flex items-center"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
          >
            <span
              className={`block h-[7px] w-[7px] rounded-full transition-colors duration-300 ${
                activeSection === s.id ? 'bg-laiton' : 'bg-ivoire/25'
              }`}
            />
            <span
              className={`absolute left-4 whitespace-nowrap font-mono text-[10px] tracking-wide transition-opacity duration-300 ${
                activeSection === s.id ? 'opacity-100 text-laiton' : 'opacity-0'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const progress = useScrollProgress()
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <div className="overflow-hidden">
      <Seo />

      <ScrollThread progress={progress} activeSection={activeSection} />

      {/* HERO */}
      <section id="hero" className="relative h-[92svh] min-h-[600px] max-h-[1000px] w-full reveal-mask">
        <img
          src="/images/hero-ganvie.webp"
          fetchPriority="high"
          alt="Pirogues sur le lac Nokoué, village lacustre de Ganvié"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        {/* Assombrit le haut de la photo pour garder le menu lisible */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

        <div className="relative h-full container-page md:pl-16 flex flex-col justify-end pb-16">
          <p className="font-mono text-[11px] text-ivoire/70 mb-4 animate-hero-in [animation-delay:250ms]">
            Ganvié, lac Nokoué
          </p>

          <h1 className="font-display font-medium text-[clamp(3.5rem,8vw,8rem)] leading-[0.92] tracking-[-0.03em] text-ivoire animate-hero-in">
            Prenez
            <br />
            le temps
            <br />
            de découvrir
          </h1>

          <div className="mt-9 max-w-sm animate-hero-in [animation-delay:150ms]">
            <p className="text-ivoire/75 text-[15px] leading-[1.8]">
              Le Bénin à votre rythme. Des lieux à découvrir, des
              expériences à vivre et les services essentiels pour
              accompagner votre séjour.
            </p>

            <Link to="/circuits" className="group mt-6 inline-flex items-center gap-2 text-laiton font-display text-lg">
              Découvrir les circuits
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* LIGNE */}
      <div className="container-page md:pl-16">
        <div className="hairline-gold" />
      </div>

      {/* SERVICES */}
      <section id="services" className="container-page md:pl-16 pt-20 pb-28">
        <h2 className="font-display text-3xl md:text-5xl leading-[1.05] max-w-2xl mb-14">
          Tout ce qu’il faut pour profiter pleinement du séjour.
        </h2>
        <div className="border-t border-ivoire/15">
          {SERVICES.map((service) => (
            <div key={service.id} className="border-b border-ivoire/15">
              <ServiceRow service={service} />
            </div>
          ))}
        </div>
      </section>

      {/* CIRCUITS */}
      <section id="circuits" className="pt-8 pb-28">
        <div className="container-page md:pl-16 mb-12">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] max-w-2xl">
            {CIRCUITS.length} itinéraires pour traverser le pays, du nord au sud.
          </h2>
        </div>

        <div className="container-page md:pl-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] md:auto-rows-[260px] gap-4">
          {FEATURED.map((c, i) => (
            <Link
              key={c.slug}
              to={`/circuits/${c.slug}`}
              className={`group relative overflow-hidden rounded-sm ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2' : i >= 5 ? 'hidden sm:block' : ''
              }`}
            >
              <img
                src={c.images[0]}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <p className="absolute top-4 left-4 font-mono text-[10px] text-ivoire/70">
                {c.duration}
              </p>
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className={`font-display text-ivoire leading-tight ${
                    i === 0 ? 'text-2xl md:text-3xl' : 'text-xl sm:text-base md:text-lg'
                  }`}
                >
                  {c.title}
                </p>
                <p className="text-ivoire/60 text-[12px] mt-1">{c.location}</p>
                <p className="text-laiton text-[12px] mt-1">{formatPrice(c.price)}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="container-page md:pl-16 mt-10">
          <Link to="/circuits" className="inline-flex items-center gap-2.5 text-sm border-b border-laiton pb-1 hover:gap-3.5 transition-all">
            Voir les {CIRCUITS.length} circuits
            <ArrowRight size={15} className="text-laiton" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ÉTAPES */}
      <section id="etapes" className="container-page md:pl-16 pb-28">
        <div className="hairline-gold mb-20" />
        <h2 className="font-display text-3xl md:text-5xl leading-[1.05] max-w-2xl mb-14">
          Un séjour préparé en trois temps.
        </h2>
        <ol className="grid md:grid-cols-3 gap-10 md:gap-14">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t filet pt-6">
              <span className="font-mono text-xs text-laiton">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-2xl mt-4 mb-3">{step.title}</h3>
              <p className="text-ivoire/60 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container-page md:pl-16">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src="/images/circuits/grand-popo.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-onyx/80 md:bg-transparent md:bg-gradient-to-r md:from-onyx/95 md:via-onyx/75 md:to-onyx/30" />
          <div className="relative px-8 py-16 md:px-16 md:py-24 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-5">Une envie précise ?</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] mb-6">Parlons de votre séjour.</h2>
            <p className="text-ivoire/70 leading-relaxed mb-10 max-w-md">
              Dites-nous vos dates et ce que vous aimeriez vivre : nous revenons vers vous avec une proposition sur mesure.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-laiton text-onyx font-medium px-7 py-3.5 rounded-sm hover:brightness-110 transition"
            >
              Envoyer une demande
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
