"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import ThemeToggle from './ThemeToggle';

export default function Header({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between h-16 bg-white dark:bg-[#15233c] shadow-sm px-6 border-b border-gray-100 dark:border-[#263551]">
      {/* Left section with menu button and logo */}
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa solo móvil */}
        <button
          className="text-gray-500 dark:text-[#8fa3bf] hover:text-gray-700 dark:hover:text-[#e8edf5] focus:outline-none md:hidden"
          onClick={onOpenSidebar}
          aria-label="Abrir sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">CTSP</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-gray-800 dark:text-[#e8edf5] font-semibold">Colegio de Trabajadores Social</h1>
            <p className="text-xs text-gray-500 dark:text-[#8fa3bf]">Región Huancayo</p>
          </div>
        </div>
      </div>

      {/* Right section with notifications and user menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        {/* <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button> */}

        {/* User Profile */}
        {/* <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-700">Admin</span>
            <span className="text-xs text-gray-500">Administrador</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <FaUserCircle className="w-6 h-6 text-gray-600" />
          </div>
        </div> */}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-[#8fa3bf] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-[#33456a] hover:border-red-200 dark:hover:border-red-500/50"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span className="hidden md:inline text-xs font-semibold">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
} 