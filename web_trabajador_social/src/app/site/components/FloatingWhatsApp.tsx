import { FaWhatsapp } from 'react-icons/fa';
import { siteContact } from '../constants/contact';

// Botón flotante de WhatsApp que aparece en todas las páginas del área "site"
// Ajusta el número y el mensaje según necesidad
const DEFAULT_MESSAGE = encodeURIComponent(siteContact.whatsapp.message);

export default function FloatingWhatsApp() {
  const whatsappHref = `${siteContact.whatsapp.href}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      title="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-[60] group"
    >
      {/* Efecto de halo */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-md scale-110 group-hover:opacity-30 transition-opacity" />
      {/* Círculo principal */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 ring-4 ring-white/30 hover:bg-green-600 transition-all">
        <FaWhatsapp className="w-7 h-7" />
      </span>
    </a>
  );
}