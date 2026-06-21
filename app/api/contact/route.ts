import { NextRequest, NextResponse } from "next/server";

// This route receives the contact form submission. Right now it just
// validates the input and logs it server-side so the form works
// out of the box during development.
//
// TO ACTUALLY SEND EMAILS IN PRODUCTION, wire up one of:
//   - Resend (resend.com): npm i resend, then call resend.emails.send(...)
//   - Nodemailer with an SMTP provider
//   - A forwarding service like Formspree
// Store the provider's API key as an environment variable
// (e.g. RESEND_API_KEY) in your hosting dashboard — never commit it
// to the repo. Then replace the comment block below with the real call.

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

    // ---- Replace this block with real email sending ----
    console.log("New contact form submission:", { name, email, reason, message });
    // Example with Resend once you add RESEND_API_KEY and `npm i resend`:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Cine Invictus <noreply@cineinvictus.com>",
    //   to: "hello.yash8888@gmail.com",
    //   subject: `New inquiry: ${reason}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });
    // -------------------------------------------------------

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
