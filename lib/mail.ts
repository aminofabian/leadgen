import { Resend } from "resend";
import { createEmailTemplate } from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

// Add a check for the API key
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set in environment variables');
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    console.log('Attempting to send password reset email to:', email);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    const resetLink = `https://app.igleadgen.com/auth/new-password?token=${token}`;
    const emailHtml = createEmailTemplate(
      "Reset Your Password",
      "You requested to reset your password. Click the button below to set a new password:",
      "RESET PASSWORD",
      resetLink
    );

    const data = await resend.emails.send({
      from: "IgLeadGen <support@igleadgen.com>",
      to: email,
      subject: "Reset Your Password",
      html: emailHtml,
    });
    
    console.log('Password reset email sent successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Failed to send password reset email. Details:', {
      error: error.message,
      code: error.statusCode,
      name: error.name,
      email,
      environment: process.env.NODE_ENV
    });
    throw error;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    console.log('Attempting to send verification email to:', email);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    const confirmLink = `https://app.igleadgen.com/auth/new-verification?token=${token}`;
    const emailHtml = createEmailTemplate(
      "Verify Your Email",
      "Thank you for signing up with IgLeadGen. Please click the button below to verify your email address:",
      "VERIFY EMAIL",
      confirmLink
    );

    const data = await resend.emails.send({
      from: "IgLeadGen <support@igleadgen.com>",
      to: email,
      subject: "Verify Your Email",
      html: emailHtml,
    });
    
    console.log('Email sent successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Failed to send verification email. Details:', {
      error: error.message,
      code: error.statusCode,
      name: error.name,
      email,
      environment: process.env.NODE_ENV
    });
    throw error;
  }
};