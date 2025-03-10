import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailFormValues } from "@/components/email/email-form.types";

import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const { name, email, subject, message }: EmailFormValues = await req.json();

    if (!name || !email || !subject || !message) {
      console.error("Validation Error: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP configuration");
      return NextResponse.json({ error: "SMTP configuration error" }, { status: 500 });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Use `false` for STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log("SMTP Connection Verified");
    } catch (error) {
      console.error("SMTP Connection Failed:", error);
      return NextResponse.json({ error: "SMTP connection failed" }, { status: 500 });
    }

    // Email content (use your verified email as the "From" address)
    const mailOptions = {
      from: `"${name}" <chris@chrismuster.co.uk>`,
      replyTo: email,
      to: process.env.SMTP_USER,
      subject: subject,
      text: `From: ${name} (${email})\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully:", info.response);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Nodemailer Send Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unexpected Server Error:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
