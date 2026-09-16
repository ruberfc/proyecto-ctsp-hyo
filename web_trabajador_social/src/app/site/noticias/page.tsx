"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';


const noticias = [
  {
    id: 1,
    titulo: "Nuevo Programa de Capacitación para Trabajadores Sociales",
    resumen: "El Colegio de Trabajadores Sociales de Junín lanza un innovador programa de capacitación continua para fortalecer las competencias profesionales de sus miembros.",
    imagen: "/images/noticia1.jpg",
    fecha: "15 de Marzo, 2024",
    autor: "Comité de Comunicaciones",
    categoria: "Capacitación",
    destacada: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    titulo: "Convenio con Universidad Nacional del Centro del Perú",
    resumen: "Se firma importante convenio marco con la UNCP para promover la investigación y el desarrollo profesional en el campo del trabajo social.",
    imagen: "/images/noticia2.jpg",
    fecha: "10 de Marzo, 2024",
    autor: "Comité de Relaciones Institucionales",
    categoria: "Alianzas",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    titulo: "Jornada de Actualización Profesional",
    resumen: "Exitosa jornada de actualización profesional con más de 200 participantes, abordando temas de actualidad en el trabajo social.",
    imagen: "/images/noticia3.jpg",
    fecha: "5 de Marzo, 2024",
    autor: "Comité de Eventos",
    categoria: "Eventos",
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    titulo: "Nuevas Publicaciones en Revista Profesional",
    resumen: "Lanzamiento de la nueva edición de nuestra revista profesional con artículos de investigación y experiencias de campo.",
    imagen: "/images/noticia4.jpg",
    fecha: "1 de Marzo, 2024",
    autor: "Comité Editorial",
    categoria: "Publicaciones",
    color: "from-orange-500 to-orange-600"
  }
];

const categorias = ["Todas", "Capacitación", "Alianzas", "Eventos", "Publicaciones"];

function Noticias() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const noticiasFiltradas = noticias.filter(noticia => 
    categoriaSeleccionada === "Todas" || noticia.categoria === categoriaSeleccionada
  );

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header con efecto de partículas */}
          <div className="relative text-center mb-16 overflow-hidden">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div> */}
            <h1 className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Últimas Noticias
            </h1>
            <p className="relative text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Mantente informado sobre las últimas novedades, eventos y actualizaciones del Colegio de Trabajadores Sociales
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-12">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaSeleccionada(categoria)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    categoriaSeleccionada === categoria
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white/80 text-gray-600 dark:text-slate-300 dark:bg-slate-800 hover:bg-blue-50'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Noticias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {noticiasFiltradas.map((noticia) => (
              <div
                key={noticia.id}
                className={`group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700 ${
                  noticia.destacada ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagen */}
                  <div className={`relative ${noticia.destacada ? 'md:w-1/2' : 'md:w-1/3'} h-48 md:h-auto`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${noticia.color} text-white shadow-lg`}>
                        {noticia.categoria}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700">
                      <div className={`w-full h-full bg-gradient-to-br ${noticia.color} opacity-20`}></div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className={`p-6 ${noticia.destacada ? 'md:w-1/2' : 'md:w-2/3'}`}>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="h-4 w-4 text-blue-500" />
                        <span>{noticia.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="h-4 w-4 text-purple-500" />
                        <span>{noticia.autor}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {noticia.titulo}
                    </h2>

                    <p className="text-gray-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {noticia.resumen}
                    </p>

                    <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:gap-3">
                      Leer más
                      <FaArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Noticias;
