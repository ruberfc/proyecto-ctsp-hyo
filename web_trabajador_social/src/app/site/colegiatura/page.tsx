'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageContainer from "@/app/site/components/PageContainer";
import { siteContact } from '@/app/site/constants/contact';

const requisitosColegiatura = [
    { texto: 'Solicitud dirigida a la Decana (Proporciona el CTSP).' },
    { texto: 'Ficha de empadronamiento (Proporciona el CTSP).' },
    { texto: 'Ficha social (Proporciona CTSP).' },
    { texto: 'Copia de DNI legible.' },
    { texto: 'Copia del título universitario legalizado, por ambos lados (anverso y reverso).' },
    { texto: 'Constancia de inscripción del título profesional en la SUNEDU.', enlace: 'https://enlinea.sunedu.gob.pe' },
    { texto: 'Copia del certificado de estudios de los 5 años.' },
    { texto: '3 fotografías tamaño carnet fondo blanco con terno.' },
    { texto: 'Adj. Comprobante por derecho de inscripción S/. 1 000.00' },
];

const requisitosIncorporacion = [
    { texto: 'Solicitud dirigida a la Decana (Proporciona el CTSP).' },
    { texto: 'Ficha de empadronamiento (Proporciona el CTSP).' },
    { texto: 'Ficha social (Proporciona CTSP).' },
    { texto: 'Copia de DNI legible.' },
    { texto: 'Copia del título universitario legalizado, por ambos lados (anverso y reverso).' },
    { texto: 'Constancia de inscripción del título profesional en la SUNEDU.', enlace: 'https://enlinea.sunedu.gob.pe' },
    { texto: 'Copia de la colegiatura anterior.' },
    { texto: 'Declaración jurada simple de no tener antecedentes penales, ni policiales (Proporciona el CTSP).' },
    { texto: '3 fotografías tamaño carnet fondo blanco con terno.' },
    { texto: 'Adj. Comprobante por derecho de inscripción S/. 150.00.' },
];

const paletasRequisitos = {
    colegiatura: [
        {
            franja: 'bg-gradient-to-b from-blue-900 via-blue-700 to-amber-400',
            numeracion: 'text-blue-900/50 dark:text-blue-200/50',
            progreso: 'bg-amber-500',
            requisitoActivo: 'bg-amber-500 text-slate-950',
        },
    ],
    incorporacion: [
        {
            franja: 'bg-gradient-to-b from-blue-950 via-blue-700 to-amber-400',
            numeracion: 'text-blue-900/50 dark:text-blue-200/50',
            progreso: 'bg-blue-700',
            requisitoActivo: 'bg-blue-800 text-white',
        },
    ],
};

