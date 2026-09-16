import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

type ModalHeaderProps = {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
    return (
        <div className="flex justify-between items-center border-b p-2 border-gray-400 dark:border-[#33456a]">
            <div className="flex items-center gap-3">
                <h6 className="font-bold text-xl text-gray-800 dark:text-[#e8edf5]">
                    {title}
                </h6>
            </div>

            <button
                className="focus:outline-none text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110"
                onClick={onClose}
            >
                <IoIosCloseCircle className="w-8 h-8"/>
            </button>
        </div>
    );
};

export default ModalHeader; 