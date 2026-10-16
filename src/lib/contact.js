import { SITE } from '../config/site.js'

/** Lien vers le formulaire de contact, pré-rempli avec le service et l'objet. */
export function contactPath({ service, subject } = {}) {
  const params = new URLSearchParams()
  if (service) params.set('service', service)
  if (subject) params.set('objet', subject)
  const query = params.toString()
  return query ? `/contact?${query}` : '/contact'
}

export function mailtoLink(subject, body = '') {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Renvoie null tant qu'aucun numéro WhatsApp n'est configuré. */
export function whatsappLink(text) {
  if (!SITE.whatsapp) return null
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

export function telLink() {
  return SITE.phone ? `tel:${SITE.phone.replace(/\s/g, '')}` : null
}
