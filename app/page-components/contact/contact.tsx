"use client";

import { useState } from "react";

import Section from "@/components/section/section";
import TabsSection from "@/components/tabs/tabsSection";
import PdfViewer from "@/components/pdf-viewer/pdfViewer";

import content from "@/app/data/content.json";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("tab1");

  const { contact } = content;

  return (
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
  )
}