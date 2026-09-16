"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

import SocialMidea from './SocialMidea';

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Rutas que activan el estado de INSTITUCIONAL
  const institutionalRoutes = ['/site/historia', '/site/consejo', '/site/nosotros', '/site/institucional'];
  const isInstitutionalActive = institutionalRoutes.some(route => pathname?.startsWith(route));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!menuRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Evitar renderizado durante la hidratación
  if (!mounted) {
    return (
      <>
        <SocialMidea />
        {/* <nav className="fixed top-[48px] left-0 w-full z-[60] bg-navbar/95 text-foreground shadow-md"> */}
        <nav className="fixed top-[48px] left-0 w-full z-[60] bg-navbar/95 text-navbar-foreground shadow-md">
          <div className="container mx-auto relative flex justify-end items-center h-16 md:h-20">
            <Link href="/site" className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 md:left-6 md:top-0 md:translate-x-0 md:translate-y-0">
              <Image
                src="/logo_ctsp.webp"
                alt="CTSP Logo"
                width={1210}
                height={707}
                className="h-14 w-24 rounded-xl object-contain md:h-auto md:w-48 md:rounded-xl"
              />
            </Link>
            <button
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 text-white focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>

            <ul className="absolute top-full right-0 w-full bg-dropdown-bg text-sm text-foreground shadow-md md:relative md:flex md:space-x-3 md:space-y-0 md:bg-transparent md:text-white md:shadow-none md:top-auto md:right-auto md:w-auto flex flex-col md:flex-row justify-end md:justify-end space-y-1 p-3 md:p-0">
              <li><Link href="/site" className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded">INICIO</Link></li>

              <li className="relative group">
                <span className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded cursor-pointer">
                  INSTITUCIONAL
                  <span className="ml-1 text-[10px] transition-transform duration-300 group-hover:-rotate-180">▼</span>
                </span>
                <ul className="absolute left-0 mt-2 bg-dropdown-bg text-foreground rounded-md shadow-lg z-[60] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[220px] border border-dropdown-border">
                  <li><Link href="/site/historia" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">HISTORIA</Link></li>
                  <li><Link href="/site/consejo" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">CONSEJO DIRECTIVO</Link></li>
                  <li><Link href="/site/nosotros" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">NOSOTROS</Link></li>
                </ul>
              </li>

              <li><Link href="/site/eventos" className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded">EVENTOS</Link></li>
              <li><Link href="/site/colegiatura" className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded">COLEGIATURA</Link></li>
              <li><Link href="/site#contacto" className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded">CONTACTO</Link></li>
              <li>
                <Link title="BUSQUEDA DE COLEGIADO" href="/site/consulta" className="px-2 py-1.5 font-bold rounded-lg text-primary-foreground bg-primary hover:bg-primary-hover hover:text-primary-foreground">
                  BUSQUEDA
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <SocialMidea />

      {/* <nav className="fixed top-[48px] left-0 w-full z-[60] bg-navbar/95 text-foreground shadow-md"> */}
      <nav className="fixed top-[48px] left-0 w-full z-[60] bg-navbar/95 text-navbar-foreground shadow-md">
        <div className="container mx-auto relative flex justify-end items-center h-16 md:h-20">
          <Link href="/site" className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 md:left-6 md:top-0 md:translate-x-0 md:translate-y-0">
            <Image
              src="/logo_ctsp.webp"
              alt="CTSP Logo"
              width={1210}
              height={707}
              className="h-14 w-24 rounded-xl object-contain md:h-auto md:w-48 md:rounded-xl"
            />
          </Link>

          <button
            ref={menuButtonRef}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 text-white focus:outline-none md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <ul className={`
            
            ${isOpen ? 'block' : 'hidden'}
            absolute top-full right-0 w-full bg-dropdown-bg shadow-md
            text-foreground md:text-white
            md:relative md:flex md:space-x-6 md:space-y-0 md:bg-transparent md:shadow-none md:top-auto md:right-auto md:w-auto
            flex flex-col md:flex-row justify-end md:justify-end space-y-1 p-3 md:p-0
          `} ref={menuRef}>
            <li>
              <Link href="/site" className={`px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded ${pathname === '/site' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                INICIO
              </Link>
            </li>

            <li className="relative group">
              <span className={`px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded cursor-pointer ${isInstitutionalActive ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                INSTITUCIONAL
                <span className="ml-1 text-[10px] transition-transform duration-300 group-hover:-rotate-180">
                  ▼
                </span>
              </span>
              <ul className="absolute left-0 mt-2 bg-dropdown-bg text-foreground rounded-md shadow-lg z-[60] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[220px] border border-dropdown-border">
                <li>
                  <Link href="/site/historia" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">
                    HISTORIA
                  </Link>
                </li>
                <li>
                  <Link href="/site/consejo" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">
                    CONSEJO DIRECTIVO
                  </Link>
                </li>
                <li>
                  <Link href="/site/nosotros" className="block px-4 py-2 hover:text-primary-foreground hover:bg-primary rounded-md">
                    NOSOTROS
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="/site/eventos" className={`px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded ${pathname === '/site/eventos' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                EVENTOS
              </Link>
            </li>
            <li>
              <Link href="/site/colegiatura" className={`px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded ${pathname === '/site/colegiatura' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                COLEGIATURA
              </Link>
            </li>
            <li>
              <Link href="/site#contacto" className="px-2 py-1.5 hover:bg-card hover:text-primary hover:rounded">
                CONTACTO
              </Link>
            </li>
            <li>
              <Link title="BUSQUEDA DE COLEGIADO" href="/site/consulta" className={`px-2 py-1.5 font-bold rounded-lg text-primary-foreground bg-primary hover:bg-primary-hover hover:text-primary-foreground ${pathname === '/site/consulta' ? 'underline decoration-4 underline-offset-8 font-bold' : ''}`}>
                <span className="">BUSQUEDA</span>
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    </>

  );
}