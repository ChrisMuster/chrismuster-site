"use client";

import React, { useState } from 'react';

import Section from "@/components/section/section";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import RPSLSGame from '@/components/RPSLSGame/RPSLSGame';
import Modal from '@/components/modal/modal';

export default function Homepage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>      
      <Section id="about" fullWidth spacing="none">
        <h2 className="text-4xl my-small">About</h2>
        <div className="w-full bg-white h-full text-gray-700">Test div</div>
      </Section>

      <Section id="code-challenges" spacing="none">
        <h2 className="text-4xl my-small">Code Challenges</h2>
        <div className="w-full bg-white h-full text-gray-700">
          <Accordion>
            <AccordionTab title="Rock, Paper, Scissors, Lizard, Spock">
              <RPSLSGame />
            </AccordionTab>
          </Accordion>
        </div>
      </Section>

      <Section id="projects" spacing="none">
        <h2 className="text-4xl my-small">Projects</h2>
        <div className="w-full bg-white h-full text-gray-700">
          <button onClick={handleOpenModal} className="px-4 py-2 bg-blue text-white rounded">
            Open Modal
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="w-full max-w-[500px] p-4">
              <h2 className="text-lg text-black font-bold">Modal Title</h2>
              <p className="text-black">This is the content of the modal.</p>
            </div>
          </Modal>
        </div>
      </Section>

      <Section id="websites" spacing="none">
        <h2 className="text-4xl my-small">Websites</h2>
        <div className="w-full bg-white h-full text-gray-700">Test div</div>
      </Section>

      <Section id="contact" spacing="small">
        <h2 className="text-4xl my-small">Contact</h2>
        <div className="w-full bg-white h-full text-gray-700">Test div</div>
      </Section>
    </>
  );
}
