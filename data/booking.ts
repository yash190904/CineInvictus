// Configure the booking widget's available hours here. Times are
// treated as plain wall-clock times in the owner's timezone — no
// timezone conversion is done, so keep timezoneLabel accurate for
// whoever is booking.
export const bookingConfig = {
  timezoneLabel: "IST (UTC+5:30)",
  meetingLength: "30 min intro call",
  // 0 = Sunday … 6 = Saturday
  workingDays: [1, 2, 3, 4, 5],
  startHour: 10,
  endHour: 18,
  slotMinutes: 30,
  daysAhead: 30,
};

export type TimeSlot = { time: string; available: boolean };
export type DaySlots = { date: string; slots: TimeSlot[] };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function generateSlotTimes(): string[] {
  const times: string[] = [];
  const { startHour, endHour, slotMinutes } = bookingConfig;
  for (let mins = startHour * 60; mins < endHour * 60; mins += slotMinutes) {
    times.push(`${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`);
  }
  return times;
}

export function generateUpcomingDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; dates.length < bookingConfig.daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (bookingConfig.workingDays.includes(d.getDay())) {
      dates.push(formatDate(d));
    }
  }
  return dates;
}
