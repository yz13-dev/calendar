import { getWeek } from "@/utils/week";
import { Calendar } from "@yz13/ui/calendar";
import { isWithinInterval } from "date-fns";
import { ru } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useEffect } from "react";

export default function () {
  const [date, setDate] = useQueryState("date", parseAsIsoDate);
  const [view] = useQueryState("view");
  console.log(view)

  const selected = date ?? new Date();

  const isWeekView = view === "week";

  const week = getWeek(selected)

  useEffect(() => {
    if (!date) setDate(new Date())
  }, [date])

  if (isWeekView) {
    return (
      <Calendar
        selected={{
          from: week.start,
          to: week.end
        }}
        onSelect={date => {
          if (date) {
            const from = date.from;
            const to = date.to;
            if (from) {
              const isFromWithinRange = isWithinInterval(from, { start: week.start, end: week.end });
              if (!isFromWithinRange) setDate(from);
            }
            if (to) {
              const isFromWithinRange = isWithinInterval(to, { start: week.start, end: week.end });
              if (!isFromWithinRange) setDate(to);
            }
          }
        }}
        mode="range"
        className="w-full bg-transparent"
        locale={ru}
      />
    )
  }
  return (
    <Calendar
      selected={date ?? undefined}
      onSelect={date => {
        setDate(date ?? null)
      }}
      mode="single"
      className="w-full bg-transparent"
      locale={ru}
    />
  )
}
