// Modal.tsx
"use client";

import React, { useEffect } from 'react';
import { ModalProps } from '@/components/modal/modal.types';

import { cleanClassNames } from "@/utils/utils";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    // Disable background scrolling when modal is open  
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount  
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="overlay-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className={cleanClassNames("modal-content bg-white rounded-lg p-xxsmall shadow-lg relative", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-1 right-3 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;  
