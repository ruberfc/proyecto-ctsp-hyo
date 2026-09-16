import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Página No Encontrada
      </h2>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
        Volver a Inicio
      </Link>
    </div>
  );
} 