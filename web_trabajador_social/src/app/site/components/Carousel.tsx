"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Iconos para los botones

// Definir la interfaz para las props del carrusel de imágenes
interface CarouselProps {
  items: React.ReactNode[]; // Array de elementos (imágenes) a mostrar
  interval?: number; // Tiempo en milisegundos para el avance automático (opcional)
}

const Carousel: React.FC<CarouselProps> = ({ items, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() =>
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      ),
      interval
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, items.length, interval]);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToItem = (itemIndex: number) => {
    setCurrentIndex(itemIndex);
  };

  if (!items || items.length === 0) {
    return null; // No renderizar si no hay elementos
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl group">
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-gray-800 dark:text-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 focus:outline-none"
        onClick={prevItem}
        aria-label="Previous item"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-gray-800 dark:text-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 focus:outline-none"
        onClick={nextItem}
        aria-label="Next item"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {items.map((_, itemIndex) => (
          <button
            key={itemIndex}
            className={
              `w-3 h-3 rounded-full transition-colors duration-300 shadow-sm
              ${itemIndex === currentIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
              }`
            }
            onClick={() => goToItem(itemIndex)}
            aria-label={`Go to item ${itemIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 