"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { EmailFormValues } from "@/components/email/email-form.types";

const EmailForm = () => {
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);

  // Initial values
  const initialValues: EmailFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  });

  return (
    <div className="max-w-lg mx-auto p-xsmall bg-white rounded-lg">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Subject Field */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full pl-10 p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 border rounded-md focus:outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-blue)] text-white flex items-center justify-center gap-2 py-3 rounded-md hover:bg-blue-900 transition focus-visible:outline-none"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {/* Success / Error Message */}
            {formStatus === "success" && (
              <p className="text-green-600 mt-xxsmall">Email sent successfully!</p>
            )}
            {formStatus === "error" && (
              <p className="text-red-600 mt-xxsmall">Error sending email. Please try again.</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailForm;
