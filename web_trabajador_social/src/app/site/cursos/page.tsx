"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt, FaArrowRight, FaSearch, FaBook, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';

const cursos = [
  {
    id: 1,
    titulo: "Técnicas de Entrevista Social",
    descripcion: "Aprende metodologías efectivas para realizar entrevistas sociales profesionales, con enfoque en la empatía y la recolección de información.",
    duracion: "2 meses",
    modalidad: "Presencial",
    inicio: "2024-07-15",
    cupos: 25,
    lugar: "Sede Central - Huancayo",
    precio: "S/. 800",
    destacado: true,
    icono: FaBook
  },
  {
    id: 2,
    titulo: "Gestión de Casos Sociales",
    descripcion: "Desarrolla habilidades para la gestión y seguimiento de casos sociales, incluyendo documentación y evaluación de resultados.",
    duracion: "3 meses",
    modalidad: "Híbrida",
    inicio: "2024-08-01",
    cupos: 20,
    lugar: "Sede Central - Huancayo",
    precio: "S/. 1,200",
    destacado: true,
    icono: FaLaptop
  },
  {
    id: 3,
    titulo: "Intervención en Crisis",
    descripcion: "Técnicas y estrategias para la intervención en situaciones de crisis social y familiar, con enfoque en primeros auxilios psicológicos.",
    duracion: "1 mes",
    modalidad: "Virtual",
    inicio: "2024-07-20",
    cupos: 30,
    lugar: "Plataforma Virtual",
    precio: "S/. 500",
    destacado: false,
    icono: FaChalkboardTeacher
  },
  {
    id: 4,
    titulo: "Trabajo Social en Salud",
    descripcion: "Especialización en intervención social en el ámbito de la salud, incluyendo trabajo con pacientes y familias en hospitales.",
    duracion: "2 meses",
    modalidad: "Presencial",
    inicio: "2024-08-15",
    cupos: 15,
    lugar: "Sede Central - Huancayo",
    precio: "S/. 900",
    destacado: false,
    icono: FaBook
  }
];

function Cursos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('todos');

  const filteredCursos = cursos.filter(curso => {
    const matchesSearch = curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModalidad = selectedModalidad === 'todos' || curso.modalidad === selectedModalidad;
    return matchesSearch && matchesModalidad;
  });

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div> */}
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Cursos Profesionales
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Desarrolla nuevas habilidades y competencias con nuestros cursos especializados en trabajo social
            </p>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl shadow-xl p-6 mb-12 border border-gray-100 dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar cursos..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <select
                value={selectedModalidad}
                onChange={(e) => setSelectedModalidad(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="todos">Todas las modalidades</option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Híbrida">Híbrida</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredCursos.map((curso) => (
              <div
                key={curso.id}
                className={`group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700 ${curso.destacado ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Sección Izquierda - Icono y Modalidad */}
                  <div className="md:w-48 bg-gradient-to-br from-blue-500 to-purple-500 p-6 flex flex-col items-center justify-center text-white">
                    <curso.icono className="h-16 w-16 mb-4" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {curso.modalidad}
                    </span>
                  </div>

                  {/* Sección Central - Información Principal */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {curso.titulo}
                        </h3>
                        <p className="text-gray-600 dark:text-slate-300 mb-4">
                          {curso.descripcion}
                        </p>
                      </div>
                      {curso.destacado && (
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-400 text-yellow-900">
                          Destacado
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                        <FaClock className="h-5 w-5 text-blue-500" />
                        <span>{curso.duracion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                        <FaCalendarAlt className="h-5 w-5 text-blue-500" />
                        <span>{new Date(curso.inicio).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                        <FaUsers className="h-5 w-5 text-blue-500" />
                        <span>{curso.cupos} cupos</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                        <FaMapMarkerAlt className="h-5 w-5 text-blue-500" />
                        <span>{curso.lugar}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sección Derecha - Precio y Botón */}
                  <div className="md:w-48 bg-gray-50 dark:bg-slate-800 p-6 flex flex-col items-center justify-center border-l border-gray-100 dark:border-slate-700">
                    <span className="text-2xl font-bold text-blue-600 mb-4">
                      {curso.precio}
                    </span>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                      Inscribirse
                      <FaArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCursos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-slate-300 text-lg">No se encontraron cursos que coincidan con tu búsqueda.</p>
            </div>
          )}

          {/* <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">¿Interesado en nuestros cursos?</h2>
              <p className="text-lg text-white/90 mb-8">
                Contáctanos para obtener más información sobre nuestros programas, requisitos de inscripción y opciones de pago.
              </p>
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
                Solicitar Información
              </button>
            </div>
          </div> */}

        </div>
      </div>
    </PageContainer>
  );
}

export default Cursos;
