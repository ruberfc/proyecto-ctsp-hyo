"use client";
import React from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaUserTie, FaFileAlt, FaGraduationCap, FaBriefcase, FaBook, FaArrowRight } from 'react-icons/fa';

const secciones = [
  {
    id: 1,
    titulo: "Beneficios de ser Colegiado",
    descripcion: "Acceso a recursos exclusivos, descuentos en cursos, bolsa de trabajo, y más.",
    icono: FaUserTie,
    color: "from-blue-500 to-blue-600",
    items: [
      "Descuentos exclusivos en cursos y diplomados",
      "Acceso a la bolsa de trabajo",
      "Recursos y materiales exclusivos",
      "Participación en eventos especiales"
    ]
  },
  {
    id: 2,
    titulo: "Trámites y Documentos",
    descripcion: "Información sobre colegiación, constancias, pagos, etc.",
    icono: FaFileAlt,
    color: "from-purple-500 to-purple-600",
    items: [
      "Proceso de colegiación",
      "Solicitud de constancias",
      "Pago de cuotas",
      "Actualización de datos"
    ]
  },
  {
    id: 3,
    titulo: "Formación y Capacitación",
    descripcion: "Accede a nuestro catálogo de cursos, talleres y programas de educación continua diseñados para tu desarrollo profesional.",
    icono: FaGraduationCap,
    color: "from-green-500 to-green-600",
    items: [
      "Cursos especializados",
      "Talleres prácticos",
      "Seminarios internacionales",
      "Certificaciones profesionales"
    ]
  },
  {
    id: 4,
    titulo: "Bolsa de Empleo y Orientación Laboral",
    descripcion: "Encuentra nuevas oportunidades laborales y recibe asesoramiento para potenciar tu carrera profesional.",
    icono: FaBriefcase,
    color: "from-orange-500 to-orange-600",
    items: [
      "Ofertas laborales exclusivas",
      "Asesoría de carrera",
      "Networking profesional",
      "Mentorías personalizadas"
    ]
  },
  {
    id: 5,
    titulo: "Recursos y Documentación",
    descripcion: "Consulta nuestra biblioteca, repositorio de documentos y publicaciones relevantes para el ejercicio de la profesión.",
    icono: FaBook,
    color: "from-red-500 to-red-600",
    items: [
      "Biblioteca digital",
      "Publicaciones especializadas",
      "Guías y manuales",
      "Investigaciones recientes"
    ]
  }
];

function Colegiado() {
  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div> */}
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Información para Colegiados
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Accede a todos los beneficios y recursos exclusivos para miembros del Colegio de Trabajadores Sociales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secciones.map((seccion) => (
              <div
                key={seccion.id}
                className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
              >
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${seccion.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <seccion.icono className="h-8 w-8 text-white" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {seccion.titulo}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-slate-300 mb-4">
                    {seccion.descripcion}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {seccion.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                    Ver más
                    <FaArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </PageContainer>
  );
}

export default Colegiado;
