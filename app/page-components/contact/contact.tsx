"use client";

import { useState } from "react";

import Section from "@/components/section/section";
import TabsSection from "@/components/tabs/tabsSection";
import PdfViewer from "@/components/pdf-viewer/pdfViewer";
import EmailForm from "@/components/email/email-form";

import content from "@/app/data/content.json";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("tab1");

  const { contact } = content;

  // Tab 1
  const tab1_title = contact.tabs_content.tab_1.title;
  const pdfFile_url = contact.tabs_content.tab_1.pdf_file_url;
  const pdfLinkText = contact.tabs_content.tab_1.pdf_link_text;

  // Tab 2
  const tab2_title = contact.tabs_content.tab_2.title;
  const tab2_text = contact.tabs_content.tab_2.text;

  // Tab 3
  const tab3_text = contact.tabs_content.tab_3.text;

  return (
    <Section id="contact">
      <h2 className="text-4xl my-8 text-center">{contact.title}</h2>
      <div className="tabwrapper p-0">
        <TabsSection tabs={contact.tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === "tab1" && (
            <div className="py-8">
              {tab1_title && (
                <h1 className="text-3xl text-center mb-12">{tab1_title}</h1>
              )}
              <PdfViewer fileUrl={pdfFile_url} linkText={pdfLinkText} />
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="flex flex-col max-w-5xl p-6 mx-auto my-6 items-center">
              <h1 className="text-3xl mx-auto mb-4">{tab2_title}</h1>
              <p className="mb-4">
                {tab2_text}
              </p>
              <EmailForm />
            </div>
          )}
          {activeTab === "tab3" && (
            <div className="p-8"><p>{tab3_text}</p></div>
          )}
        </TabsSection>
      </div>
    </Section>
  )
}
