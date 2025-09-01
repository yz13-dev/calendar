import useEvents, { type Event } from "@/hooks/use-events";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/utils";
import { addDays, eachDayOfInterval, format, isSameMonth, isToday, isWithinInterval, lastDayOfMonth as lastDay, parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";



export default function () {

  const [selected] = useQueryState("date", parseAsIsoDate)

  const date = selected ? selected : new Date();

  const month = date.getMonth();

  const firstDayOfMonth = new Date(date.getFullYear(), month, 1)

  const firstDayMonthWeekday = firstDayOfMonth.getDay();

  const calendarFirstDay = firstDayMonthWeekday === 1 ? firstDayOfMonth : addDays(firstDayOfMonth, -firstDayMonthWeekday + 1);

  const lastDayOfMonth = lastDay(firstDayOfMonth);

  const lastDayMonthWeekday = lastDayOfMonth.getDay();

  const calendarLastDay = addDays(lastDayOfMonth, -lastDayMonthWeekday + 7)

  const interval = eachDayOfInterval({ start: calendarFirstDay, end: calendarLastDay });

  const from = format(firstDayOfMonth, "yyyy-MM-dd");
  const to = format(lastDayOfMonth, "yyyy-MM-dd");
  const [events] = useEvents({ from, to })

  return (
    <>
      <div className="w-full h-10 grid grid-cols-7 divide-x border-y *:py-2 md:*:px-4 *:px-2 [&>div]:last:border-r">
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
              return <DateCell
                key={format(date, "yyyy-MM-dd")}
                date={date}
                events={events}
              />
            })
        }
      </div>
    </>
  )
}


const DateCell = ({
  date,
  events = [],
}: {
  events?: Event[]
  date: Date
}) => {
  const [_, setView] = useQueryState("view")
  const [selected, setSelected] = useQueryState("date", parseAsIsoDate)

  const notSameMonth = selected ? !isSameMonth(selected, date) : false;
  const today = isToday(date);

  const isSelected = selected
    ? format(date, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd")
    : false;

  const filtered = events.filter(event => {
    const start = parseISO(event.date_start);
    const end = parseISO(event.date_end);
    return isWithinInterval(date, { start, end });
  })

  return (
    <div
      onClick={() => setSelected(date)}
      className={cn(
        "w-full h-full transition-colors",
        "last:border-r last:border-b group",
        notSameMonth ? "bg-muted/40" : "",
        isSelected ? "bg-card" : "hover:bg-card"
      )}
    >
      <div className="h-8 py-1 md:px-3 px-1.5 flex items-center gap-1 justify-between">
        <div className="flex items-center h-full gap-1">
          <div className={cn(
            "h-full aspect-square flex items-center justify-center rounded-full text-sm",
            today ? "bg-foreground" : isSelected ? "bg-secondary" : "bg-transparent"
          )}>
            <span className={cn(
              "",
              today ? "text-background" : isSelected ? "text-secondary-foreground" : notSameMonth ? "text-muted-foreground" : "text-foreground"
            )}
            >
              {format(date, "dd")}
            </span>
          </div>
          {
            today &&
            <span className="text-xs md:inline hidden text-muted-foreground">Сегодня</span>
          }
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="size-6 group-hover:flex hidden"
          onClick={() => {
            setView("day")
            setSelected(date)
          }}
        >
          <ArrowRightIcon className="size-3" />
        </Button>
      </div>
      <div className="h-[calc(100%-32px)] *:h-full grid grid-rows-5 gap-1 py-1 *:md:px-3 *:px-1.5">
        {
          filtered
            .map(event => {
              return (
                <div key={event.id} className="w-full">
                  <div className="w-full h-full bg-secondary rounded-[6px]"></div>
                </div>
              )
            })
        }
        {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
        {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
        {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
        {/*<div className="w-full"><div className="w-full h-full bg-secondary"></div></div>*/}
      </div>
    </div>
  )
}
