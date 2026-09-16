"use client";
import React from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaFileAlt, FaGraduationCap, FaBriefcase, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

function RequisitosColegiado() {
  const requisitos = [
    {
      titulo: "Documentos Personales",
      icono: FaFileAlt,
      color: "from-blue-500 to-blue-600",
      items: [
        "DNI original y copia",
        "Título profesional original y copia legalizada",
        "Acta de grado original y copia legalizada",
        "2 fotografías tamaño carné actualizadas",
        "Constancia de no tener antecedentes penales",
        "Constancia de no tener antecedentes policiales"
      ]
    },
    {
      titulo: "Documentos Académicos",
      icono: FaGraduationCap,
      color: "from-purple-500 to-purple-600",
      items: [
        "Certificado de estudios universitarios",
        "Constancia de egresado (si aplica)",
        "Certificado de idiomas (si aplica)",
        "Certificados de cursos de especialización (si aplica)"
      ]
    },
    {
      titulo: "Documentos Laborales",
      icono: FaBriefcase,
      color: "from-green-500 to-green-600",
      items: [
        "Constancia de experiencia laboral",
        "Certificado de trabajo actual",
        "Currículum vitae actualizado"
      ]
    }
  ];

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Requisitos para Colegiación
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Conoce los requisitos necesarios para obtener tu colegiatura profesional y dar el siguiente paso en tu carrera
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 p-8 rounded-3xl shadow-xl mb-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <FaInfoCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                Proceso de Colegiación
              </h2>
            </div>
            <p className="text-gray-700 dark:text-slate-200 text-lg leading-relaxed">
              Para obtener la colegiatura profesional, es necesario cumplir con los siguientes requisitos y seguir el proceso establecido.
              La documentación debe estar completa y actualizada al momento de la presentación.
            </p>
          </div>

          <div className="grid gap-8">
            {requisitos.map((seccion, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 p-8 rounded-3xl shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 bg-gradient-to-r ${seccion.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <seccion.icono className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">{seccion.titulo}</h3>
                </div>
                <ul className="space-y-4">
                  {seccion.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="flex items-center gap-4 text-gray-700 dark:text-slate-200 text-lg group/item hover:translate-x-2 transition-transform duration-200"
                    >
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                        <FaCheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-3xl shadow-xl mt-12 text-white">
            <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4">
              <FaInfoCircle className="h-8 w-8" />
              Información Adicional
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <FaClock className="h-8 w-8" />
                  <h3 className="font-semibold text-xl">Horario de Atención</h3>
                </div>
                <p className="text-white/90">Lunes a Viernes de 9:00 AM a 5:00 PM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <FaClock className="h-8 w-8" />
                  <h3 className="font-semibold text-xl">Duración del Proceso</h3>
                </div>
                <p className="text-white/90">Aproximadamente 15 días hábiles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <FaPhone className="h-8 w-8" />
                  <h3 className="font-semibold text-xl">Contacto</h3>
                </div>
                <p className="text-white/90">Para más información, comuníquese con nuestra oficina de atención al colegiado.</p>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </PageContainer>
  );
}

export default RequisitosColegiado; 