"use client";
import React from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaBullseye, FaHistory, FaAward, FaHandshake, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { siteContact } from '@/app/site/constants/contact';

const secciones = [
  {
    id: 1,
    titulo: "Misión y Visión",
    descripcion: "Como institución líder en el desarrollo profesional del trabajo social, nos comprometemos a promover la excelencia y la ética en el ejercicio de la profesión. Nuestra visión es ser referente nacional en la formación y desarrollo de trabajadores sociales comprometidos con el cambio social.",
    descripcionLarga: "Nuestra misión es fortalecer la profesión del trabajo social a través de la promoción de estándares éticos, la formación continua y el desarrollo profesional. Buscamos empoderar a nuestros colegiados para que sean agentes de cambio social efectivos, capaces de abordar los desafíos contemporáneos con profesionalismo y compromiso.",
    icono: FaBullseye,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-100",
    items: [
      "Promover la excelencia profesional y la ética",
      "Fortalecer el desarrollo profesional continuo",
      "Impulsar la innovación en la práctica social",
      "Garantizar la calidad del servicio profesional"
    ]
  },
  // {
  //   id: 2,
  //   titulo: "Junta Directiva",
  //   descripcion: "Nuestra junta directiva está conformada por profesionales destacados con amplia experiencia en el campo del trabajo social. Lideran nuestra institución con compromiso y visión estratégica.",
  //   descripcionLarga: "La junta directiva está compuesta por profesionales con más de 15 años de experiencia en el campo del trabajo social. Cada miembro aporta su expertise en diferentes áreas, desde la intervención social hasta la gestión institucional, asegurando una dirección integral y efectiva.",
  //   icono: FaUsers,
  //   color: "from-purple-500 to-purple-600",
  //   bgColor: "bg-purple-100",
  //   items: [
  //     "Dr. Juan Pérez - Presidente",
  //     "Dra. María García - Vicepresidenta",
  //     "Lic. Carlos Rodríguez - Secretario General",
  //     "Lic. Ana Martínez - Tesorera"
  //   ]
  // },
  // {
  //   id: 3,
  //   titulo: "Historia",
  //   descripcion: "Desde nuestra fundación en 1985, hemos sido testigos y protagonistas del desarrollo del trabajo social en el Perú. Nuestra historia está marcada por logros significativos y un compromiso constante con la profesión.",
  //   descripcionLarga: "A lo largo de más de 35 años, hemos contribuido significativamente al desarrollo del trabajo social en el Perú. Desde nuestra fundación, hemos formado a miles de profesionales y hemos sido parte fundamental en la evolución de la profesión, adaptándonos a los cambios sociales y tecnológicos.",
  //   icono: FaHistory,
  //   color: "from-green-500 to-green-600",
  //   bgColor: "bg-green-100",
  //   items: [
  //     "Fundación en 1985",
  //     "Reconocimiento nacional en 1995",
  //     "Expansión a nivel nacional en 2005",
  //     "Modernización institucional en 2020"
  //   ]
  // },
  // {
  //   id: 4,
  //   titulo: "Reconocimientos",
  //   descripcion: "Nuestro compromiso con la excelencia ha sido reconocido a nivel nacional e internacional. Estos reconocimientos validan nuestro trabajo y nos motivan a seguir mejorando.",
  //   descripcionLarga: "A lo largo de nuestra trayectoria, hemos recibido numerosos reconocimientos que validan nuestro compromiso con la excelencia profesional. Estos premios y certificaciones reflejan nuestro impacto en la sociedad y nuestro liderazgo en el campo del trabajo social.",
  //   icono: FaAward,
  //   color: "from-orange-500 to-orange-600",
  //   bgColor: "bg-orange-100",
  //   items: [
  //     "Premio Nacional a la Excelencia Institucional 2023",
  //     "Certificación ISO 9001:2015",
  //     "Reconocimiento Internacional por Innovación Social",
  //     "Premio a la Mejor Institución Profesional 2022"
  //   ]
  // },
  {
    id: 5,
    titulo: "Alianzas",
    descripcion: "Mantenemos alianzas estratégicas con instituciones educativas, organismos públicos y privados para fortalecer el desarrollo profesional y ampliar las oportunidades para nuestros colegiados.",
    descripcionLarga: "Nuestras alianzas estratégicas nos permiten ofrecer mejores oportunidades a nuestros colegiados. Trabajamos con universidades líderes, organizaciones internacionales y empresas comprometidas con el desarrollo social para crear sinergias que beneficien a la profesión.",
    icono: FaHandshake,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-100",
    items: [
      "Universidades Nacionales e Internacionales",
      "Ministerios y Organismos Públicos",
      "ONGs y Fundaciones Sociales",
      "Empresas con Responsabilidad Social"
    ]
  },
  // {
  //   id: 6,
  //   titulo: "Infraestructura",
  //   descripcion: "Contamos con instalaciones modernas y equipadas para el desarrollo profesional, incluyendo salas de capacitación, biblioteca especializada y áreas de servicio al colegiado.",
  //   descripcionLarga: "Nuestras instalaciones han sido diseñadas pensando en las necesidades de nuestros colegiados. Disponemos de espacios modernos y funcionales que facilitan el aprendizaje, la investigación y el desarrollo profesional continuo.",
  //   icono: FaBuilding,
  //   color: "from-indigo-500 to-indigo-600",
  //   bgColor: "bg-indigo-100",
  //   items: [
  //     "Sede principal con tecnología de última generación",
  //     "Salas de capacitación multimedia",
  //     "Biblioteca especializada con más de 10,000 títulos",
  //     "Centro de atención al colegiado"
  //   ]
  // }
];

function Nosostros() {
  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Sobre Nuestra Institución
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Conoce más sobre el Colegio de Trabajadores Sociales, nuestra historia, misión y compromiso con la excelencia profesional
            </p>
          </div>

          <div className="space-y-12">
            {secciones.map((seccion) => (
              <div
                key={seccion.id}
                className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Sección de Color */}
                  <div className={`md:w-1/3 ${seccion.bgColor} flex items-center justify-center p-8`}>
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${seccion.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <seccion.icono className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  {/* Sección de Contenido */}
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors duration-200 mb-6">
                      {seccion.titulo}
                    </h2>

                    <p className="text-gray-600 dark:text-slate-300 mb-6">
                      {seccion.descripcionLarga}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {seccion.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Mapa */}
              <div className="h-[500px] relative">
                      <iframe
                        src={siteContact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Información de Contacto */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <h2 className="text-3xl font-bold mb-8">Nuestra Ubicación</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-white/90">
                        {siteContact.address.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FaPhone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <p className="text-white/90">
                        {siteContact.phone.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Correo Electrónico</h3>
                      <p className="text-white/90">
                        {siteContact.email.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FaClock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Horario de Atención</h3>
                      <p className="text-white/90">
                        {siteContact.officeHours.weekdays}<br />
                        {siteContact.officeHours.saturday}

                      </p>
                    </div>
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

export default Nosostros;
