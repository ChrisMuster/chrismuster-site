"use client";

import About from '@/page-components/about/about';
import CodeChallenges from '@/page-components/code-challenges/code-challenges';
import Projects from '@/page-components/projects/projects';
import Websites from '@/page-components/websites/websites';
import Contact from '@/page-components/contact/contact';

import Divider from "@/components/ui/divider";

export default function Homepage() {

  return (
    <>      
      <About />

      <Divider height="h-1" />

      <CodeChallenges />

      <Divider height="h-1" />

      <Projects />

      <Divider height="h-1" />

      <Websites />

      <Divider height="h-1" />

      <Contact />
    </>
  );
}
