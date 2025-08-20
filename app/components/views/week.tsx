import { getWeek } from "@/utils/week";
import { cn } from "@yz13/ui/utils";
import { eachDayOfInterval, format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";

const HOUR_HEIGHT = 0;

export default function () {

  const [date] = useQueryState("date", parseAsIsoDate)

  const selected = date ?? new Date()


  const week = getWeek(selected)

  const interval = eachDayOfInterval({ start: week.start, end: week.end });

  const hours = Array.from({ length: 24 }).map((_, i) => i)

  return (
    <div className="w-full divide-y border-b">
      <div className="flex items-center h-10 *:h-full sticky top-0 bg-background z-10">
        <div className="w-24 shrink-0 px-2 flex items-center justify-center">
          <span className="text-sm">+0 UTC</span>
        </div>
        <div className="w-full grid grid-cols-7 border-r *:px-2">
          {
            interval
              .map(date => {
                const weekday = format(date, "EEEE", { locale: ru })
                const day = format(date, "dd", { locale: ru })
                const isDateToday = isToday(date)
                return (
                  <div
                    key={date.toISOString()}
                    className="w-full flex items-center justify-center gap-1"
                  >
                    <span className="capitalize text-sm font-normal text-muted-foreground">
                      {weekday}
                    </span>
                    <span className={cn(isDateToday ? "text-destructive" : "")}>{day}</span>
                  </div>
                )
              })
          }
        </div>
      </div>
      <div className="flex items-center divide-x h-20 *:h-full">
        <div className="w-24 p-2 flex justify-end shrink-0">
          <span className="text-sm">Весь день</span>
        </div>
        <div className="w-full grid grid-cols-7 divide-x border-r *:h-full">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {
        hours
          .map(hour => {
            const hours = hour.toString().padStart(2, "0");
            return (
              <div key={hour} className="flex items-center divide-x h-20 *:h-full">
                <div className="w-24 flex justify-end shrink-0">
                  <span className="px-2 w-full text-end bg-background text-sm relative -top-3">{hours}:00</span>
                </div>
                <div className="w-full grid grid-cols-7 divide-x border-r *:h-full">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
