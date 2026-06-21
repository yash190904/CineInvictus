import { Resend } from "resend";

// Sends a plain-text notification to the site owner when someone books
// a call or submits the contact form. Requires RESEND_API_KEY — without
// it, this just logs a warning and skips sending (so local dev/tests
// don't need an API key set up).
//
// Free tier note: without verifying your own domain on resend.com, you
// can only send FROM "onboarding@resend.dev" TO the email address you
// signed up to Resend with. That's enough for owner notifications; if
// you want to email the client back too, verify a domain first.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const notifyEmail = process.env.NOTIFY_EMAIL || "hello.yash8888@gmail.com";
const fromAddress = process.env.RESEND_FROM || "Cine Invictus <onboarding@resend.dev>";

export async function sendNotification(subject: string, text: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping email notification.");
    return;
  }
  try {
    await resend.emails.send({ from: fromAddress, to: notifyEmail, subject, text });
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
  }
}

// Emails an arbitrary recipient (e.g. the client who just booked) —
// this requires a verified domain on resend.com, since the sandbox
// "onboarding@resend.dev" sender can only reach your own account
// email. Fails silently (logged, not thrown) so a confirmation-email
// hiccup never blocks the booking/contact flow itself.
export async function sendConfirmation(to: string, subject: string, text: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email.");
    return;
  }
  try {
    await resend.emails.send({ from: fromAddress, to, subject, text });
  } catch (err) {
    console.error("[email] Failed to send confirmation:", err);
  }
}
