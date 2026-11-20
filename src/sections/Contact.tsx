import { Instagram, Link2, Mail, MessageCircle } from 'lucide-react'
import { athlete } from '../data/athlete'
import { externalUrl, mailLink, whatsappLink } from '../lib/content'

export function Contact() {
  const { contact } = athlete
  const channels = [
    { label: 'WhatsApp', url: whatsappLink(contact.whatsapp, contact.message), Icon: MessageCircle },
    { label: 'E-mail', url: mailLink(contact.email, contact.subject, contact.message), Icon: Mail },
    { label: 'Instagram', url: externalUrl(contact.instagram), Icon: Instagram },
    { label: 'Contato comercial', url: mailLink(contact.commercialEmail, contact.subject, contact.message), Icon: Mail },
    ...contact.socials.map(({ label, url }) => ({ label, url: externalUrl(url), Icon: Link2 })),
  ].filter((channel) => channel.url)

  return (
    <section id="contato" tabIndex={-1} className="section contact-section" aria-labelledby="contact-title">
      <div className="wide contact-layout">
        <div data-enter>
          <p className="eyebrow">Contato</p>
          <h2 id="contact-title">Faça parte<br />dessa jornada.</h2>
        </div>
        <div className="contact-info" data-enter>
          <p className="eyebrow">Propostas de patrocínio</p>
          {channels.length > 0 ? <div className="flex flex-wrap gap-3">
            {channels.map(({ label, url, Icon }) => <a className="button button--outline" href={url} key={label}><Icon size={18} aria-hidden="true" /> {label}</a>)}
          </div> : <p>Os canais oficiais de contato serão divulgados aqui.</p>}
        </div>
      </div>
    </section>
  )
}
