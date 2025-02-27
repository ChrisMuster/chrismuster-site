"use client";

import { useState } from "react";

import Section from "@/components/section/section";
import TabsSection from "@/components/tabs/tabsSection";
import PdfViewer from "@/components/pdf-viewer/pdfViewer";

import content from "@/app/data/content.json";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("tab1");

  const { contact } = content;

  // Tab 1
  const tab1_title = contact.tabs_content.tab_1.title;
  const pdfFile_url = contact.tabs_content.tab_1.pdf_file_url;

  // Tab 2
  const tab2_text = contact.tabs_content.tab_2.text;

  // Tab 3
  const tab3_text = contact.tabs_content.tab_3.text;

  return (
    <Section id="contact">
      <h2 className="text-4xl my-small text-center">{contact.title}</h2>
      <div className="tabwrapper p-none">
        <TabsSection tabs={contact.tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === "tab1" && (
            <div className="py-small">
              {tab1_title && (
                <h1 className="text-3xl text-center font-bold mb-medium">{tab1_title}</h1>
              )}
              <PdfViewer fileUrl={pdfFile_url} />
            </div>
          )}
          {activeTab === "tab2" && <div className="p-small"><p>{tab2_text}</p></div>}
          {activeTab === "tab3" && <div className="p-small"><p>{tab3_text}</p></div>}
        </TabsSection>
      </div>
    </Section>
  )
}
