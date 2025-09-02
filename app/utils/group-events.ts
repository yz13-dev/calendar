import type { Event } from "@/hooks/use-events";
import { format, parseISO } from "date-fns";


export const groupEvents = (events: Event[]) => {
  // group events by date yyyy-MM-dd HH:mm
  const group: Record<string, Event[]> = events
    .reduce<Record<string, Event[]>>((acc, event) => {
      const start = parseISO(event.date_start);
      const key = format(start, "yyyy-MM-dd HH:mm");
      acc[key] = acc[key] ?? [];
      acc[key].push(event);
      return acc;
    }, {});

  // leave only groups that have more than 2 events in group
  for (const [key, events] of Object.entries(group)) {
    const length = events.length;
    // in case if that happened
    if (length === 0) delete group[key];
    if (length === 1) delete group[key];
  }

  return group;
}
