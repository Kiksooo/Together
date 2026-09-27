"use server";

import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PreorderResult = { ok: true } | { ok: false; error: string };

const sendError = "The request could not be sent. Please try again.";

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function submitPreorderInterest(input: {
  name: string;
  email: string;
  country: string;
}): Promise<PreorderResult> {
  const name = singleLine(input.name);
  const email = singleLine(input.email);
  const country = singleLine(input.country);

  if (!name || !email || !country) {
    return { ok: false, error: "Name, email and country are required." };
  }

  if (!emailPattern.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INTEREST_TO_EMAIL?.trim();
  const from = process.env.INTEREST_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return { ok: false, error: sendError };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: "New HUG Pre-Order Interest",
    text: `New HUG Pre-Order Interest\n\nName: ${name}\nEmail: ${email}\nCountry: ${country}\n`,
  });

  if (error || !data?.id) {
    return { ok: false, error: sendError };
  }

  return { ok: true };
}
