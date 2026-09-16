"use client";
import React, { useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import Image from 'next/image';
import { BiFemale } from 'react-icons/bi';
import ImageModal from '../components/ImageModal';

interface ConsejoDirectivoMember {
    cargo: string;        // Cargo completo
    initials: string;    // Iniciales del cargo
    grade: string;       // Grado académico/profesional
    name: string;        // Nombre completo
    photo?: string;      // Foto opcional del miembro
}


const consejoDirectivo: ConsejoDirectivoMember[] = [
    { cargo: "PRESIDENTA", initials: "PD", grade: "Mg.", name: "Samalvides Santillana Martha Leticia", photo: "/images/site/consejo/presidenta.webp" },
    { cargo: "SECRETARIA", initials: "SC", grade: "Lic.", name: "Ruth Anny Méndez Palacios", photo: "/images/site/consejo/secretararia.webp" },
    { cargo: "TESORERA", initials: "TS", grade: "Mg.", name: "Solís Guerrero Rosario Lourdes", photo: "/images/site/consejo/tesorera.webp" },
    { cargo: "VOCAL I", initials: "VI", grade: "Mg.", name: "Cuicapusa Galarza Magaly Magdalena", photo: "/images/site/consejo/vocal_1.webp" },
    { cargo: "VOCAL II", initials: "VII", grade: "Lic.", name: "Huancaya Yaringaño Delia Eulalia", photo: "/images/site/consejo/vocal_2.webp" },
]

const gradientPalette = [
    // 'bg-gradient-to-br from-blue-400 to-purple-600',
    // 'bg-gradient-to-br from-purple-400 to-green-600',
    // 'bg-gradient-to-br from-green-400 to-orange-600',
    // 'bg-gradient-to-br from-indigo-400 to-blue-600',
    // 'bg-gradient-to-br from-orange-400 to-red-600',
    // 'bg-gradient-to-br from-red-400 to-teal-600',
    'bg-gradient-to-br from-teal-400 to-indigo-600',

];

function Consejo() {
    const [selectedMember, setSelectedMember] = useState<ConsejoDirectivoMember | null>(null);

    const openMemberPhoto = (member: ConsejoDirectivoMember) => {
        if (member.photo) {
            setSelectedMember(member);
        }
    };

    const closeMemberPhoto = () => {
        setSelectedMember(null);
    };

    return (
        <PageContainer>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header con efecto de partículas */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            Consejo Directivo
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                            Conoce a los líderes que guían nuestro compromiso con la excelencia profesional y el desarrollo social de la región.
                        </p>
                    </div>
                    
                    <div className="flex justify-center">
                        <div className="flex max-w-4xl flex-wrap justify-center gap-8">
                            {consejoDirectivo.map((miembro, index) => (
                                <div key={index} className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
                                    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        {/* Foto placeholder con efecto de gradiente */}
                                        <div
                                            className={`aspect-[3/4] ${gradientPalette[index % gradientPalette.length]} relative flex items-center justify-center overflow-hidden ${miembro.photo ? 'cursor-pointer' : ''}`}
                                            onClick={() => openMemberPhoto(miembro)}
                                            onKeyDown={(event) => {
                                                if (miembro.photo && (event.key === 'Enter' || event.key === ' ')) {
                                                    event.preventDefault();
                                                    openMemberPhoto(miembro);
                                                }
                                            }}
                                            role={miembro.photo ? 'button' : undefined}
                                            tabIndex={miembro.photo ? 0 : undefined}
                                            aria-label={miembro.photo ? `Ver foto de ${miembro.name}` : undefined}
                                        >
                                            {miembro.photo ? (
                                                <Image
                                                    src={miembro.photo}
                                                    alt={`Foto de ${miembro.grade} ${miembro.name}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <BiFemale className="text-[600px] text-white opacity-80" />
                                                </div>
                                            )}
                                            {/* Efecto de overlay al hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                                                    <p className="font-medium text-3xl">{miembro.cargo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Información */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-1 line-clamp-2">
                                                <span className="text-sm text-gray-600 dark:text-slate-300 font-medium">{miembro.grade}</span> {miembro.name}
                                            </h3>
                                            {/* <p className="text-sm text-gray-600 dark:text-slate-300 font-medium">{miembro.grade}</p> */}
                                            <p className="text-sm text-blue-600 font-medium mt-1">{miembro.cargo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <ImageModal
                isOpen={Boolean(selectedMember?.photo)}
                onClose={closeMemberPhoto}
                imageSrc={selectedMember?.photo || ''}
                imageAlt={selectedMember ? `Foto de ${selectedMember.grade} ${selectedMember.name}` : ''}
                imageTitle={selectedMember ? `${selectedMember.grade} ${selectedMember.name} - ${selectedMember.cargo}` : undefined}
            />

        </PageContainer>
    );
}

export default Consejo;
