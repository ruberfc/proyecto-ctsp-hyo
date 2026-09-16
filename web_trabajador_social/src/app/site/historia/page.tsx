"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { BiFemale } from 'react-icons/bi';

interface ConsejoDirectivoMember {
    cargo: string;        // Cargo completo
    initials: string;    // Iniciales del cargo
    grade: string;       // Grado académico/profesional
    name: string;        // Nombre completo
}


const consejoDirectivo: ConsejoDirectivoMember[] = [
    { cargo: "PRESIDENTA", initials: "PD", grade: "Mg.", name: "Samalvides Santillana Martha Leticia" },
    { cargo: "SECRETARIA", initials: "SC", grade: "Lic.", name: "Ruth Anny Méndez Palacios" },
    { cargo: "TESORERA", initials: "TS", grade: "Mg.", name: "Solís Guerrero Rosario Lourdes" },
    { cargo: "VOCAL I", initials: "VI", grade: "Mg.", name: "Cuicapusa Galarza Magaly Magdalena" },
    { cargo: "VOCAL II", initials: "VII", grade: "Lic.", name: "Huancaya Yaringaño Delia Eulalia" },
]

const gradientPalette = [
    // 'bg-gradient-to-br from-blue-400 to-purple-600',
    // 'bg-gradient-to-br from-purple-400 to-green-600',
    // 'bg-gradient-to-br from-green-400 to-orange-600',
    // 'bg-gradient-to-br from-indigo-400 to-blue-600',
    // 'bg-gradient-to-br from-orange-400 to-red-600',
    // 'bg-gradient-to-br from-red-400 to-teal-600',
    'bg-gradient-to-br from-teal-400 to-indigo-600',

];

function Historia() {

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            ¿Quiénes Somos?
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Somos el Colegio de Trabajadores Sociales del Perú - Región VI, comprometidos con la excelencia profesional y el desarrollo social de nuestra región.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Información Principal */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-300 dark:border-slate-600">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">Nuestra Institución</h3>
                                <p className="text-gray-700 dark:text-slate-200 leading-relaxed mb-4">
                                    El Colegio de Trabajadores Sociales del Perú Región VI Huancayo Sede Junín, es una institución gremial autónoma, de derecho público interno, sin fines de lucro, que se gesta como una Región descentralizada del Colegio de Trabajadores Sociales del Perú.
                                </p>
                                <p className="text-gray-700 dark:text-slate-200 leading-relaxed">
                                    Como colectivo organizado, aspiramos a contribuir al fortalecimiento de la institucionalidad y la gobernabilidad democrática mediante el desarrollo e implementación de iniciativas técnico-profesionales y de participación ciudadana.
                                </p>
                            </div>
                        </div>

                        {/* Reseña Histórica */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-300 dark:border-slate-600">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">Reseña Histórica</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-slate-200 leading-relaxed">
                                            La primera Escuela de Servicio Social, fue creada el <span className="font-semibold text-blue-600">30 de abril de 1937</span>. Al iniciarse esta carrera en las universidades se otorgaron el título de Asistente Social, posteriormente de Licenciado(a) en Servicio Social y, hoy las universidades otorgan el título de Trabajador(a) Social.
                                        </p>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-slate-200 leading-relaxed">
                                            El Trabajo Social en nuestra región ha alcanzado un alto grado de desarrollo, así como en el Perú, sus actividades profesionales van desde la investigación, la construcción-ejecución-evaluación y vigilancia de las políticas sociales hasta la asistencia social como derecho de sectores excluidos y vulnerables.
                                        </p>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-slate-200 leading-relaxed">
                                            El <span className="font-semibold text-green-600">25 de julio</span> se celebra la creación del Colegio de Trabajadores Sociales, mediante Ley 27918 en sustitución del Colegio de Asistentes Sociales del Perú. Por tanto, se celebra el <span className="font-bold text-green-600">DÍA DEL TRABAJADOR(A) SOCIAL</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </PageContainer>
    );
}

export default Historia;
