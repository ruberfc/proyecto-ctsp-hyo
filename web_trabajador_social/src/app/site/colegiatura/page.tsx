"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import PageContainer from "@/app/site/components/PageContainer";
import { siteContact } from "@/app/site/constants/contact";

function Colegiatura() {

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            Requisitos para colegiatura al CTSP
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Conoce los requisitos oficiales para obtener tu colegiatura profesional en el CTSP Región VI - Sede Huancayo.
                        </p>
                    </div>

                    {/* Imagen de Reincorporacion */}
                    <div className="mb-16">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] transform transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,_0,_0,_0.4)] group">
                            <Image
                                src="/images/site/requisitos.webp"
                                alt="Requisitos para Colegiatura"
                                width={1200}
                                height={1600}
                                className="w-full h-auto object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 group-hover:filter group-hover:blur-[0.5px]"
                            />
                            {/* Overlay con información de requisitos */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> */}

                            {/* Contenido superpuesto */}
                            {/* <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h2 className="text-3xl font-bold mb-4">Requisitos de Incorporación al CTSP</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Solicitud dirigida a la Decana (proporcionada por CTSP)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Ficha de Empadronamiento (proporcionada por CTSP)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia de DNI legible</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia del título universitario (ambos lados)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Constancia de inscripción del título en SUNEDU</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia simple de colegiatura anterior (si aplica)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Declaración jurada de no antecedentes penales</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>3 fotos tamaño pasaporte con terno</span>
                                    </div>
                                    <div className="flex items-start gap-3 col-span-full">
                                        <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Voucher de depósito de incorporación S/. 300.00</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-white/20">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="font-semibold">Cuota Mensual: S/. 10.00</p>
                                            <p className="font-semibold">Habilitación: S/. 15.00</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Contacto:</p>
                                            <p>Tel: {siteContact.phone.display}</p>
                                            <p>Email: {siteContact.email.display}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Dirección:</p>
                                            <p>{siteContact.address.office}</p>
                                            <p>Ref: {siteContact.address.reference}</p>
                                        </div>
                                    </div>
                                </div>

                            </div> */}

                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            Requisitos de Incorporación al CTSP
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Conoce todos los requisitos, documentos y procedimientos necesarios para incorporarte al Colegio de Trabajadores Sociales del Perú - Región VI Sede Huancayo. Información oficial y actualizada para tu proceso de colegiatura profesional.
                        </p>
                    </div>

                    {/* Imagen de Reincorporacion */}
                    <div className="mb-16">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] transform transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,_0,_0,_0.4)] group">
                            <Image
                                src="/images/site/reincorporacion.webp"
                                alt="Requisitos para Colegiatura"
                                width={1200}
                                height={1600}
                                className="w-full h-auto object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 group-hover:filter group-hover:blur-[0.5px]"
                            />
                            {/* Overlay con información de requisitos */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> */}

                            {/* Contenido superpuesto */}
                            {/* <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h2 className="text-3xl font-bold mb-4">Requisitos de Incorporación al CTSP</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Solicitud dirigida a la Decana (proporcionada por CTSP)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Ficha de Empadronamiento (proporcionada por CTSP)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia de DNI legible</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia del título universitario (ambos lados)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Constancia de inscripción del título en SUNEDU</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Copia simple de colegiatura anterior (si aplica)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Declaración jurada de no antecedentes penales</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>3 fotos tamaño pasaporte con terno</span>
                                    </div>
                                    <div className="flex items-start gap-3 col-span-full">
                                        <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Voucher de depósito de incorporación S/. 300.00</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-white/20">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="font-semibold">Cuota Mensual: S/. 10.00</p>
                                            <p className="font-semibold">Habilitación: S/. 15.00</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Contacto:</p>
                                            <p>Tel: {siteContact.phone.display}</p>
                                            <p>Email: {siteContact.email.display}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Dirección:</p>
                                            <p>Av. Giráldez N° 634 - Oficina N° 102</p>
                                            <p>Ref: Cámara de Comercio de Huancayo</p>
                                        </div>
                                    </div>
                                </div>

                            </div> */}

                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>

                </div>
            </div>

        </PageContainer>
    );
}

export default Colegiatura;
