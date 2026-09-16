"use client";

import React from 'react';
import { FaCircleArrowLeft } from "react-icons/fa6";
//import { useRouter } from 'next/navigation';

interface Props {
    title: string;
    hide: () => void;
}

const TitleDetalleCard: React.FC<Props> = ({ title, hide }) => {
    //const router = useRouter();

    return (
        <div className="flex items-center gap-2 mb-4">
            <button 
                onClick={() => hide()}
                className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors duration-200"

                aria-label="Volver a la página anterior"
            >
                <FaCircleArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-400">{title}</h1>
        </div>
    );
};

export default TitleDetalleCard; 