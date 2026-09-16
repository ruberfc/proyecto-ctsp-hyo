"use client";

import { FaEnvelope, FaFacebookF, FaShieldAlt, FaWhatsapp } from "react-icons/fa";

import Link from 'next/link';
import { siteContact } from '../constants/contact';
import ThemeToggle from './ThemeToggle';


export default function SocialMidea() {

    return (
        <div
            className={
                `fixed top-0 left-0 w-full h-12 z-[70] text-gray-100 text-sm px-4
                flex flex-row justify-between items-center gap-2 md:gap-6
                bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg
                transition-all duration-500`
            }
        >
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <Link
                    href={siteContact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-green-500 transition-colors duration-200"
                >
                    <FaWhatsapp className="w-4 h-4 text-green-700" />
                    <span className="hidden md:inline text-gray-200">{siteContact.phone.display}</span>
                </Link>
                <Link href={siteContact.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-200">
                    <FaFacebookF className="w-4 h-4 text-blue-700" />
                    <span className="hidden md:inline text-gray-200 font-semibold">CTSP Junín</span>
                </Link>


                <span className="flex items-center gap-1">
                    <FaEnvelope className="w-4 h-4 text-blue-300" />
                    <span className="hidden md:inline text-gray-200">{siteContact.email.display}</span>
                </span>

            </div>

            {/* Controles de tema e intranet */}
            <div className="mt-0 flex shrink-0 items-center gap-2">
                <ThemeToggle />
                <Link href="/login" title="Intranet" className="flex min-h-7 items-center gap-1 rounded-md bg-white px-2 py-1 font-semibold text-blue-500 shadow-md transition-colors duration-300 hover:bg-indigo-100">
                    <FaShieldAlt className="w-4 h-4 text-orange-300" />
                    <span className="hidden md:inline">Intranet</span>
                </Link>
            </div>
        </div>
    );
} 