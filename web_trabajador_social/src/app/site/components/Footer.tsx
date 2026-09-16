import {
    FaYoutube,
    FaFacebookF,
    FaWhatsapp,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaEnvelope,
    FaClock,
    FaLink,
    FaArrowRight,
    FaHome
} from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { BiFemale, BiWorld } from 'react-icons/bi';
import { siteContact } from '../constants/contact';

export default function Footer() {
    return (
        <footer id="contacto" className="relative scroll-mt-24 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Columna 1 - Logo y descripción */}
                        <div className="space-y-1">
                            <Link href="/site" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                                <div className="overflow-hidden rounded-xl bg-white/10">
                                    <Image
                                        src="/logo_ctsp.webp"
                                        alt="CTSP Logo"
                                        width={300}
                                        height={175}
                                        className="h-auto w-36 rounded-2xl object-contain p-0 md:w-46"
                                    />
                                </div>
                                <div>
                                    <h6 className="text-white font-bold text-sm">COLEGIO DE TRABAJADORES SOCIALES DEL PERÚ</h6>
                                    <p className="text-blue-400 text-sm">REGION VI - JUNIN</p>
                                </div>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                El éxito es la suma de pequeños esfuerzos repetidos día tras día.
                            </p>
                            <div className="flex gap-3">
                                <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300" aria-label="YouTube">
                                    <FaYoutube className="w-4 h-4" />
                                </Link>
                                <Link href={siteContact.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300" aria-label="Facebook">
                                    <FaFacebookF className="w-4 h-4" />
                                </Link>
                                <Link href={siteContact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300" aria-label="WhatsApp">
                                    <FaWhatsapp className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Columna 2 - Enlaces útiles */}
                        <div>
                            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                                <FaLink className="text-blue-500" />
                                Enlaces Rapidos
                            </h2>
                            <ul className="space-y-2">
                                {[
                                    // { name: 'Inicio', href: '/site' },
                                    { name: 'Consejo Directivo', href: '/site/consejo' },
                                    { name: 'Nosotros', href: '/site/nosotros' },
                                    { name: 'Colegiatura', href: '/site/colegiatura' },
                                    { name: 'Busqueda', href: '/site/consulta' },

                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group">
                                            <FaArrowRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna 3 - Horario de Atención */}
                        <div>
                            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                                <FaClock className="text-blue-500" />
                                Horario de Atención
                            </h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    {siteContact.officeHours.weekdays}
                                </li>
                                <li className="flex items-center gap-2 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    {siteContact.officeHours.saturday}
                                </li>
                                {/* <li className="flex items-center gap-2 text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    <BiFemale className="text-blue-500 w-4 h-4 ml-5" />
                                    Responsable: ...
                                </li> */}
                            </ul>
                        </div>

                        {/* Columna 4 - Contacto */}
                        <div>
                            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                                <FaHome className="text-blue-500" />
                                Contáctanos
                            </h2>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-gray-400">
                                    <FaMapMarkerAlt className="w-4 h-4 text-blue-500 mt-1" />
                                    <span>{siteContact.address.display}</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-400">
                                    <FaPhoneAlt className="w-4 h-4 text-blue-500" />
                                    <span>{siteContact.phone.display}</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-400">
                                    <FaEnvelope className="w-4 h-4 text-blue-500" />
                                    <span>{siteContact.email.display}</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-400">
                                    <BiWorld className="w-4 h-4 text-blue-500" />
                                    <span>{siteContact.website}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Inferior */}
                    <div className="mt-8 pt-4 border-t border-gray-700/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                            <p className="text-gray-400 text-xs">
                                © {new Date().getFullYear()} Colegio de Trabajadores Sociales - Todos los derechos reservados.
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-400">Huancayo, Perú</span>
                                {/* <span className="text-gray-400">Desarrollado por</span>
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium">
                                    ESITIC
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}