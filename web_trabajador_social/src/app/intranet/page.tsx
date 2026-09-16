"use client";

import React from 'react';
import { FaUsers, FaUserCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ContentCard from './components/ContentCard';

export default function IntranetPage() {
  const router = useRouter();


  const cards = [
    {
      title: "Gestionar Usuarios",
      description: "Administra la información de los usuarios del Intranet",
      icon: FaUserCog,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-500/20",
      href: "/intranet/usuarios"
    },
    {
      title: "Gestionar Colegiados",
      description: "Administra la información de los colegiados registrados",
      icon: FaUsers,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-500/20",
      href: "/intranet/colegiados"
    },
    // {
    //   title: "Registro de Actividades",
    //   description: "Gestiona y visualiza las actividades realizadas",
    //   icon: FaClipboardList,
    //   color: "text-green-600",
    //   bgColor: "bg-green-50"
    // },
    // {
    //   title: "Calendario de Eventos",
    //   description: "Organiza y programa eventos importantes",
    //   icon: FaCalendarAlt,
    //   color: "text-orange-600",
    //   bgColor: "bg-orange-50"
    // },
    // {
    //   title: "Documentos",
    //   description: "Accede y gestiona la documentación institucional",
    //   icon: FaFileAlt,
    //   color: "text-red-600",
    //   bgColor: "bg-red-50"
    // },
    // {
    //   title: "Estadísticas",
    //   description: "Visualiza reportes y estadísticas del sistema",
    //   icon: FaChartBar,
    //   color: "text-teal-600",
    //   bgColor: "bg-teal-50"
    // }
  ];

  return (
    <ContentCard>

      {/* Tarjetas de resumen */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <FaUser className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Total Colegiados</h2>
                <p className="text-2xl font-semibold text-gray-800">150</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <FaChartBar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Cursos Activos</h2>
                <p className="text-2xl font-semibold text-gray-800">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <FaCog className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Tareas Pendientes</h2>
                <p className="text-2xl font-semibold text-gray-800">12</p>
              </div>
            </div>
          </div>
        </div> */}

      {/* Mensaje de bienvenida */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-[#15233c] dark:to-[#1a2a45] rounded-xl shadow-md p-8 mb-8 border border-blue-200 dark:border-[#263551]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">CTS</span>
                </div> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-[#e8edf5]">Bienvenido a la Intranet</h1>
                <p className="text-sm text-gray-500 dark:text-[#8fa3bf]">Panel de Control</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-[#c2cfe2] leading-relaxed">
              Has iniciado sesión correctamente. Aquí podrás gestionar toda la información del Colegio de Trabajadores Sociales y Usuarios del Intranet.
            </p>
          </div>
          {/* <div className="flex gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Sistema Activo</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Último acceso: Hoy</span>
              </div>
            </div> */}
        </div>
      </div>

      {/* Accesos rápidos */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => router.push(card.href)}
            className="bg-white dark:bg-[#15233c] rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-[#263551]"
          >
            <div className={`${card.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-[#e8edf5] mb-2">{card.title}</h3>
            <p className="text-gray-600 dark:text-[#c2cfe2] text-sm">{card.description}</p>
          </div>
        ))}
      </div>

    </ContentCard>
  );
} 