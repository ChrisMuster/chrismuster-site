"use client";

import React, { useState } from 'react';

import RPSLSGame from '@/components/RPSLSGame/RPSLSGame';
import Modal from '@/components/modal/modal';

export default function Homepage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  
  return (
    <>      
      <section id="about" className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-4">About</h2>
      </section>

      <section id="code-challenges" className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-4">Code Challenges</h2>
        <RPSLSGame />
      </section>

      <section id="projects" className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-4">Projects</h2>
        <button onClick={handleOpenModal} className="px-4 py-2 bg-blue text-white rounded">
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="w-full max-w-[500px] p-4">
            <h2 className="text-lg text-black font-bold">Modal Title</h2>
            <p className="text-black">This is the content of the modal.</p>
          </div>
        </Modal>
      </section>

      <section id="websites" className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-4">Websites</h2>
      </section>

      <section id="contact" className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl mb-4">Contact</h2>
      </section>
    </>
  );
}
