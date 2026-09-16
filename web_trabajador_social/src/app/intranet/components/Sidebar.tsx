"use client";

import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaUserCog, FaChevronDown, FaChevronRight, FaMale, FaFemale, FaAndroid, FaClipboardList, FaCalendarAlt, FaFileAlt, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import { useUserFromToken } from "./hooks/useUserFromToken";
import { usePathname } from "next/navigation";

// Define interface for sub-submenu items (e.g., Listado General, Estadísticas)
interface SubSubMenuItem {
  title: string;
  href: string;
}

// Define interface for submenu items (e.g., Reportes de Colegiados, Reportes de Usuarios)
interface SubMenuItem {
  title: string;
  href: string;
  items?: SubSubMenuItem[]; // Optional array of sub-sub-items
}

// Define interface for top-level menu items (e.g., Dashboard, Colegiados, Reportes)
interface MenuItem {
  title: string;
  icon: React.ElementType; // Use React.ElementType for component type
  href: string;
  active?: boolean; // Optional active state
  submenu?: SubMenuItem[]; // Optional array of submenu items
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen?: boolean, setSidebarOpen?: (open: boolean) => void }) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubmenuMobile, setOpenSubmenuMobile] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  const { user } = useUserFromToken();
  const pathname = usePathname();

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    setCurrentDate(formattedDate);
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: FaHome,
      href: "/intranet"
    },
    {
      title: "Colegiados",
      icon: FaUsers,
      href: "/intranet/colegiados"
    },
    {
      title: "Usuarios",
      icon: FaUserCog,
      href: "/intranet/usuarios"
    },
    // {
    //   title: "Actividades",
    //   icon: FaClipboardList,
    //   href: "/intranet/actividades"
    // },
    // {
    //   title: "Calendario",
    //   icon: FaCalendarAlt,
    //   href: "/intranet/calendario"
    // },
    //  {
    //    title: "Documentos",
    //    icon: FaFileAlt,
    //    href: "#",
    //    submenu: [
    //      {
    //        title: "Documentos Institucionales",
    //        href: "/intranet/documentos/institucionales",
    //        items: [
    //          { title: "Estatutos", href: "/intranet/documentos/institucionales/estatutos" },
    //          { title: "Reglamentos", href: "/intranet/documentos/institucionales/reglamentos" },
    //          { title: "Actas", href: "/intranet/documentos/institucionales/actas" }
    //        ]
    //      },
    //      {
    //        title: "Documentos de Colegiados",
    //        href: "/intranet/documentos/colegiados",
    //        items: [
    //          { title: "Solicitudes", href: "/intranet/documentos/colegiados/solicitudes" },
    //          { title: "Certificados", href: "/intranet/documentos/colegiados/certificados" },
    //          { title: "Constancias", href: "/intranet/documentos/colegiados/constancias" }
    //        ]
    //      },
    //      {
    //        title: "Formatos y Plantillas",
    //        href: "/intranet/documentos/formatos",
    //        items: [
    //          { title: "Formatos PDF", href: "/intranet/documentos/formatos/pdf" },
    //          { title: "Formatos Word", href: "/intranet/documentos/formatos/word" },
    //          { title: "Formatos Excel", href: "/intranet/documentos/formatos/excel" }
    //        ]
    //      },
    //      {
    //        title: "Archivos Multimedia",
    //        href: "/intranet/documentos/multimedia",
    //        items: [
    //          { title: "Imágenes", href: "/intranet/documentos/multimedia/imagenes" },
    //          { title: "Videos", href: "/intranet/documentos/multimedia/videos" },
    //          { title: "Presentaciones", href: "/intranet/documentos/multimedia/presentaciones" }
    //        ]
    //      }
    //    ]
    //  },
    //  {
    //    title: "Reportes",
    //    icon: FaChartBar,
    //    href: "#",
    //    submenu: [
    //      {
    //        title: "Reportes de Colegiados",
    //        href: "/intranet/reportes/colegiados",
    //        items: [
    //          { title: "Listado General", href: "/intranet/reportes/colegiados/listado" },
    //          { title: "Estadísticas", href: "/intranet/reportes/colegiados/estadisticas" },
    //          { title: "Estado de Cuotas", href: "/intranet/reportes/colegiados/cuotas" }
    //        ]
    //      },
    //      {
    //        title: "Reportes de Usuarios",
    //        href: "/intranet/reportes/usuarios",
    //        items: [
    //          { title: "Actividad de Usuarios", href: "/intranet/reportes/usuarios/actividad" },
    //          { title: "Permisos y Roles", href: "/intranet/reportes/usuarios/permisos" }
    //        ]
    //      },
    //      {
    //        title: "Reportes Generales",
    //        href: "/intranet/reportes/generales",
    //        items: [
    //          { title: "Actividades del Sistema", href: "/intranet/reportes/generales/actividades" },
    //          { title: "Estadísticas Generales", href: "/intranet/reportes/generales/estadisticas" }
    //        ]
    //      }
    //    ]
    //  }
  ];

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  // Elige el icono según el sexo
  const getUserIcon = (sexo: string | undefined) => {
    if (sexo === "1") return <FaMale className="w-20 h-20 text-blue-300 mb-1" />;
    if (sexo === "2") return <FaFemale className="w-20 h-20 text-pink-300 mb-1" />;
    return <FaAndroid className="w-20 h-20 text-green-400 mb-1" />;
  };

  return (
    <>
      {/* Sidebar completo (escritorio) */}
      <div className="hidden md:flex w-64 bg-gray-800 text-white flex-col fixed top-0 bottom-0 left-0">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-12 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">CTSP</span>
            </div>
            <span className="text-xl font-bold">Intranet</span>
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col items-center py-4 border-b border-gray-700">
          {getUserIcon(user?.sexo)}
          <span className="text-xs font-semibold text-white">{user?.nombres} {user?.apellidos}</span>
          <span className="text-xs text-blue-200">{user?.nombre_rol}</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      openSubmenu === item.title
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </div>
                    {openSubmenu === item.title ? (
                      <FaChevronDown className="w-4 h-4" />
                    ) : (
                      <FaChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {openSubmenu === item.title && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <div key={subIndex} className="space-y-1">
                          <Link
                            href={subItem.href}
                            className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
                          >
                            {subItem.title}
                          </Link>
                          {subItem.items && (
                            <div className="ml-4 space-y-1">
                              {subItem.items.map((subSubItem, subSubIndex) => (
                                <Link
                                  key={subSubIndex}
                                  href={subSubItem.href}
                                  className="block px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
                                >
                                  {subSubItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
        {/* Fecha actual */}
        <div className="text-center text-xs text-gray-400 py-2 border-t border-gray-700">
          {currentDate}
        </div>
      </div>

      {/* Sidebar compacto (móvil tipo drawer) */}
      {sidebarOpen && (
        <div className="flex md:hidden w-64 bg-gray-800 text-white flex-col fixed top-0 bottom-0 left-0 z-30 items-center transition-transform duration-300">
          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            aria-label="Cerrar sidebar"
          >
            ✕
          </button>
          {/* Logo */}
          <div className="flex items-center justify-center h-16 w-full bg-gray-900 border-b border-gray-700">
            <div className="w-10 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CTSP</span>
            </div>
          </div>
          {/* Menú dinámico con submenús */}
          <nav className="flex flex-col gap-2 mt-8 w-full">
            {menuItems.map((item, index) => (
              <div key={index} className="w-full flex flex-col">
                {item.submenu ? (
                  <>
                    <button
                      className={`flex flex-row items-center w-full py-2 px-4 ${
                        pathname.startsWith(item.href) ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => setOpenSubmenuMobile(openSubmenuMobile === item.title ? null : item.title)}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="text-xs ml-2">{item.title}</span>
                    </button>
                    {openSubmenuMobile === item.title && (
                      <div className="flex flex-col items-start w-full pl-8">
                        {item.submenu.map((sub, subIndex) => (
                          <div key={subIndex} className="w-full">
                            <Link
                              href={sub.href}
                              className={`flex flex-row items-center py-1 text-sm w-full ${
                                pathname === sub.href
                                  ? 'text-blue-500 font-bold'
                                  : 'text-gray-300 hover:text-white'
                              }`}
                              onClick={() => setSidebarOpen && setSidebarOpen(false)}
                            >
                              <span className="ml-2">{sub.title}</span>
                            </Link>
                            {/* Renderizar sub-submenús si existen */}
                            {sub.items && (
                              <div className="flex flex-col items-start w-full pl-6">
                                {sub.items.map((subSub, subSubIndex) => (
                                  <Link
                                    key={subSubIndex}
                                    href={subSub.href}
                                    className={`flex flex-row items-center py-1 text-xs w-full ${
                                      pathname === subSub.href
                                        ? 'text-blue-500 font-bold'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                                    onClick={() => setSidebarOpen && setSidebarOpen(false)}
                                  >
                                    <span className="ml-2">{subSub.title}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex flex-row items-center w-full py-2 px-4 ${
                      pathname === item.href ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen && setSidebarOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xs ml-2">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 