"use client";

import { useState } from "react";
import Link from "next/link"

import Section from "@/components/section/section";
import Hero from "@/components/hero/hero";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import RPSLSGame from "@/components/RPSLSGame/RPSLSGame";
import Modal from "@/components/modal/modal";
import Card from "@/components/card/card";
import Grid from "@/components/grid/grid";
import TabsSection from "@/components/tabs/tabsSection";
import PdfViewer from "@/components/pdf-viewer/pdfViewer";
import Divider from "@/components/ui/divider";
import GalleryCarousel from "@/components/gallery-carousel/gallery-carousel";

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function Homepage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("tab1");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleModalLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); // Stop the link navigation
      handleOpenModal(); // Execute the provided function
  }

  const { about, code_challenges, projects, websites, contact } = content;

  return (
    <>      
      <Section id="about" fullWidth>
        <Hero image={about.hero.image} imageAlt={about.hero.imageAlt} overlayAlignment="left" textAlignment="left">
          <h1 className="text-4xl font-bold">{about.hero.title}</h1>
          <h2 className="text-2xl font-bold">{about.hero.subtitle}</h2>
        </Hero>
        <div className="p-small md:px-medium lg:px-xlarge xl:px-xxlarge">
          <h3 className="text-2xl font-bold mb-xxsmall">{about.title}</h3>
          <p className="text-lg mb-xxsmall">{about.text_1}</p>
          <p className="text-lg">{about.text_2}</p>
          <button
            onClick={() => {
              scrollToSection("contact");
            }}
            className="w-fit mt-xsmall bg-[var(--color-blue)] hover:bg-blue-900 text-white px-xxsmall py-2 rounded-md">
            {about.button_text}
          </button>
        </div>
      </Section>

      <Divider height="h-2" />

      <Section id="code-challenges" bgColor="bg-[gray]">
        <h2 className="text-4xl my-small text-center">{code_challenges.title}</h2>
        <div className="w-full bg-white h-auto">
          <Accordion>
            <AccordionTab title="Rock, Paper, Scissors, Lizard, Spock">
              <RPSLSGame />
            </AccordionTab>
          </Accordion>
        </div>
      </Section>

      <Divider height="h-2" />

      <Section id="projects">
        <h2 className="text-4xl my-small text-center">{projects.title}</h2>
        <div className="w-full bg-white h-full">
          <div className="p-small max-w-5xl mx-auto">
            <h1 className="text-3xl mb-xsmall text-center">{projects.gallery.title}</h1>
            <GalleryCarousel images={projects.gallery.images} />
          </div>

          <Divider width="w-xs" height="h-1" />

          <div className="p-small max-w-5xl mx-auto flex flex-col justify-center">
            <h1 className="text-3xl mb-xsmall text-center">{projects.modals.title}</h1>

            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex flex-col">
                <p className="mb-xxsmall">{projects.modals.button_label}</p>
                <button onClick={handleOpenModal} className="w-fit mb-small px-xxsmall py-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded">
                  {projects.modals.button_text}
                </button>
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
              <div className="w-full max-w-[500px] p-xxsmall">
                <h2 className="text-lg font-bold">{projects.modals.modal_title}</h2>
                <p>{projects.modals.modal_text_1}</p>
                <p>{projects.modals.modal_text_2}</p>
                <p>{projects.modals.modal_text_3}</p>
              </div>
            </Modal>
          </div>
        </div>
      </Section>

      <Divider height="h-2" />

      <Section id="websites">
        <h2 className="text-4xl my-small text-center">{websites.title}</h2>
        <div className="w-full bg-white h-full">
          <Grid gap="medium" sm={1} md={2} xl={3}>
            <Card
              imageSrc={websites.card_1.image}
              imageAlt={websites.card_1.imageAlt}
              title={websites.card_1.title}
              subtitle={websites.card_1.subtitle}
              text={websites.card_1.text}
              buttonText={websites.card_1.button_text}
              buttonLink={websites.card_1.button_link}
              shadow="light"
            />
            <Card
              imageSrc={websites.card_2.image}
              imageAlt={websites.card_2.imageAlt}
              title={websites.card_2.title}
              subtitle={websites.card_2.subtitle}
              text={websites.card_2.text}
              buttonText={websites.card_2.button_text}
              buttonLink={websites.card_2.button_link}
              shadow="light"
            />
            <Card
              imageSrc={websites.card_3.image}
              imageAlt={websites.card_3.imageAlt}
              title={websites.card_3.title}
              subtitle={websites.card_3.subtitle}
              text={websites.card_3.text}
              buttonText={websites.card_3.button_text}
              buttonLink={websites.card_3.button_link}
              shadow="light"
            />
          </Grid>
        </div>
      </Section>

      <Divider height="h-2" />

      <Section id="contact">
        <h2 className="text-4xl my-small text-center">{contact.title}</h2>
        <div className="p-medium">
          <TabsSection tabs={contact.tabs} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === "tab1" && <p>Content for Tab One</p>}
            {activeTab === "tab2" && (
              <div className="p-medium">
                <h1 className="text-3xl text-center font-bold mb-medium">{contact.tabs_content.tab_2.title}</h1>
                <PdfViewer fileUrl={contact.tabs_content.tab_2.pdf_file_url} />
              </div>
            )}
            {activeTab === "tab3" && <p>Content for Tab Three</p>}
          </TabsSection>
        </div>
      </Section>
    </>
  );
}
