import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MapPin, MessageCircle, Phone, Check } from 'lucide-react'
import Page from '../../../components/common/Page.jsx'
import Seo from '../../../components/common/Seo.jsx'
import PageHeader from '../../../components/common/PageHeader.jsx'
import { SERVICES } from '../../../lib/services.js'
import { SITE } from '../../../config/site.js'
import { mailtoLink, telLink, whatsappLink } from '../../../lib/contact.js'

const SERVICE_OPTIONS = [...SERVICES.map((s) => ({ id: s.id, label: s.label })), { id: 'autre', label: 'Autre demande' }]

const schema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom.'),
  email: z.email('Adresse e-mail invalide.'),
  phone: z.string().trim().optional(),
  service: z.enum(SERVICE_OPTIONS.map((o) => o.id)),
  dates: z.string().trim().optional(),
  travelers: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Quelques mots de plus nous aideront (10 caractères minimum).'),
})

function buildMessage(data, subject) {
  const service = SERVICE_OPTIONS.find((o) => o.id === data.service)?.label
  const title = `Demande — ${service}${subject ? ` : ${subject}` : ''}`
  const details = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    data.phone && `Téléphone : ${data.phone}`,
    data.dates && `Dates souhaitées : ${data.dates}`,
    data.travelers && `Nombre de personnes : ${data.travelers}`,
  ].filter(Boolean)
  return { title, body: `${details.join('\n')}\n\n${data.message}` }
}

function Field({ label, error, optional, children }) {
  return (
    <label className="block">
      <span className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-ivoire/50 mb-2">
        {label}
        {optional && <span className="normal-case tracking-normal text-ivoire/30">facultatif</span>}
      </span>
      {children}
      {error && <span role="alert" className="block text-xs text-red-300 mt-1.5">{error.message}</span>}
    </label>
  )
}

const inputClass =
  'w-full bg-panel border filet rounded-sm px-4 py-3 text-[15px] text-ivoire placeholder:text-ivoire/25 focus:outline-none focus:border-laiton transition-colors aria-[invalid=true]:border-red-300/60'

export default function Contact() {
  const [params] = useSearchParams()
  const subject = params.get('objet') ?? ''
  const presetService = SERVICE_OPTIONS.some((o) => o.id === params.get('service')) ? params.get('service') : 'circuits'
  const [sent, setSent] = useState(null)
  const canWhatsapp = Boolean(SITE.whatsapp)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      service: presetService,
      message: subject ? `Bonjour, je souhaite des informations sur « ${subject} ».` : '',
    },
  })

  const send = (channel) => (data) => {
    const { title, body } = buildMessage(data, subject)
    if (channel === 'whatsapp') window.open(whatsappLink(`${title}\n\n${body}`), '_blank', 'noopener')
    else window.location.href = mailtoLink(title, body)
    setSent(channel)
  }

  const tel = telLink()

  return (
    <Page>
      <Seo title="Contact" description="Contactez ALAFIA à Cotonou pour organiser un circuit, louer une voiture ou un logement au Bénin." />
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-24">
        <div>
          <PageHeader
            eyebrow="Contact"
            title="Parlons de votre séjour"
            description="Dites-nous ce que vous avez en tête : dates, envies, nombre de personnes. Nous revenons vers vous avec une proposition adaptée."
          />
          <address className="not-italic flex flex-col gap-4 text-[15px] text-ivoire/75">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-laiton transition-colors w-fit">
              <Mail size={17} strokeWidth={1.5} className="text-laiton" /> {SITE.email}
            </a>
            {tel && (
              <a href={tel} className="flex items-center gap-3 hover:text-laiton transition-colors w-fit">
                <Phone size={17} strokeWidth={1.5} className="text-laiton" /> {SITE.phone}
              </a>
            )}
            <p className="flex items-center gap-3">
              <MapPin size={17} strokeWidth={1.5} className="text-laiton" /> {SITE.city}
            </p>
          </address>
        </div>

        {sent ? (
          <div className="border filet rounded-sm p-8 md:p-10 self-start" role="status">
            <Check size={28} className="text-laiton mb-5" />
            <h2 className="font-display text-2xl mb-3">Votre demande est prête.</h2>
            <p className="text-ivoire/60 leading-relaxed mb-8">
              {sent === 'whatsapp' ? 'WhatsApp' : 'Votre messagerie'} s’est ouvert avec votre demande pré-remplie :
              il ne reste plus qu’à l’envoyer. Rien ne s’est ouvert ? Écrivez-nous directement à{' '}
              <a href={`mailto:${SITE.email}`} className="text-laiton">{SITE.email}</a>.
            </p>
            <button type="button" onClick={() => setSent(null)} className="text-sm border-b border-laiton pb-0.5">
              Modifier la demande
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(send('email'))} noValidate className="space-y-6">
            {subject && (
              <p className="text-sm text-ivoire/60 border-l-2 border-laiton pl-4">
                Objet : <span className="text-ivoire">{subject}</span>
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Nom" error={errors.name}>
                <input {...register('name')} autoComplete="name" aria-invalid={!!errors.name} className={inputClass} />
              </Field>
              <Field label="E-mail" error={errors.email}>
                <input {...register('email')} type="email" autoComplete="email" aria-invalid={!!errors.email} className={inputClass} />
              </Field>
              <Field label="Téléphone" optional>
                <input {...register('phone')} type="tel" autoComplete="tel" placeholder="+229 …" className={inputClass} />
              </Field>
              <Field label="Service" error={errors.service}>
                <select {...register('service')} className={inputClass}>
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Dates souhaitées" optional>
                <input {...register('dates')} placeholder="ex. du 12 au 18 décembre" className={inputClass} />
              </Field>
              <Field label="Nombre de personnes" optional>
                <input {...register('travelers')} inputMode="numeric" placeholder="ex. 2" className={inputClass} />
              </Field>
            </div>

            <Field label="Message" error={errors.message}>
              <textarea {...register('message')} rows={6} aria-invalid={!!errors.message} className={`${inputClass} resize-y`} />
            </Field>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" className="flex items-center justify-center gap-2 bg-laiton text-onyx font-medium px-8 py-3.5 rounded-sm hover:brightness-110 transition">
                <Mail size={16} /> Envoyer par e-mail
              </button>
              {canWhatsapp && (
                <button
                  type="button"
                  onClick={handleSubmit(send('whatsapp'))}
                  className="flex items-center justify-center gap-2 border border-laiton/50 px-8 py-3.5 rounded-sm hover:border-laiton transition-colors"
                >
                  <MessageCircle size={16} /> Envoyer sur WhatsApp
                </button>
              )}
            </div>
            <p className="text-xs text-ivoire/50">
              Vos informations servent uniquement à répondre à votre demande.
            </p>
          </form>
        )}
      </div>
    </Page>
  )
}
