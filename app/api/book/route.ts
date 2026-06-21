import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/bookings-db";

// Persists the booking so the slot can't be taken twice (see
// lib/bookings-db.ts). To actually notify yourself of new bookings,
// wire up an email provider here the same way as app/api/contact/route.ts.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, name, email, notes } = body as {
      date?: string;
      time?: string;
      name?: string;
      email?: string;
      notes?: string;
    };

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const result = await createBooking({ date, time, name, email, notes });

    if (!result.ok) {
      return NextResponse.json(
        { error: "That slot was just booked by someone else. Please pick another." },
        { status: 409 }
      );
    }

    console.log("New booking:", { date, time, name, email, notes });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
