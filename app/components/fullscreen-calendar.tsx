import { cn } from "@yz13/ui/utils";
import { addDays, eachDayOfInterval, format, isSameMonth, isToday, lastDayOfMonth as lastDay } from "date-fns";



export default function () {

  const date = new Date();

  const month = date.getMonth();

  const firstDayOfMonth = new Date(date.getFullYear(), month, 1)

  const firstDayMonthWeekday = firstDayOfMonth.getDay();

  const calendarFirstDay = firstDayMonthWeekday === 1 ? firstDayOfMonth : addDays(firstDayOfMonth, -firstDayMonthWeekday + 1);

  const lastDayOfMonth = lastDay(firstDayOfMonth);

  const lastDayMonthWeekday = lastDayOfMonth.getDay();

  const calendarLastDay = lastDayMonthWeekday === 0 ? addDays(lastDayOfMonth, -lastDayMonthWeekday + 7) : lastDayOfMonth;

  const interval = eachDayOfInterval({ start: calendarFirstDay, end: calendarLastDay });

  return (
    <>
      <div className="w-full h-10 grid grid-cols-7 divide-x border-b *:py-2 *:px-4">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>
      <div className="w-full grid grid-cols-7 h-[calc(100%-40px-var(--header-height))] divide-x divide-y">
        {
          interval
            .map(date => {

              const notSameMonth = !isSameMonth(date, new Date());
              const today = isToday(date)

              return (
                <div className="w-full h-full divide-y">
                  <div className="h-8 py-1 px-3 flex items-center gap-1">
                    <div className={cn(
                      "h-full aspect-square flex items-center justify-center rounded-[4px] text-sm",
                      today ? "bg-foreground" : "bg-transparent"
                    )}>
                      <span className={cn(
                        "",
                        today ? "text-background" : notSameMonth ? "text-muted-foreground" : "text-foreground"
                      )}
                      >
                        {format(date, "dd")}
                      </span>
                    </div>
                    {
                      today &&
                      <span className="text-xs text-muted-foreground">Сегодня</span>
                    }
                  </div>
                  <div className="h-[calc(100%-32px)] *:h-full grid grid-rows-4 gap-1 py-1 *:px-1">
                    {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
                    {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
                    {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
                    {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
                  </div>
                </div>
              )
            })
        }
      </div>
    </>
  )
}
