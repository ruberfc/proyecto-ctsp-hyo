'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

type GalleryImage = {
    src: string;
    title: string;
};

type GalleryImageModalProps = {
    images: GalleryImage[];
    activeIndex: number | null;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
};

export default function GalleryImageModal({
    images,
    activeIndex,
    onClose,
    onPrevious,
    onNext,
}: GalleryImageModalProps) {
    const isOpen = activeIndex !== null;
    const activeImage = isOpen ? images[activeIndex] : null;

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft') onPrevious();
            if (event.key === 'ArrowRight') onNext();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose, onNext, onPrevious]);

    if (!activeImage || activeIndex === null) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
            onClick={onClose}
            role="presentation"
        >
            <section
                className="mx-auto flex h-full w-full max-w-7xl flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="gallery-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex min-h-14 items-center justify-between gap-4 border-b border-white/15 pb-3 text-white">
                    <div className="min-w-0">
                        <h2 id="gallery-modal-title" className="truncate text-base font-semibold sm:text-lg">
                            {activeImage.title}
                        </h2>
                        <p className="mt-0.5 text-xs font-medium text-slate-300" aria-live="polite">
                            {activeIndex + 1} / {images.length}
                        </p>
                    </div>
                    <button
                        className="grid size-10 shrink-0 place-items-center rounded-md border border-white/20 text-white transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar galería"
                        title="Cerrar"
                    >
                        <FiX size={22} aria-hidden="true" />
                    </button>
                </header>

                <div className="relative my-3 min-h-0 flex-1">
                    <Image
                        src={activeImage.src}
                        alt={activeImage.title}
                        fill
                        sizes="100vw"
                        unoptimized
                        className="object-contain"
                        priority
                    />

                    <button
                        className="absolute left-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-slate-950/70 text-white shadow-lg transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:left-3 sm:size-12"
                        type="button"
                        onClick={onPrevious}
                        aria-label="Ver imagen anterior"
                        title="Imagen anterior"
                    >
                        <FiChevronLeft size={26} aria-hidden="true" />
                    </button>
                    <button
                        className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-slate-950/70 text-white shadow-lg transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:right-3 sm:size-12"
                        type="button"
                        onClick={onNext}
                        aria-label="Ver imagen siguiente"
                        title="Imagen siguiente"
                    >
                        <FiChevronRight size={26} aria-hidden="true" />
                    </button>
                </div>
            </section>
        </div>
    );
}