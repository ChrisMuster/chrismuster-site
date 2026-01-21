// Modal.tsx
"use client";

import React, { useEffect } from 'react';
import { ModalProps } from '@/components/modal/modal.types';
import Button from '@/components/ui/button';

import { cleanClassNames } from "@/utils/utils";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Disable background scrolling when modal is open  
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Cleanup on unmount  
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="overlay-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={cleanClassNames("modal-content bg-white rounded-lg p-4 shadow-lg relative", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute top-1 right-3 text-4xl text-gray-500 hover:text-gray-700 z-50"
          aria-label="Close modal"
        >
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;  
