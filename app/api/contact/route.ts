import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation } from "@/lib/email";

// Receives the contact form submission, logs it, and emails the owner
// and the sender (see lib/email.ts).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, reason, message } = body as {
      name?: string;
      email?: string;
      reason?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    console.log("New contact form submission:", { name, email, reason, message });

    await sendNotification(
      `New inquiry${reason ? `: ${reason}` : ""}`,
      `From: ${name} (${email})\n\n${message}`
    );

    await sendConfirmation(
      email,
      "Got your message — Cine Invictus",
      `Hi ${name},\n\nThanks for reaching out — I've received your message and will get back to you within a day or two.\n\nFor reference, here's what you sent:\n"${message}"\n\n— Cine Invictus`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
