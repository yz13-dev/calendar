import type { Event } from "@/hooks/use-events";
import { cn } from "@yz13/ui/utils";
import { format, parse, parseISO } from "date-fns";
import type { ComponentProps } from "react";

const HOUR_HEIGHT = 24;

type EventsChunk = {
  selected?: Date
  date: string
  events?: Event[]
  orientation?: "vertical" | "horizontal"
}
export const EventsChunk = ({
  selected = new Date(),
  date,
  events = [],
  orientation = "horizontal"
}: EventsChunk) => {

  const parsed = parse(date, "yyyy-MM-dd HH:mm", new Date());

  const hours = parsed.getHours();
  const mins = parsed.getMinutes();
  const sum = hours + mins / 60;

  return (
    <div
      style={{
        top: `calc((var(--spacing) * var(--cell-height)) * ${sum})`,
      }}
      className="w-full absolute flex p-2 gap-2"
    >
      {
        events
          .map(event => {
            return <EventRow
              key={event.id}
              relative
              event={event}
              selected={selected}
              orientation={orientation}
            />
          })
      }
    </div>
  )
}

type EventRow = {
  selected?: Date
  event: Event
  orientation?: "vertical" | "horizontal",
  relative?: boolean
} & ComponentProps<"div">
export const EventRow = ({
  event,
  selected = new Date(),
  className = "",
  style,
  orientation = "horizontal",
  relative = false,
  ...props
}: EventRow) => {
  const summary = event.summary;

  const start = parseISO(event.date_start);
  const end = parseISO(event.date_end);

  const startHour = start.getHours();
  const endHour = end.getHours();
  const startMinute = start.getMinutes();
  const endMinute = end.getMinutes();

  const startSum = startHour + startMinute / 60;
  const endSum = endHour + endMinute / 60;

  const dateKey = format(selected, "yyyy-MM-dd");
  const startKey = format(start, "yyyy-MM-dd");
  const endKey = format(end, "yyyy-MM-dd");

  const startOnDiffDay = dateKey === endKey && startKey !== endKey;
  const endOnDiffDay = dateKey === startKey && startKey !== endKey;

  return (
    <div
      key={event.id}
      style={{
        left: "0px",
        top: relative ? "0px" : startOnDiffDay ? "0px" : `calc((var(--spacing) * var(--cell-height)) * ${startSum})`,
        height: `calc((var(--spacing) * var(--cell-height)) * ${endSum})`,
        maxHeight: `calc(((var(--spacing) * var(--cell-height)) * 24) - (var(--spacing) * var(--cell-height)) * ${endSum})`,
        ...style
      }}
      className={cn(
        "absolute p-2 w-full",
        className
      )}
      {...props}
    >
      <div className="w-full h-full bg-card border rounded-md p-2">
        <div className={cn(
          "flex gap-2",
          orientation === "horizontal"
            ? "flex-row items-center justify-between"
            : "flex-col"
        )}>
          <span className="text-sm text-foreground">{summary}</span>
          <div className="flex gap-1 flex-row *:text-sm">
            <span>
              {
                startOnDiffDay
                  ? format(start, "dd.MM HH:mm")
                  : format(start, "HH:mm")
              }
            </span>
            <span>-</span>
            <span>
              {
                endOnDiffDay
                  ? format(end, "dd.MM HH:mm")
                  : format(end, "HH:mm")
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
