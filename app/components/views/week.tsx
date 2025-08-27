import { getWeek } from "@/utils/week";
import { cn } from "@yz13/ui/utils";
import { eachDayOfInterval, format, isToday, isWeekend } from "date-fns";
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
      <div className="flex items-start bg-background z-10">
        <div className="flex flex-col border-r">
          <div className="w-16 shrink-0 h-10 px-2 flex items-center justify-center">
            <span className="text-xs text-end">+0 UTC</span>
          </div>
          <div className="w-full flex flex-col *:h-24">
            <div className="w-16 p-2 flex justify-end shrink-0">
              <span className="text-xs text-end">Весь день</span>
            </div>
            {
              hours
                .map(hour => {
                  const hours = hour.toString().padStart(2, "0");
                  return (
                    <div key={`${hour}/side`} className="w-16 flex justify-end shrink-0">
                      <span className="px-2 w-full text-end bg-background text-sm relative -top-3">
                        {hours}:00
                      </span>
                    </div>
                  )
                })
            }
          </div>
        </div>
        <div className="w-full h-full grid grid-cols-7 border-r divide-x">
          {
            interval
              .map(date => {
                const dateKey = format(date, "yyyy-MM-dd")
                const weekday = format(date, "EEEE", { locale: ru });
                const shortWeekday = format(date, "EEEEEE", { locale: ru });
                const day = format(date, "dd", { locale: ru })
                const isDateToday = isToday(date)
                const isDateWeekend = isWeekend(date)
                return (
                  <div className="w-full flex flex-col">
                    <div
                      key={date.toISOString()}
                      className={cn(
                        "w-full flex md:flex-row h-10 flex-col items-center justify-center md:gap-1 gap-0",
                        isDateWeekend ? "bg-muted/40" : "bg-background/40",
                        "sticky top-0 z-10 backdrop-blur-sm"
                      )}
                    >
                      <span className="capitalize md:text-sm text-xs font-normal md:hidden inline text-muted-foreground">
                        {shortWeekday}
                      </span>
                      <span className="capitalize md:text-sm text-xs font-normal md:inline hidden text-muted-foreground">
                        {weekday}
                      </span>
                      <span className={cn("md:text-base text-xs", isDateToday ? "text-destructive" : "")}>{day}</span>
                    </div>
                    <div className="w-full flex flex-col divide-y *:h-24 border-y">
                      <div
                        className={cn(
                          isDateWeekend ? "bg-muted/40" : "",
                        )}>
                      </div>
                      {
                        hours
                          .map(hour => {
                            const hours = hour.toString().padStart(2, "0");
                            return (
                              <div
                                key={`${dateKey}/${hour}/main`}
                                className={cn(
                                  isDateWeekend ? "bg-muted/40" : "",
                                )}>
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}
