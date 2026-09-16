"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import Image from 'next/image';
import ImageModal from '../components/ImageModal';

// Imágenes de la galería (extraídas a la parte superior)
const galleryImages: { src: string; title: string }[] = [
    { src: "/images/site/eventos/evento_1.webp", title: "Conferencia Virtual" },
    { src: "/images/site/eventos/evento_2.webp", title: "Conversatorio Virtual" },
    { src: "/images/site/eventos/evento_3.webp", title: "Taller Virtual" },
];

function Eventos() {

    // Estado para controlar el modal de la galería
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para controlar la carga de cada imagen de la galería
    const [loadedGallery, setLoadedGallery] = useState<{ [index: number]: boolean }>({});

    // Función para abrir el modal
    const openModal = (image: { src: string; title: string }) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            Eventos y Actividades del CTSP
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Conferencias, conversatorios y talleres del CTSP – Región VI, Sede Huancayo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-slate-600"
                                onClick={() => openModal(image)}
                            >
                                {/* Skeleton */}
                                {!loadedGallery[index] && (
                                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-100 dark:from-slate-700 dark:to-slate-800" />
                                )}

                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    width={400}
                                    height={400}
                                    className={`w-full h-full object-cover transition-transform duration-300 ${loadedGallery[index] ? 'group-hover:scale-105 opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setLoadedGallery(prev => ({ ...prev, [index]: true }))}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${loadedGallery[index] ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="font-medium">{image.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Modal para mostrar imagen en pantalla completa */}
                <ImageModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    imageSrc={selectedImage?.src || ""}
                    imageAlt={selectedImage?.title || ""}
                    imageTitle={selectedImage?.title}
                />

            </div>


        </PageContainer>
    );
}

export default Eventos;
