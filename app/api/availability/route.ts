import { NextResponse } from "next/server";
import { generateSlotTimes, generateUpcomingDates } from "@/data/booking";
import { getBookedTimesForDates } from "@/lib/bookings-db";

export async function GET() {
  const dates = generateUpcomingDates();
  const times = generateSlotTimes();
  const booked = await getBookedTimesForDates(dates);

  const days = dates.map((date) => ({
    date,
    slots: times.map((time) => ({
      time,
      available: !booked.get(date)?.has(time),
    })),
  }));

  return NextResponse.json({ days });
}
