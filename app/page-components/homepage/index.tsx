"use client";

import React, { useState } from 'react';

import Section from "@/components/section/section";
import Hero from "@/components/hero/hero";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import RPSLSGame from '@/components/RPSLSGame/RPSLSGame';
import Modal from '@/components/modal/modal';
import Card from '@/components/card/card';
import Grid from '@/components/grid/grid';

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function Homepage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { about, code_challenges, projects, websites, contact } = content;

  return (
    <>      
      <Section id="about" fullWidth spacing="none">
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
            className="w-fit mt-xsmall bg-[var(--color-blue)] hover:bg-blue-900 text-white px-4 py-2 rounded-md">
            {about.button_text}
          </button>
        </div>
      </Section>

      <Section id="code-challenges" spacing="none" bgColor="bg-[gray]">
        <h2 className="text-4xl my-small text-center">{code_challenges.title}</h2>
        <div className="w-full bg-white h-auto">
          <Accordion>
            <AccordionTab title="Rock, Paper, Scissors, Lizard, Spock">
              <RPSLSGame />
            </AccordionTab>
          </Accordion>
        </div>
      </Section>

      <Section id="projects" spacing="none">
        <h2 className="text-4xl my-small text-center">{projects.title}</h2>
        <div className="w-full bg-white h-full">
          <button onClick={handleOpenModal} className="px-4 py-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded">
            Open Modal
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="w-full max-w-[500px] p-4">
              <h2 className="text-lg font-bold">Modal Title</h2>
              <p>This is the content of the modal.</p>
            </div>
          </Modal>
        </div>
      </Section>

      <Section id="websites" spacing="none">
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

      <Section id="contact" spacing="small">
        <h2 className="text-4xl my-small text-center">{contact.title}</h2>
        <div className="w-full bg-white h-full">Test div</div>
      </Section>
    </>
  );
}
