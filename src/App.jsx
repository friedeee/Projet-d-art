import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

export default function App() {
  const navigation = useNavigation()

  return (
    <div className="min-h-screen flex flex-col">
      {navigation.state === 'loading' && (
        <div className="fixed top-0 inset-x-0 z-[70] h-0.5 bg-laiton animate-route-progress" role="progressbar" aria-label="Chargement de la page" />
      )}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-laiton focus:text-onyx focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
