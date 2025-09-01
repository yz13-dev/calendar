import { getCalendarV1EventsUserId } from "@yz13/api";
import type { GetCalendarV1EventsUserId200Item } from "@yz13/api/types";
import { useEffect } from "react";
import { create } from "zustand";
import useUser from "./use-user";




export type Event = GetCalendarV1EventsUserId200Item;

type State = {
  events: Event[];
  loading: boolean;
}

type Actions = {
  setEvents: (events: Event[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useEventsStore = create<State & Actions>()((set) => ({
  events: [],
  loading: false,
  setEvents: (events: Event[]) => set({ events }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function useEvents(date?: string) {

  const [user] = useUser()

  const loading = useEventsStore((state) => state.loading);
  const events = useEventsStore((state) => state.events);

  const setEvents = useEventsStore((state) => state.setEvents);
  const setLoading = useEventsStore((state) => state.setLoading);

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    try {

      const events = await getCalendarV1EventsUserId(user.id)

      if (events) setEvents(events);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) refresh();
  }, [user])
  return [events, loading] as const;
}

export const useRefreshEvents = () => {

  const [user] = useUser()
  const loading = useEventsStore((state) => state.loading);
  const setLoading = useEventsStore((state) => state.setLoading);
  const setEvents = useEventsStore((state) => state.setEvents);
  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    try {

      const events = await getCalendarV1EventsUserId(user.id)

      if (events) setEvents(events);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return [refresh, loading] as const;
}
