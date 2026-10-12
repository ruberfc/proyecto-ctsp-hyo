import PageContainer from '@/app/site/components/PageContainer';
import { FiArrowDown, FiBookOpen, FiBriefcase, FiFileText, FiGlobe, FiUsers } from 'react-icons/fi';

const capitulosReglamento = [
    {
        numero: '01',
        icono: FiFileText,
        capitulo: 'Capítulo I',
        tema: 'Disposiciones Generales',
        articulos: 'Artículos 1 al 4',
        resumen: 'Define el objeto y finalidad del reglamento para garantizar la aplicación de la Ley N° 30112. Establece su ámbito de aplicación (sectores público, privado y ONGs) y detalla los 7 principios fundamentales del trabajo social, tales como el respeto a la dignidad, derechos humanos, justicia social, confidencialidad e integridad profesional.',
    },
    {
        numero: '02',
        icono: FiBriefcase,
        capitulo: 'Capítulo II',
        tema: 'Ejercicio Profesional',
        articulos: 'Artículos 5 al 9',
        resumen: 'Regula los requisitos para ejercer (título universitario inscrito en SUNEDU y colegiatura vigente). Define el rol técnico del profesional, enumera los campos de intervención (salud, familia, forense, organizacional, etc.) y detalla las funciones específicas, como diagnósticos sociales, intervención en crisis, elaboración de informes y ejercicio liberal independiente.',
    },
    {
        numero: '03',
        icono: FiUsers,
        capitulo: 'Capítulo III',
        tema: 'Relaciones Laborales',
        articulos: 'Artículos 10 al 13',
        resumen: 'Establece el régimen laboral aplicable en los sectores público y privado. Garantiza derechos como la seguridad y salud en el trabajo, equidad remunerativa y facilidades para la capacitación de posgrado. Regula el ascenso y carrera en el sector público, así como los requisitos para dirigir unidades orgánicas de trabajo social o bienestar social.',
    },
    {
        numero: '04',
        icono: FiGlobe,
        capitulo: 'Capítulo IV',
        tema: 'Asistencia Técnica y Capacitación',
        articulos: 'Artículo 14',
        resumen: 'Determina las competencias del Ministerio de Trabajo y Promoción del Empleo (MTPE) y de la SUNAFIL para brindar orientación, asistencia técnica y capacitación sobre la normativa laboral aplicable a los trabajadores sociales y a sus empleadores bajo el régimen privado.',
    },
];

export default function ReglamentoLeyPage() {
    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="mx-auto max-w-7xl px-4">
                    <header className="relative overflow-hidden rounded-lg border border-[#234568] bg-[#102d4f] text-white shadow-lg">
                        <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-amber-300 via-amber-500 to-blue-400" aria-hidden="true" />
                        <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
                            <div className="max-w-3xl">
                                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                                    <span className="h-px w-7 bg-amber-400" aria-hidden="true" /> Documento normativo
                                </p>
                                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Reglamento de la Ley 30112</h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                                    Consulta el documento normativo relacionado con el ejercicio profesional del trabajador social.
                                </p>
                                <a
                                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    href="#documento-reglamento"
                                >
                                    <FiBookOpen size={18} aria-hidden="true" /> Ir al reglamento <FiArrowDown size={16} aria-hidden="true" />
                                </a>
                            </div>

                            <div className="flex items-center gap-4 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-amber-300/35 bg-white/5 text-amber-300">
                                    <FiFileText size={23} aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Marco normativo</p>
                                    <p className="mt-1 text-lg font-bold">Ley 30112</p>
                                    <p className="text-sm text-slate-300">Documento complementario</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="py-12 sm:py-16" aria-labelledby="contenido-reglamento">
                        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400">Contenido del documento</p>
                                <h2 id="contenido-reglamento" className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Estructura del reglamento</h2>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                                <FiBookOpen size={15} aria-hidden="true" /> {capitulosReglamento.length} capítulos
                            </span>
                        </div>

                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {capitulosReglamento.map(({ icono: Icono, ...capitulo }) => (
                                <article className="group relative grid gap-4 border-b border-slate-200 py-6 pl-4 transition-colors last:border-b-0 hover:bg-blue-50/60 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6 sm:pl-5 dark:border-slate-700 dark:hover:bg-blue-950/20" key={capitulo.numero}>
                                    <span className="absolute bottom-6 left-0 top-6 w-0.5 bg-blue-200 transition-colors group-hover:bg-blue-700 dark:bg-blue-900 dark:group-hover:bg-blue-400" aria-hidden="true" />
                                    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:justify-center sm:gap-2">
                                        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-800 transition-colors group-hover:bg-blue-700 group-hover:text-white dark:bg-blue-400/10 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-slate-950">
                                            <Icono size={19} aria-hidden="true" />
                                        </span>
                                        <span className="font-mono text-xs font-bold tracking-wider text-blue-700 dark:text-blue-300">{capitulo.numero}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{capitulo.capitulo}</span>
                                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">{capitulo.articulos}</span>
                                        </div>
                                        <h3 className="mt-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-800 dark:text-white dark:group-hover:text-blue-300">{capitulo.tema}</h3>
                                        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-300">{capitulo.resumen}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="documento-reglamento" className="border-t border-slate-200 py-10 dark:border-slate-700" aria-labelledby="visor-reglamento">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">Archivo institucional · PDF</p>
                                <h2 id="visor-reglamento" className="text-2xl font-bold text-slate-900 dark:text-white">Reglamento de la Ley 30112</h2>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Consulta el documento completo directamente en esta página.</p>
                            </div>
                            <a
                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-950/10 transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-300 dark:text-[#102d4f] dark:ring-blue-200/20 dark:hover:bg-blue-200 dark:focus-visible:outline-blue-200"
                                href="/pdf/REGLAMENTO_LEY_30112.pdf"
                                download="Reglamento-Ley-30112.pdf"
                            >
                                <FiArrowDown size={16} aria-hidden="true" /> Descargar PDF
                            </a>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-200 shadow-md dark:border-slate-700 dark:bg-slate-900">
                            <div className="flex min-h-11 items-center justify-between border-b border-slate-300 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <span className="grid size-7 place-items-center rounded bg-blue-800 text-white dark:bg-blue-300 dark:text-[#102d4f]">
                                        <FiFileText size={15} aria-hidden="true" />
                                    </span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Vista previa del reglamento</span>
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ley 30112</span>
                            </div>
                            <iframe
                                className="block h-[75vh] min-h-[640px] w-full bg-slate-200 sm:h-[85vh] sm:min-h-[820px] dark:bg-slate-900"
                                src="/pdf/REGLAMENTO_LEY_30112.pdf#view=FitH"
                                title="Reglamento de la Ley 30112"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </PageContainer>
    );
}