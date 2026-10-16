import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { SERVICES } from '../../lib/services.js'
import { SITE } from '../../config/site.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile ouvert : bloque le défilement et ferme avec Échap
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-onyx/90 backdrop-blur-md border-b filet' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-page py-6 flex items-center justify-between">
          <Link to="/" className="font-display font-medium text-xl tracking-[0.08em] text-ivoire">
            {SITE.name}
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-10 text-[13px] tracking-wide">
            {SERVICES.map((s) => (
              <NavLink
                key={s.id}
                to={s.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-laiton ${isActive ? 'text-laiton' : 'text-ivoire/70'}`
                }
              >
                {s.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hidden md:inline-flex text-[13px] tracking-wide px-4 py-2 rounded-sm border transition-colors ${
                  isActive ? 'border-laiton text-laiton' : 'border-laiton/50 text-ivoire hover:border-laiton hover:text-laiton'
                }`
              }
            >
              Nous contacter
            </NavLink>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-ivoire"
            >
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] bg-onyx flex flex-col md:hidden"
        >
          <div className="container-page py-6 flex items-center justify-between">
            <Link to="/" onClick={closeMenu} className="font-display font-medium text-xl tracking-[0.08em] text-ivoire">
              {SITE.name}
            </Link>
            <button onClick={closeMenu} aria-label="Fermer le menu" className="text-ivoire" autoFocus>
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="flex-1 flex flex-col justify-center px-6 gap-2">
            {[...SERVICES, { id: 'contact', path: '/contact', label: 'Contact' }].map((s, i) => (
              <NavLink
                key={s.id}
                to={s.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `font-display text-4xl py-2 animate-hero-in ${isActive ? 'text-laiton' : 'text-ivoire'}`
                }
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {s.label}
              </NavLink>
            ))}
          </nav>

          <p className="px-6 pb-10 text-sm text-ivoire/55 animate-hero-in" style={{ animationDelay: '360ms' }}>
            {SITE.city} · {SITE.email}
          </p>
        </div>
      )}
    </>
  )
}
