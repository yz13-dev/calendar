import type { Event } from "@/hooks/use-events";
import useEvents from "@/hooks/use-events";
import { groupEvents } from "@/utils/group-events";
import { format } from "date-fns";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useMemo, type CSSProperties } from "react";
import { EventRow, EventsChunk } from "../events";
import { NewEventSheet } from "../new-event";

const HOUR_HEIGHT = 0;

export default function () {

  const [date] = useQueryState("date", parseAsIsoDate)

  const selected = date ?? new Date();

  const weekday = selected.toLocaleString("default", { weekday: "long" });
  const day = selected.toLocaleString("default", { day: "numeric" });

  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const [events] = useEvents({ date: format(selected, "yyyy-MM-dd") })

  // Implement later
  // const allDayEvents = events.filter(event => event.all_day === true);

  const groupedEvents: Record<string, Event[]> = useMemo(() => {
    return groupEvents(events)
  }, [events])

  const grouped = Object.values(groupedEvents);

  const otherEvents = events.filter(event => {
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
      style={{
        "--cell-height": 20
      } as CSSProperties}
      className="w-full divide-y border-y"
    >
      <div className="flex items-center h-10 *:h-full sticky top-0 bg-background z-10">
        <div className="w-16 shrink-0 px-2 flex items-center justify-center">
          <span className="text-xs text-end">+0 UTC</span>
        </div>
        <div className="w-full border-r *:px-2">
          <div
            className="w-full flex items-center justify-start h-full gap-1"
          >
            <span className="capitalize text-sm font-normal text-muted-foreground">
              {weekday}
            </span>
            <span>{day}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center divide-x h-20 *:h-full">
        <div className="w-16 p-2 flex justify-end shrink-0">
          <span className="text-sm text-end">Весь день</span>
        </div>
        <div className="w-full border-r *:h-full">
          <div></div>
        </div>
      </div>
      <div className="w-full relative">
        {
          otherEvents
            .map(event => {
              return <EventRow key={event.id} event={event} selected={selected} />
            })
        }
        {
          eventChunks
            .map((chunk, index) => {
              return <EventsChunk key={`${chunk.time}/${index}`} selected={selected} date={chunk.time} events={chunk.events} />
            })
        }
        <div className="w-full divide-y">
          {
            hours
              .map(hour => {
                const hours = hour.toString().padStart(2, "0");
                return (
                  <NewEventSheet key={hour}>
                    <div className="flex items-center divide-x h-20 *:h-full">
                      <div className="w-16 flex justify-end shrink-0">
                        <span className="px-2 w-full text-end bg-background text-sm relative -top-3">{hours}:00</span>
                      </div>
                      <div className="w-full border-r *:h-full">
                        <div></div>
                      </div>
                    </div>
                  </NewEventSheet>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}
