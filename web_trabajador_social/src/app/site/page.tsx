"use client";
import React, { useState, useEffect } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import Carousel from "@/app/site/components/Carousel";
import ImageModal from "@/app/site/components/ImageModal";
import { siteContact } from '@/app/site/constants/contact';
import { FaArrowRight, FaUsers, FaBuilding, FaBook, FaHandshake, FaLaptop, FaUserTie, FaUniversity, FaClipboardList, FaGavel, FaGlobe, FaHeartbeat, FaLightbulb, FaChalkboardTeacher, FaBalanceScale, FaPencilRuler, FaRegLightbulb, FaImage, FaGraduationCap, FaAward, FaHandsHelping } from 'react-icons/fa';
import { BsCameraReelsFill, BsCloudFill, BsDatabaseFill } from 'react-icons/bs';

import Image from 'next/image';


// Definir un pool de iconos temáticos
const iconPool = [
  FaUsers,
  FaBuilding,
  FaBook,
  FaHandshake,
  FaLaptop,
  FaUserTie,
  FaUniversity,
  FaClipboardList,
  FaGavel,
  FaGlobe,
  FaHeartbeat,
  FaLightbulb,
  FaChalkboardTeacher,
  FaBalanceScale,
  FaPencilRuler,
  FaRegLightbulb,
  BsCameraReelsFill,
  BsCloudFill,
  BsDatabaseFill
];

// Definir una paleta de colores para los iconos (clases de Tailwind)
const colorPalette = [
  'text-blue-600',
  'text-purple-600',
  'text-green-600',
  'text-orange-600',
  'text-red-600',
  'text-teal-600',
  'text-indigo-600',
];

// Imágenes de la galería (extraídas a la parte superior)
const galleryImages: { src: string; title: string }[] = [
  { src: "/images/site/galeria/galeria_1.webp", title: "Evento Institucional" },
  { src: "/images/site/galeria/galeria_2.webp", title: "Ceremonia de Graduación" },
  { src: "/images/site/galeria/galeria_3.webp", title: "Taller de Capacitación" },
  { src: "/images/site/galeria/galeria_4.webp", title: "Charlas Educativas" },
  { src: "/images/site/galeria/galeria_5.webp", title: "Actividad Comunitaria" },
  { src: "/images/site/galeria/galeria_6.webp", title: "Foro Profesional" },
  { src: "/images/site/galeria/galeria_7.webp", title: "Juramentación" },
  { src: "/images/site/galeria/galeria_8.webp", title: "Brindis de aniversario" },
  { src: "/images/site/galeria/galeria_9.webp", title: "Jornada de Integración" },
];


// Función para obtener un número aleatorio de iconos únicos con colores aleatorios
const getRandomIconsWithColors = (count: number) => {
  const shuffledIcons = iconPool.sort(() => 0.5 - Math.random()).slice(0, count);
  const shuffledColors = colorPalette.sort(() => 0.5 - Math.random());

  return shuffledIcons.map((Icon, index) => ({
    Icon,
    color: shuffledColors[index % shuffledColors.length] // Asigna un color de la paleta (se repite si hay más iconos que colores)
  }));
};

