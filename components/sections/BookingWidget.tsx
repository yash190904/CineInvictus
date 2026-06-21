"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { bookingConfig, formatDate } from "@/data/booking";

type DaySlots = { date: string; slots: { time: string; available: boolean }[] };
type Status = "idle" | "submitting" | "success" | "error";

const WEEKDAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDayLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

type MonthCell = { date: string; day: number } | null;

function getMonthGrid(viewYear: number, viewMonth: number): MonthCell[] {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const cells: MonthCell[] = Array.from({ length: leadingBlanks }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: formatDate(new Date(viewYear, viewMonth, day)), day });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function BookingWidget() {
  const today = useMemo(() => new Date(), []);
  const [days, setDays] = useState<DaySlots[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { days: DaySlots[] }) => {
        setDays(data.days);
        setSelectedDate(data.days[0]?.date ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const daysByDate = useMemo(() => new Map(days.map((d) => [d.date, d])), [days]);
  const activeDay = useMemo(
    () => days.find((d) => d.date === selectedDate),
    [days, selectedDate]
  );

  const monthGrid = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const minBookableDate = formatDate(today);
  const maxBookableDate = days[days.length - 1]?.date;
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goToMonth(offset: number) {
    const next = new Date(viewYear, viewMonth + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  const canGoPrev =
    new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext = !maxBookableDate || formatDate(new Date(viewYear, viewMonth + 1, 1)) <= maxBookableDate;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      date: selectedDate,
      time: selectedTime,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setDays((prev) =>
            prev.map((d) =>
              d.date !== selectedDate
                ? d
                : {
                    ...d,
                    slots: d.slots.map((s) =>
                      s.time === selectedTime ? { ...s, available: false } : s
                    ),
                  }
            )
          );
          setSelectedTime(null);
        }
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="font-display text-2xl text-[var(--color-ink)]">Call booked</p>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          {selectedDate && selectedTime
            ? `See you ${formatDayLabel(selectedDate).weekday}, ${
                formatDayLabel(selectedDate).month
              } ${formatDayLabel(selectedDate).day} at ${selectedTime} ${bookingConfig.timezoneLabel}.`
            : "You're all set."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-6 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
          <Calendar size={18} />
        </span>
        <div>
          <p className="font-display text-lg text-[var(--color-ink)]">Book a Call</p>
          <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
            {bookingConfig.meetingLength} · {bookingConfig.timezoneLabel}
          </p>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <p className="py-10 text-center text-sm text-[var(--color-ink-muted)]">
            Loading availability…
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => goToMonth(-1)}
                disabled={!canGoPrev}
                aria-label="Previous month"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="font-display text-base text-[var(--color-ink)]">{monthLabel}</p>
              <button
                type="button"
                onClick={() => goToMonth(1)}
                disabled={!canGoNext}
                aria-label="Next month"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center">
              {WEEKDAY_HEADERS.map((wd) => (
                <span
                  key={wd}
                  className="font-mono text-[10px] uppercase text-[var(--color-ink-faint)]"
                >
                  {wd}
                </span>
              ))}

              {monthGrid.map((cell, i) => {
                if (!cell) return <span key={i} />;

                const dayData = daysByDate.get(cell.date);
                const isBookable =
                  !!dayData &&
                  cell.date >= minBookableDate &&
                  dayData.slots.some((s) => s.available);
                const isSelected = cell.date === selectedDate;

                return (
                  <button
                    key={cell.date}
                    type="button"
                    disabled={!isBookable}
                    onClick={() => {
                      setSelectedDate(cell.date);
                      setSelectedTime(null);
                    }}
                    className={`aspect-square rounded-lg font-mono text-sm transition-colors ${
                      isSelected
                        ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                        : isBookable
                          ? "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                          : "cursor-not-allowed text-[var(--color-ink-faint)] opacity-40"
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {activeDay?.slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 font-mono text-xs transition-colors ${
                    !slot.available
                      ? "cursor-not-allowed border-[var(--color-border)] text-[var(--color-ink-faint)] opacity-40 line-through"
                      : slot.time === selectedTime
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-ink)]"
                  }`}
                >
                  <Clock size={11} />
                  {slot.time}
                </button>
              ))}
            </div>

            <motion.div
              initial={false}
              animate={{ height: selectedTime ? "auto" : 0, opacity: selectedTime ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]"
                  >
                    Anything to add? (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-[var(--color-accent)]">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-mono text-sm uppercase tracking-wide text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-dim)] disabled:opacity-60"
                >
                  {status === "submitting" ? "Booking…" : "Confirm Booking"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
