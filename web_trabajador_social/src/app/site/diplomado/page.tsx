"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaGraduationCap, FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt, FaArrowRight, FaSearch } from 'react-icons/fa';

interface Diplomado {
  id: number;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: string;
  inicio: string;
  cupos: number;
  lugar: string;
  imagen: string;
  precio: string;
  destacado: boolean;
}

const diplomados: Diplomado[] = [
  {
    id: 1,
    titulo: "Diplomado en Intervención Social Comunitaria",
    descripcion: "Desarrolla habilidades para la intervención social efectiva en comunidades, aprendiendo metodologías y técnicas de trabajo social comunitario.",
    duracion: "6 meses",
    modalidad: "Presencial",
    inicio: "2024-08-01",
    cupos: 30,
    lugar: "Sede Central - Huancayo",
    imagen: "/images/diplomado-comunidad.jpg",
    precio: "S/. 2,500",
    destacado: true
  },
  {
    id: 2,
    titulo: "Diplomado en Trabajo Social Clínico",
    descripcion: "Especialización en intervención clínica y terapéutica para profesionales del trabajo social, con enfoque en salud mental y bienestar.",
    duracion: "8 meses",
    modalidad: "Híbrida",
    inicio: "2024-09-15",
    cupos: 25,
    lugar: "Sede Central - Huancayo",
    imagen: "/images/diplomado-clinico.jpg",
    precio: "S/. 3,000",
    destacado: true
  },
  {
    id: 3,
    titulo: "Diplomado en Gestión de Proyectos Sociales",
    descripcion: "Aprende a diseñar, implementar y evaluar proyectos sociales exitosos, con herramientas prácticas de gestión y seguimiento.",
    duracion: "5 meses",
    modalidad: "Virtual",
    inicio: "2024-10-01",
    cupos: 40,
    lugar: "Plataforma Virtual",
    imagen: "/images/diplomado-proyectos.jpg",
    precio: "S/. 2,000",
    destacado: false
  },
  {
    id: 4,
    titulo: "Diplomado en Intervención Familiar",
    descripcion: "Especialización en técnicas de intervención familiar, mediación y resolución de conflictos en el ámbito familiar.",
    duracion: "7 meses",
    modalidad: "Presencial",
    inicio: "2024-11-01",
    cupos: 20,
    lugar: "Sede Central - Huancayo",
    imagen: "/images/diplomado-familiar.jpg",
    precio: "S/. 2,800",
    destacado: false
  }
];

function DiplomadoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState<string>('todos');

  const filteredDiplomados = diplomados.filter(diplomado => {
    const matchesSearch = diplomado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diplomado.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModalidad = selectedModalidad === 'todos' || diplomado.modalidad === selectedModalidad;
    return matchesSearch && matchesModalidad;
  });

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Diplomados Profesionales
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Amplía tus conocimientos y habilidades con nuestros programas de especialización diseñados para profesionales del trabajo social
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
                  placeholder="Buscar diplomados..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiplomados.map((diplomado) => (
              <div
                key={diplomado.id}
                className={`group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700 ${
                  diplomado.destacado ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="relative h-36 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaGraduationCap className="h-16 w-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-3 right-3">
                    {diplomado.destacado && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-yellow-900">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {diplomado.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {diplomado.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-300">
                      <FaClock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{diplomado.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-300">
                      <FaCalendarAlt className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{new Date(diplomado.inicio).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-300">
                      <FaUsers className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{diplomado.cupos} cupos</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-300">
                      <FaMapMarkerAlt className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{diplomado.lugar}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-blue-400 font-medium mb-1">
                        {diplomado.modalidad}
                      </span>
                      <span className="text-base font-semibold text-blue-600">
                        {diplomado.precio}
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm">
                      Más info
                      <FaArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDiplomados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-slate-300 text-lg">No se encontraron diplomados que coincidan con tu búsqueda.</p>
            </div>
          )}

        </div>
      </div>
    </PageContainer>
  );
}

export default DiplomadoPage; 