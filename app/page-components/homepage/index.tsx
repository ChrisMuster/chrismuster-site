"use client";

import About from '@/page-components/about/about';
import CodeChallenges from '@/page-components/code-challenges/code-challenges';
import Projects from '@/page-components/projects/projects';
import Websites from '@/page-components/websites/websites';
import Contact from '@/page-components/contact/contact';

import Divider from "@/components/ui/divider";

export default function Homepage() {
  const dividerColor = "bg-[var(--divider)]";
  
  return (
    <>      
      <About />

      <Divider height="h-1" color={dividerColor} />

      <CodeChallenges />

      <Divider height="h-1" color={dividerColor} />

      <Projects />

      <Divider height="h-1" color={dividerColor} />

      <Websites />

      <Divider height="h-1" color={dividerColor} />

      <Contact />
    </>
  );
}
