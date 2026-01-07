"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { EmailFormValues } from "@/components/email/email-form.types";
import content from "@/app/data/content.json";

const EmailForm = () => {
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);

  const { email_form } = content;
  const { 
    name_text, 
    name_placeholder, 
    name_required,
    email_text, 
    email_placeholder, 
    email_invalid,
    email_required,
    subject_text, 
    subject_placeholder, 
    subject_required,
    message_text, 
    message_placeholder, 
    message_required,
    message_min_chars,
    button_text, 
    sending_text, 
    success_text, 
    fail_text 
  } = email_form;

  // Initial values
  const initialValues: EmailFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required(name_required),
    email: Yup.string().email(email_invalid).required(email_required),
    subject: Yup.string().required(subject_required),
    message: Yup.string().required(message_required).min(10, message_min_chars),
  });

  return (
    <div className="max-w-lg mx-auto p-xsmall bg-white text-[var(--color-primary)] rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              setFormStatus("success");
              resetForm();
            } else {
              throw new Error("Failed to send email");
            }
          } catch (error) {
            console.error("Error sending email:", error);
            setFormStatus("error");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="sm:min-w-[320px] flex flex-col gap-4">
            {/* Name Field */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-primary)]">
                {name_text} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder={name_placeholder}
                  aria-required="true"
                  aria-invalid={!!validationSchema.fields.name}
                  aria-describedby="name-error"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="name" component="div" id="name-error" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-primary)]">
                {email_text} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder={email_placeholder}
                  aria-required="true"
                  aria-invalid={!!validationSchema.fields.email}
                  aria-describedby="email-error"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="email" component="div" id="email-error" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Subject Field */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-primary)]">
                {subject_text} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                <Field
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder={subject_placeholder}
                  aria-required="true"
                  aria-invalid={!!validationSchema.fields.subject}
                  aria-describedby="subject-error"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="subject" component="div" id="subject-error" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-primary)]">
                {message_text} <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                placeholder={message_placeholder}
                rows={4}
                aria-required="true"
                aria-invalid={!!validationSchema.fields.message}
                aria-describedby="message-error"
                className="w-full p-3 text-[var(--color-primary)] border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="message" component="div" id="message-error" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-blue)] text-white flex items-center justify-center gap-2 py-3 rounded-md hover:bg-blue-900 transition focus-visible:outline-none"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? sending_text : button_text}
            </button>

            {/* Success / Error Message */}
            {formStatus === "success" && (
              <p className="text-green-600 mt-xxsmall">{success_text}</p>
            )}
            {formStatus === "error" && (
              <p className="text-red-600 mt-xxsmall">{fail_text}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailForm;
