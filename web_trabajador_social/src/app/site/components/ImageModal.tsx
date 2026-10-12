"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageTitle?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageTitle
}) => {
  // Función para cerrar con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Agregar event listener solo cuando el modal está abierto
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    // Limpiar event listener cuando el componente se desmonta o el modal se cierra
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div className="relative max-w-5xl max-h-[95vh] w-full">
        {/* Botón de cerrar */}
        <button
          type="button"
          onClick={onClose}
          title="Cerrar"
          aria-label="Cerrar imagen"
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-md border border-white/20 text-white transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg> */}
          <FiX size={22} aria-hidden="true" />
        </button>
        
        {/* Imagen */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={1200}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        
        {/* Título de la imagen */}
        {imageTitle && (
          <div className="absolute bottom-2 left-4 right-4 bg-gray-500/20 text-white py-2 px-3 rounded-lg backdrop-blur-sm" onClick={(event) => event.stopPropagation()}>
            <h3 className="text-lg font-semibold">{imageTitle}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal; 