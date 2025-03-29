"use client";

import { useState } from "react";
import Link from "next/link"

import Section from "@/components/section/section";
import Modal from "@/components/modal/modal";
import Divider from "@/components/ui/divider";
import GalleryCarousel from "@/components/gallery-carousel/gallery-carousel";
import Button from "@/components/ui/button";

import content from "@/app/data/content.json";

export default function Projects() {
  const { projects } = content;

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleModalLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Stop the link navigation
    handleOpenModal(); // Execute the provided function
  }

  return (
    <Section id="projects">
      <h2 className="text-4xl my-small text-center">{projects.title}</h2>
      <div className="w-full bg-[var(--background)] h-full">
        <div className="p-small max-w-5xl mx-auto">
          <h1 className="text-3xl mb-xsmall text-center">{projects.gallery.title}</h1>
          <GalleryCarousel images={projects.gallery.images} />
        </div>

        <Divider width="w-2/3" height="h-1" />

        <div className="p-small max-w-5xl mx-auto flex flex-col justify-center">
          <h1 className="text-3xl mb-xsmall text-center">{projects.modals.title}</h1>

          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex flex-col">
              <p className="mb-xxsmall">{projects.modals.button_label}</p>

              <Button variant="primary" size="medium" className="w-fit mb-small" onClick={handleOpenModal}>
                {projects.modals.button_text}
              </ Button>
            </div>
            <div className="w-fit h-fit">
              <Link
                href="#"
                onClick={handleModalLinkClick}
                className="font-bold hover:text-[var(--color-blue)] cursor-pointer"
              >
                {projects.modals.link_text}
              </Link>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="w-full max-w-[500px] p-xxsmall text-[var(--color-primary)]">
              <h2 className="text-lg font-bold">{projects.modals.modal_title}</h2>
              <p>{projects.modals.modal_text_1}</p>
              <p>{projects.modals.modal_text_2}</p>
              <p>{projects.modals.modal_text_3}</p>
            </div>
          </Modal>
        </div>
      </div>
    </Section>
  )
}
