import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onHidden: () => void;
  onClose: () => void;
  ref?: React.RefObject<ReactModal>;
  children: React.ReactNode; 
}

// Modal.setAppElement('#root');

// Cambiar el elemento raíz para Next.js
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root-content');
}

const ModalCustom: React.FC<ModalProps> = ({ isOpen, onOpen,onHidden,onClose, children, ref }) => {
  return (
    <Modal
      ref={ref}
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onAfterClose={onHidden}
      shouldCloseOnOverlayClick ={false}
      onRequestClose={onClose}
      className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#15233c] rounded-md shadow-lg flex"
      overlayClassName="fixed z-[1000] top-0 left-0 w-full h-full bg-gray-900/75 flex items-center justify-center"
    >
      {children}
    </Modal>
  );
};

export default ModalCustom;