function SitePage() {
  // Estado para controlar el modal de la galería
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para controlar la carga de cada imagen de la galería
  const [loadedGallery, setLoadedGallery] = useState<{ [index: number]: boolean }>({});

  // Array de elementos (imágenes) para el carrusel
  const carouselItems: React.ReactNode[] = [
    <div key="item1" className="relative h-[clamp(420px,52vw,680px)] overflow-hidden bg-slate-900">
      <Image src="/images/site/slide/slide_1.webp" alt="Ceremonia institucional del CTSP" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/5" />
      <div className="relative z-10 h-full w-full px-6 sm:px-12 lg:px-20">
        <p className="absolute right-4 top-1 inline-flex items-center gap-3 border-l-4 border-blue-400 bg-blue-950/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 shadow-lg shadow-blue-950/30 sm:right-8 sm:top-2 sm:text-sm lg:right-16"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-300/60 bg-blue-400/20 text-blue-300 shadow-inner shadow-blue-300/20"><FaGraduationCap className="h-5 w-5" /></span><span>Colegio de Trabajadores Sociales</span></p>
        <h2 className="absolute left-1/2 top-[30%] w-[92%] -translate-x-1/2 text-center text-3xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:top-[24%] sm:w-[94%] sm:text-4xl lg:top-[10%] lg:w-full lg:text-5xl">Comprometidos con el <span className="text-blue-300">desarrollo profesional</span></h2>
        <p className="absolute bottom-[18%] left-6 max-w-xl border-l border-white/40 pl-4 text-base leading-relaxed text-white/90 drop-shadow-lg sm:bottom-[20%] sm:left-12 sm:text-lg lg:bottom-[18%] lg:left-20">Fortalecemos nuestra profesión con formación, reconocimiento y acciones que transforman nuestra región.</p>
      </div>
    </div>,
    <div key="item2" className="relative h-[clamp(420px,52vw,680px)] overflow-hidden bg-slate-900">
      <Image src="/images/site/slide/slide_2.webp" alt="Reconocimiento a profesionales del CTSP" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/5" />
      <div className="relative z-10 h-full w-full px-6 sm:px-12 lg:px-20">
        <p className="absolute right-4 top-1 inline-flex items-center gap-3 border-l-4 border-amber-400 bg-amber-950/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-100 shadow-lg shadow-amber-950/30 sm:right-8 sm:top-2 sm:text-sm lg:right-16"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/70 bg-amber-400/20 text-amber-300 shadow-inner shadow-amber-300/25"><FaAward className="h-5 w-5" /></span><span>Excelencia que inspira</span></p>
        <h2 className="absolute left-1/2 top-[30%] w-[92%] -translate-x-1/2 text-center text-3xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:top-[24%] sm:w-[94%] sm:text-4xl lg:top-[10%] lg:w-full lg:text-5xl">Celebramos el <span className="text-amber-300">talento</span> de nuestros colegiados</h2>
        <p className="absolute bottom-[18%] left-6 max-w-xl border-l border-white/40 pl-4 text-base leading-relaxed text-white/90 drop-shadow-lg sm:bottom-[20%] sm:left-12 sm:text-lg lg:bottom-[18%] lg:left-20">Cada logro profesional contribuye a construir una sociedad más justa y humana.</p>
      </div>
    </div>,
    <div key="item3" className="relative h-[clamp(420px,52vw,680px)] overflow-hidden bg-slate-900">
      <Image src="/images/site/slide/slide_3.webp" alt="Actividad institucional del CTSP" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/5" />
      <div className="relative z-10 h-full w-full px-6 sm:px-12 lg:px-20">
        <p className="absolute right-4 top-1 inline-flex items-center gap-3 border-l-4 border-emerald-400 bg-emerald-950/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 shadow-lg shadow-emerald-950/30 sm:right-8 sm:top-2 sm:text-sm lg:right-16"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-400/20 text-emerald-300 shadow-inner shadow-emerald-300/25"><FaHandsHelping className="h-5 w-5" /></span><span>Región VI - Huancayo</span></p>
        <h2 className="absolute left-1/2 top-[30%] w-[92%] -translate-x-1/2 text-center text-3xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:top-[24%] sm:w-[94%] sm:text-4xl lg:top-[10%] lg:w-full lg:text-5xl">Pasión y justicia para un <span className="text-emerald-300">país más humano</span></h2>
        <p className="absolute bottom-[18%] left-6 max-w-xl border-l border-white/40 pl-4 text-base leading-relaxed text-white/90 drop-shadow-lg sm:bottom-[20%] sm:left-12 sm:text-lg lg:bottom-[18%] lg:left-20">Trabajamos unidos por el bienestar social y la defensa de los derechos humanos.</p>
      </div>
    </div>,
  ];

  // Función para abrir el modal
  const openModal = (image: { src: string; title: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };


  // Estado para los iconos (con colores) que cambian aleatoriamente
  const [currentIconsWithColors, setCurrentIconsWithColors] = useState<{ Icon: React.ElementType; color: string }[]>([]);

  // Configurar el intervalo para cambiar iconos y colores
  useEffect(() => {
    // Seleccionar iconos y colores iniciales al montar
    setCurrentIconsWithColors(getRandomIconsWithColors(12)); // Mostrar 12 iconos ahora (4x3 grid)

    const intervalId = setInterval(() => {
      setCurrentIconsWithColors(getRandomIconsWithColors(12)); // Cambiar 12 iconos y colors cada 5 seconds
    }, 5000); // Cambiar cada 5000 ms (5 segundos)

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que el efecto solo se ejecute al montar y desmontar

  return (
    <PageContainer>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        
        {/* Hero Section */}
        <section className="relative py-0">
          <div className="mx-auto max-w-[1600px]">
            
            {/* Carrusel */}
            <div className="mb-0 w-full overflow-hidden shadow-xl sm:rounded-2xl">
              <Carousel items={carouselItems} interval={7000} />
            </div>

            <div className="mt-6  mb-6 px-5 text-center sm:mt-14 sm:px-8 lg:mt-16">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div> */}
              <h1 className="mb-4 text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 sm:text-4xl lg:text-5xl">
                Colegio de Trabajadores Sociales del Perú
              </h1>
              <div className="mx-auto mb-5 flex max-w-2xl flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-center sm:gap-3 sm:text-sm">
                <span>Creado por Ley N° 27918</span>
                <span className="hidden h-4 w-px bg-slate-300 dark:bg-slate-600 sm:block" aria-hidden="true" />
                <span>Inscrito en la Partida Registral N° 01869299</span>
              </div>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-slate-300 sm:text-lg">
                <span className="block font-semibold text-slate-700 dark:text-slate-200">Región VI · Huancayo, Junín</span>
                <span className="mt-1 block">Comprometidos con el desarrollo profesional, la justicia social y el bienestar de nuestra comunidad.</span>
              </p>
            </div>

          </div>
        </section>

        {/* Bienvenida Section - Inspirado en el ejemplo */}
        <section className="py-16 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Contenido de Texto */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6">
                  Bienvenido a Nuestra Institución
                </h2>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  Aquí podrás encontrar información relevante sobre nuestra institución, actividades, noticias, cursos de formación y recursos para nuestros colegiados y el público en general. Estamos comprometidos con el desarrollo profesional de nuestros miembros y el bienestar de la comunidad en Huancayo.
                </p>
                <a
                  href="/site/nosotros"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Conoce más
                  <FaArrowRight className="h-4 w-4" />
                </a>
              </div>
              {/* Elemento Visual con iconos aleatorios y colores */}
              <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-800 p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>

                {/* Grid de iconos aleatorios con colores */}
                <div className="relative z-10 w-full h-full grid grid-cols-4 grid-rows-3 gap-6 items-center justify-items-center opacity-90 p-4">
                  {currentIconsWithColors.map(({ Icon, color }, index) => (
                    <div key={index} 
                      className="flex items-center justify-center p-3 rounded-xl bg-white/90 dark:bg-slate-700/40 shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-white/60 dark:hover:bg-slate-700/60 w-16 h-16">
                      <Icon className={`h-9 w-9 ${color} opacity-90`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                Galería de Imágenes
              </h2>
              <p className="text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
                Explora nuestra colección de momentos importantes y eventos destacados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-slate-600"
                  onClick={() => openModal(image)}
                >
                  {/* Skeleton */}
                  {!loadedGallery[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-100 dark:from-slate-700 dark:to-slate-800" />
                  )}

                  <Image
                    src={image.src}
                    alt={image.title}
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover transition-transform duration-300 ${loadedGallery[index] ? 'group-hover:scale-105 opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoadedGallery(prev => ({ ...prev, [index]: true }))}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${loadedGallery[index] ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Facebook */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4">
              Últimas Noticias y Eventos en Facebook
            </h2>
            <p className="text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Sigue nuestra página oficial de Facebook para mantenerte informado sobre las últimas noticias, eventos, comunicados y actividades del Colegio de Trabajadores Sociales del Perú - Región Huancayo.
            </p>
            <div className="relative w-full max-w-lg mx-auto" style={{ height: '500px' }}>
              {/* Facebook Page Embed */}
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-900/50">
                <iframe
                  src={siteContact.social.facebookEmbed}
                  width="500"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </div>
            </div>
            {/* <p className="mt-4 text-gray-600 dark:text-slate-300">Puedes reemplazar el `src` del iframe con la URL de tu página o publicación de Facebook.</p> */}
          </div>
        </section>

        {/* Modal para mostrar imagen en pantalla completa */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedImage?.src || ""}
          imageAlt={selectedImage?.title || ""}
          imageTitle={selectedImage?.title}
        />

      </div>
    </PageContainer>
  );
}

export default SitePage;
