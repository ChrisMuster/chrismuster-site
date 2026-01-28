import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailFormValues } from "@/components/email/email-form.types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const isDev = process.env.NODE_ENV === 'development';
  
  try {
    const { name, email, subject, message }: EmailFormValues = await req.json();

    if (isDev) {
      console.log("📧 Email form submission received:", { name, email, subject });
    }

    if (!name || !email || !subject || !message) {
      console.error("❌ Validation Error: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanitize inputs to prevent CRLF injection
    const sanitizeInput = (input: string): string => input.replace(/[\r\n]/g, "");
    
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      console.error("❌ Validation Error: Invalid email format");
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Ensure environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ Missing SMTP configuration");
      return NextResponse.json({ error: "SMTP configuration error" }, { status: 500 });
    }

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (isDev) {
      console.log("🔧 SMTP Config:", {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        passLength: process.env.SMTP_PASS?.length
      });
    }
     
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Development: Disable cert validation for self-signed/local SMTP servers
        // Production: Always validate certificates for security
        // This is safe in dev as we're only testing email functionality locally
        rejectUnauthorized: process.env.NODE_ENV === 'production',
        minVersion: "TLSv1.2",
      }
    });

    // Verify SMTP connection
    try {
      if (isDev) {
        console.log("🔄 Verifying SMTP connection...");
      }
      await transporter.verify();
      if (isDev) {
        console.log("✅ SMTP Connection Verified");
      }
    } catch (error) {
      console.error("❌ SMTP Connection Failed:", error);
      return NextResponse.json({ 
        error: "SMTP connection failed", 
        details: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }

    // Email content
    const mailOptions = {
      from: {
        name: sanitizedName,
        address: fromAddress,
      },
      replyTo: sanitizedEmail,
      to: process.env.SMTP_USER,
      subject: sanitizedSubject,
      text: `From: ${sanitizedName} (${sanitizedEmail})\n\n${message}`,
    };

    if (isDev) {
      console.log("📤 Sending email...");
    }
    const info = await transporter.sendMail(mailOptions);
    if (isDev) {
      console.log("✅ Email Sent Successfully:", info.response);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Nodemailer Send Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("❌ Unexpected Server Error:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
