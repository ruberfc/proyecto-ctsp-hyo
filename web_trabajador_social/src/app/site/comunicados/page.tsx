"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import PageContainer from "@/app/site/components/PageContainer";
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import ImageModal from '../components/ImageModal';

const comunicados = [
  {
    id: 1,
    titulo: "Comunicado Oficial: Felicitación por Fiestas Patrias",
    resumen: "El Colegio de Trabajadores Sociales de Junín extiende sus más sinceras felicitaciones a todos los agremiados y sus familias en esta fecha tan especial para nuestro país. Que este 28 de julio nos encuentre unidos en el compromiso de servir a nuestra sociedad.",
    imagen: "/images/site/galeria/galeria_1.webp",
    fecha: "28 de Julio, 2024",
    autor: "Junta Directiva",
    categoria: "Avisos",
    destacada: false,
    color: "from-red-500 to-red-600"
  },
  // {
  //   id: 2,
  //   titulo: "Comunicado: Actualización de Requisitos para Colegiación",
  //   resumen: "Informamos sobre los nuevos requisitos y procedimientos actualizados para el proceso de colegiación de nuevos profesionales.",
  //   imagen: "/images/comunicado2.jpg",
  //   fecha: "10 de Marzo, 2024",
  //   autor: "Comité de Colegiación",
  //   categoria: "Procedimientos",
  //   destacada: false,
  //   color: "from-blue-500 to-blue-600"
  // },
  // {
  //   id: 3,
  //   titulo: "Comunicado: Suspensión de Actividades por Mantenimiento",
  //   resumen: "Se informa sobre la suspensión temporal de actividades en las oficinas del colegio debido a trabajos de mantenimiento programados.",
  //   imagen: "/images/comunicado3.jpg",
  //   fecha: "5 de Marzo, 2024",
  //   autor: "Administración",
  //   categoria: "Avisos",
  //   destacada: false,
  //   color: "from-yellow-500 to-yellow-600"
  // },
  // {
  //   id: 4,
  //   titulo: "Comunicado: Resultados de Elecciones del Consejo Directivo",
  //   resumen: "Se publican los resultados oficiales de las elecciones para el nuevo Consejo Directivo del Colegio de Trabajadores Sociales.",
  //   imagen: "/images/comunicado4.jpg",
  //   fecha: "1 de Marzo, 2024",
  //   autor: "Comité Electoral",
  //   categoria: "Resultados",
  //   destacada: false,
  //   color: "from-green-500 to-green-600"
  // }
];

const categorias = ["Todos", "Convocatorias", "Procedimientos", "Avisos", "Resultados"];

function Comunicados() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const comunicadosFiltrados = comunicados.filter(comunicado =>
    categoriaSeleccionada === "Todos" || comunicado.categoria === categoriaSeleccionada
  );

  const handleImageError = (comunicadoId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [comunicadoId]: true
    }));
  };

  const openModal = (imagen: string, titulo: string) => {
    setSelectedImage({ src: imagen, title: titulo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header con efecto de partículas */}
          <div className="relative text-center mb-16 overflow-hidden">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div> */}
            <h1 className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Comunicados Oficiales
            </h1>
            <p className="relative text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Información oficial, convocatorias y comunicados importantes del Colegio de Trabajadores Sociales de Junín
            </p>
          </div>

          {/* Filtros */}
          {/* <div className="mb-12">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaSeleccionada(categoria)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    categoriaSeleccionada === categoria
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white/80 text-gray-600 dark:text-slate-300 hover:bg-blue-50'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div> */}

          {/* Grid de Comunicados */}
          <div className="grid grid-cols-1 gap-8">
            {comunicadosFiltrados.map((comunicado) => (
              <div
                key={comunicado.id}
                className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Imagen */}
                  <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${comunicado.color} text-white shadow-lg`}>
                        {comunicado.categoria}
                      </span>
                    </div> */}
                    {imageErrors[comunicado.id] ? (
                      <Image
                        src="/images/site/no-image.jpg"
                        alt="Imagen no disponible"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-center bg-gray-100 dark:bg-slate-700"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={comunicado.imagen}
                        alt={comunicado.titulo}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-center"
                        onError={() => handleImageError(comunicado.id)}
                      />
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="px-6 py-4 md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="h-4 w-4 text-blue-500" />
                        <span>{comunicado.fecha}</span>
                      </div>

                      {/* <div className="flex items-center gap-2">
                        <FaUser className="h-4 w-4 text-purple-500" />
                        <span>{comunicado.autor}</span>
                      </div> */}

                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {comunicado.titulo}
                    </h2>

                    <p className="text-gray-600 dark:text-slate-300 mb-4 text-justify">
                      {comunicado.resumen}
                    </p>

                    <button
                      onClick={() => openModal(
                        imageErrors[comunicado.id] ? "/images/site/no-image.jpg" : comunicado.imagen,
                        comunicado.titulo
                      )}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:gap-3"
                    >
                      Ver Imagen
                      <FaArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para mostrar imagen en pantalla completa */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.title || ""}
        imageTitle={selectedImage?.title}
      />
    </PageContainer>
  );
}

export default Comunicados;
