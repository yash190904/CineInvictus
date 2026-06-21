import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/email";

// Receives the contact form submission, logs it, and emails the owner
// (see lib/email.ts).
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
