import useEvents from "@/hooks/use-events";
import { groupEvents } from "@/utils/group-events";
import { getWeek } from "@/utils/week";
import { cn } from "@yz13/ui/utils";
import { eachDayOfInterval, format, isToday, isWeekend, isWithinInterval, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useMemo, type CSSProperties } from "react";
import { EventRow, EventsChunk } from "../events";
import NewEvent from "../new-event";

const HOUR_HEIGHT = 0;

export default function () {

  const [date] = useQueryState("date", parseAsIsoDate)

  const selected = date ?? new Date()

  const week = getWeek(selected)

  const interval = eachDayOfInterval({ start: week.start, end: week.end });

  const hours = Array.from({ length: 24 }).map((_, i) => i)

  const from = format(week.start, "yyyy-MM-dd");
  const to = format(week.end, "yyyy-MM-dd");

  const [events] = useEvents({ from, to })

  return (
    <div
      className="w-full divide-y border-y"
      style={{
        "--cell-height": 24
      } as CSSProperties}
    >
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
                const isDateWeekend = isWeekend(date);

                const filteredEvents = events
                  .filter(event => {
                    const start = parseISO(event.date_start);
                    const end = parseISO(event.date_end);
                    return isWithinInterval(date, { start, end });
                  })

                const groupedEvents = useMemo(() => {
                  return groupEvents(filteredEvents)
                }, [events])

                const grouped = Object.values(groupedEvents);

                const otherEvents = filteredEvents.filter(event => {
                  if (event.all_day === true) return false;
                  const notInGroup = grouped.every(group => !group.some(e => e.id === event.id));
                  return notInGroup;
                });

                // Преобразуем в массив чанков
                const eventChunks = Object.entries(groupedEvents).map(([time, events]) => ({
                  time,
                  events,
                  count: events.length
                }));

                return (
                  <div
                    key={date.toISOString()}
                    className="w-full flex flex-col"
                  >
                    <div
                      className={cn(
                        "w-full flex md:flex-row h-10 flex-col items-center justify-center md:gap-1 gap-0",
                        isDateWeekend ? "bg-muted/40" : "bg-background/40",
                        "sticky top-0 z-20 backdrop-blur-sm"
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
                    <div className="w-full flex flex-col divide-y border-y">
                      <div
                        className={cn(
                          "h-24",
                          isDateWeekend ? "bg-muted/40" : "",
                        )}>
                      </div>
                      <div className="w-full relative">
                        {/*<div className="absolute inset-0 z-0 left-0 w-full">*/}
                        {
                          otherEvents
                            .map(event => {
                              return <EventRow key={event.id} event={event} selected={selected} orientation="vertical" />
                            })
                        }
                        {
                          eventChunks
                            .map((chunk, index) => {
                              return <EventsChunk
                                key={`${chunk.time}/${index}`}
                                selected={selected}
                                date={chunk.time}
                                events={chunk.events}
                                orientation="vertical"
                              />
                            })
                        }
                        {/*</div>*/}
                        <div className="w-full *:h-24 divide-y">
                          {
                            hours
                              .map(hour => {
                                // const hours = hour.toString().padStart(2, "0");
                                return (
                                  <NewEvent
                                    key={`${dateKey}/${hour}/main`}
                                  >
                                    <div
                                      className={cn(
                                        isDateWeekend ? "bg-muted/40" : "",
                                      )}>
                                    </div>
                                  </NewEvent>
                                )
                              })
                          }
                        </div>
                      </div>
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