function Colegiatura() {
    const [requisitoActivoColegiatura, setRequisitoActivoColegiatura] = useState(0);
    const [requisitoActivoIncorporacion, setRequisitoActivoIncorporacion] = useState(0);
    const coloresColegiatura = paletasRequisitos.colegiatura[0];
    const coloresIncorporacion = paletasRequisitos.incorporacion[0];

    const mostrarRequisitoColegiatura = (indice: number) => {
        setRequisitoActivoColegiatura((indice + requisitosColegiatura.length) % requisitosColegiatura.length);
    };

    const mostrarRequisitoIncorporacion = (indice: number) => {
        setRequisitoActivoIncorporacion((indice + requisitosIncorporacion.length) % requisitosIncorporacion.length);
    };

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-slate-700 dark:from-blue-300 dark:to-slate-300 mb-4">
                            Requisitos para colegiatura al CTSP
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Conoce los requisitos oficiales para obtener tu colegiatura profesional en el CTSP Región VI - Sede Huancayo.
                        </p>
                    </div>

                    {/* Imagen de Colegiatura */}
                    <div className="mb-16">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] transform transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,_0,_0,_0.4)] group">
                            <Image
                                src="/images/site/requisito_colegiatura.webp"
                                alt="Requisitos para Colegiatura"
                                width={1200}
                                height={1600}
                                className="w-full h-auto object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 group-hover:filter group-hover:blur-[0.5px]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>

                    <section className="mx-auto max-w-5xl pb-16" aria-labelledby="requisitos-colegiatura">
                        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                                    Expediente profesional
                                </p>
                                <h2 id="requisitos-colegiatura" className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                                    Documentación requerida
                                </h2>
                                <p className="mt-2 max-w-2xl text-base leading-6 text-slate-600 dark:text-slate-300">
                                    Los requisitos para iniciar tu colegiatura en el CTSP Región VI.
                                </p>
                            </div>

                            <div className="w-full sm:max-w-44">
                                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    <span>Requisito</span>
                                    <span>{String(requisitoActivoColegiatura + 1).padStart(2, '0')} / {String(requisitosColegiatura.length).padStart(2, '0')}</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" role="progressbar" aria-label="Progreso de requisitos" aria-valuemin={1} aria-valuemax={requisitosColegiatura.length} aria-valuenow={requisitoActivoColegiatura + 1}>
                                    <div className={`h-full rounded-full ${coloresColegiatura.progreso} transition-all duration-500`} style={{ width: `${((requisitoActivoColegiatura + 1) / requisitosColegiatura.length) * 100}%` }} />
                                </div>
                            </div>

                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900" role="region" aria-roledescription="carrusel" aria-label="Requisitos para colegiatura">
                            <ol className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${requisitoActivoColegiatura * 100}%)` }}>
                                {requisitosColegiatura.map((requisito, indice) => (
                                    <li className="w-full shrink-0" key={requisito.texto} aria-roledescription="diapositiva" aria-label={`Requisito ${indice + 1} de ${requisitosColegiatura.length}`}>
                                        <div className="relative flex min-h-35 flex-col justify-between gap-3 overflow-hidden px-7 py-3 sm:min-h-50 sm:gap-4 sm:px-9 sm:py-5">
                                            <div className={`absolute inset-y-0 left-0 w-3 ${coloresColegiatura.franja}`} aria-hidden="true" />
                                            <div className="flex items-start justify-between gap-4">
                                                <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                                    Requisito {String(indice + 1).padStart(2, '0')}
                                                </span>
                                                <span className={`font-mono text-2xl font-bold leading-none sm:text-3xl ${coloresColegiatura.numeracion}`} aria-hidden="true">
                                                    {String(indice + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="max-w-3xl py-2">
                                                <p className="text-xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-2xl">
                                                    {requisito.texto}
                                                </p>
                                                {requisito.enlace && (
                                                    <a className="mt-2 inline-flex break-all font-semibold text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200" href={requisito.enlace} target="_blank" rel="noreferrer">
                                                        Consultar en SUNEDU <span className="sr-only"> (se abre en una nueva pestaña)</span>
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                CTSP · Región VI · Sede Huancayo
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button className="grid size-11 place-items-center rounded-md border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800" type="button" onClick={() => mostrarRequisitoColegiatura(requisitoActivoColegiatura - 1)} aria-label="Ver requisito anterior">
                                    <FiChevronLeft size={22} aria-hidden="true" />
                                </button>
                                <span className="min-w-20 text-center font-mono text-sm font-bold text-slate-700 dark:text-slate-200" aria-live="polite">
                                    {String(requisitoActivoColegiatura + 1).padStart(2, '0')} / {String(requisitosColegiatura.length).padStart(2, '0')}
                                </span>
                                <button className="grid size-11 place-items-center rounded-md bg-slate-900 text-white transition-colors hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400" type="button" onClick={() => mostrarRequisitoColegiatura(requisitoActivoColegiatura + 1)} aria-label="Ver requisito siguiente">
                                    <FiChevronRight size={22} aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2" aria-label="Elegir requisito">
                                {requisitosColegiatura.map((requisito, indice) => (
                                    <button
                                        className={`grid size-9 place-items-center rounded-md text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${indice === requisitoActivoColegiatura ? coloresColegiatura.requisitoActivo : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                                        key={requisito.texto}
                                        type="button"
                                        onClick={() => mostrarRequisitoColegiatura(indice)}
                                        aria-label={`Ir al requisito ${indice + 1}`}
                                        aria-current={indice === requisitoActivoColegiatura ? 'step' : undefined}
                                    >
                                        {indice + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <aside className="relative mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900" aria-labelledby="importante-colegiatura">
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-900 via-blue-700 to-amber-400" aria-hidden="true" />
                            <div className="flex flex-col gap-3 p-4 pl-7 sm:flex-row sm:items-start sm:gap-4 sm:p-5 sm:pl-8">
                                <span className="relative grid size-10 shrink-0 place-items-center rounded-lg bg-[#102d4f] text-amber-400">
                                    <FiMessageCircle size={20} aria-hidden="true" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 id="importante-colegiatura" className="border-b border-slate-200 pb-2 text-xl font-bold text-[#102d4f] dark:border-slate-700 dark:text-white">Importante</h3>
                                    <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700 dark:text-slate-200">
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />Todos los documentos en físico deben ser entregados en un fólder manila debidamente foliados y firmados.</li>
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />Traer 01 Mica.</li>
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" /><span>Los trámites virtuales deben ser realizados a través de WhatsApp o el correo institucional{' '}
                                            <a className="font-semibold text-blue-800 underline decoration-amber-400 underline-offset-2 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200" href={siteContact.secretariaEmail.href}>{siteContact.secretariaEmail.display}</a>.
                                        </span>
                                        </li>
                                    </ul>
                                    <a className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#102d4f] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1b426c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400" href={siteContact.whatsapp.href} target="_blank" rel="noreferrer">
                                        <FaWhatsapp size={17} aria-hidden="true" /> WhatsApp {siteContact.phone.display}
                                    </a>
                                </div>
                            </div>
                        </aside>

                    </section>

                </div>
            </div>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-slate-700 dark:from-blue-300 dark:to-slate-300 mb-4">
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
                                src="/images/site/requisito_incorporacion.webp"
                                alt="Requisitos para Colegiatura"
                                width={1200}
                                height={1600}
                                className="w-full h-auto object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 group-hover:filter group-hover:blur-[0.5px]"
                            />


                            {/* Overlay con información de requisitos */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> */}

                            {/* Contenido superpuesto */}
                            {/* 
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
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

                                </div> 
                            */}

                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>

                    <section className="mx-auto max-w-5xl pb-16" aria-labelledby="requisitos-incorporacion">
                        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
                                    Expediente profesional
                                </p>
                                <h2 id="requisitos-incorporacion" className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                                    Requisitos para incorporación
                                </h2>
                                <p className="mt-2 max-w-2xl text-base leading-6 text-slate-600 dark:text-slate-300">
                                    Documentación necesaria para incorporarte al CTSP Región VI.
                                </p>
                            </div>
                            <div className="w-full sm:max-w-44">
                                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    <span>Requisito</span>
                                    <span>{String(requisitoActivoIncorporacion + 1).padStart(2, '0')} / {String(requisitosIncorporacion.length).padStart(2, '0')}</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" role="progressbar" aria-label="Progreso de requisitos de incorporación" aria-valuemin={1} aria-valuemax={requisitosIncorporacion.length} aria-valuenow={requisitoActivoIncorporacion + 1}>
                                    <div className={`h-full rounded-full ${coloresIncorporacion.progreso} transition-all duration-500`} style={{ width: `${((requisitoActivoIncorporacion + 1) / requisitosIncorporacion.length) * 100}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900" role="region" aria-roledescription="carrusel" aria-label="Requisitos para incorporación">
                            <ol className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${requisitoActivoIncorporacion * 100}%)` }}>
                                {requisitosIncorporacion.map((requisito, indice) => (
                                    <li className="w-full shrink-0" key={requisito.texto} aria-roledescription="diapositiva" aria-label={`Requisito ${indice + 1} de ${requisitosIncorporacion.length}`}>
                                        <div className="relative flex min-h-35 flex-col justify-between gap-3 overflow-hidden px-7 py-3 sm:min-h-50 sm:gap-4 sm:px-9 sm:py-5">
                                            <div className={`absolute inset-y-0 left-0 w-3 ${coloresIncorporacion.franja}`} aria-hidden="true" />
                                            <div className="flex items-start justify-between gap-4">
                                                <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                                    Requisito {String(indice + 1).padStart(2, '0')}
                                                </span>
                                                <span className={`font-mono text-2xl font-bold leading-none sm:text-3xl ${coloresIncorporacion.numeracion}`} aria-hidden="true">
                                                    {String(indice + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="max-w-3xl py-2">
                                                <p className="text-xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-2xl">
                                                    {requisito.texto}
                                                </p>
                                                {requisito.enlace && (
                                                    <a className="mt-2 inline-flex break-all font-semibold text-blue-800 underline decoration-amber-400 underline-offset-4 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200" href={requisito.enlace} target="_blank" rel="noreferrer">
                                                        Consultar en SUNEDU <span className="sr-only"> (se abre en una nueva pestaña)</span>
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                CTSP · Región VI · Sede Huancayo
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button className="grid size-11 place-items-center rounded-md border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800" type="button" onClick={() => mostrarRequisitoIncorporacion(requisitoActivoIncorporacion - 1)} aria-label="Ver requisito de incorporación anterior">
                                    <FiChevronLeft size={22} aria-hidden="true" />
                                </button>
                                <span className="min-w-20 text-center font-mono text-sm font-bold text-slate-700 dark:text-slate-200" aria-live="polite">
                                    {String(requisitoActivoIncorporacion + 1).padStart(2, '0')} / {String(requisitosIncorporacion.length).padStart(2, '0')}
                                </span>
                                <button className="grid size-11 place-items-center rounded-md bg-blue-800 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-300 dark:text-slate-950 dark:hover:bg-blue-200" type="button" onClick={() => mostrarRequisitoIncorporacion(requisitoActivoIncorporacion + 1)} aria-label="Ver requisito de incorporación siguiente">
                                    <FiChevronRight size={22} aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2" aria-label="Elegir requisito de incorporación">
                                {requisitosIncorporacion.map((requisito, indice) => (
                                    <button
                                        className={`grid size-9 place-items-center rounded-md text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${indice === requisitoActivoIncorporacion ? coloresIncorporacion.requisitoActivo : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                                        key={requisito.texto}
                                        type="button"
                                        onClick={() => mostrarRequisitoIncorporacion(indice)}
                                        aria-label={`Ir al requisito de incorporación ${indice + 1}`}
                                        aria-current={indice === requisitoActivoIncorporacion ? 'step' : undefined}
                                    >
                                        {indice + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <aside className="relative mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900" aria-labelledby="importante-incorporacion">
                            <div className={`absolute inset-y-0 left-0 w-1.5 ${coloresIncorporacion.franja}`} aria-hidden="true" />
                            <div className="flex flex-col gap-3 p-4 pl-7 sm:flex-row sm:items-start sm:gap-4 sm:p-5 sm:pl-8">
                                <span className="relative grid size-10 shrink-0 place-items-center rounded-lg bg-blue-900 text-amber-300">
                                    <FiMessageCircle size={20} aria-hidden="true" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 id="importante-incorporacion" className="border-b border-slate-200 pb-2 text-xl font-bold text-blue-900 dark:border-slate-700 dark:text-white">Importante</h3>
                                    <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700 dark:text-slate-200">
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />Todos los documentos en físico deben ser entregados en un fólder manila debidamente foliados y firmados.</li>
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />Traer 01 Mica.</li>
                                        <li className="flex gap-2.5"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" /><span>Los trámites virtuales deben ser realizados a través de WhatsApp o el correo institucional{' '}
                                            <a className="font-semibold text-blue-800 underline decoration-amber-400 underline-offset-2 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200" href={siteContact.secretariaEmail.href}>{siteContact.secretariaEmail.display}</a>.
                                        </span></li>
                                    </ul>
                                    <a className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-300 dark:text-slate-950 dark:hover:bg-blue-200" href={siteContact.whatsapp.href} target="_blank" rel="noreferrer">
                                        <FaWhatsapp size={17} aria-hidden="true" /> WhatsApp {siteContact.phone.display}
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </section>

                </div>
            </div>

        </PageContainer>
    );
}

export default Colegiatura;
