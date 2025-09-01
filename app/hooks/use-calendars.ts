import { getCalendarV1CalendarsUserId } from "@yz13/api";
import type { GetCalendarV1CalendarsUserId200Item } from "@yz13/api/types";
import { useEffect } from "react";
import { create } from "zustand";
import useUser from "./use-user";

export type Calendar = GetCalendarV1CalendarsUserId200Item;

type State = {
  calendars: Calendar[];
  loading: boolean;
}

type Actions = {
  setCalendars: (calendars: Calendar[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCalendarsStore = create<State & Actions>((set) => ({
  calendars: [],
  loading: true,
  setCalendars: (calendars) => set({ calendars }),
  setLoading: (loading) => set({ loading }),
}));

export default function (): [Calendar[], boolean] {

  const [user] = useUser();
  const loading = useCalendarsStore((state) => state.loading);
  const setLoading = useCalendarsStore((state) => state.setLoading);
  const calendars = useCalendarsStore((state) => state.calendars)
  const setCalendars = useCalendarsStore((state) => state.setCalendars)

  const refresh = async () => {
    if (!user) return;
    if (calendars.length > 0) return;
    setLoading(true)
    try {
      const calendars = await getCalendarV1CalendarsUserId(user.id)

      if (calendars) {
        const sorted = calendars.sort((a, b) => {
          const aIsUserAnOwner = a.user_id === user.id
          const bIsUserAnOwner = b.user_id === user.id
          if (aIsUserAnOwner && !bIsUserAnOwner) return -1
          if (!aIsUserAnOwner && bIsUserAnOwner) return 1
          if (aIsUserAnOwner && bIsUserAnOwner) return 0
          if (aIsUserAnOwner) return -1
          if (bIsUserAnOwner) return 1
          return 1;
        })
        setCalendars(sorted)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    refresh()
  }, [user])
  return [calendars, loading] as const;
}

export const useRefreshCalendars = () => {

  const [user] = useUser();
  const setCalendars = useCalendarsStore((state) => state.setCalendars);
  const loading = useCalendarsStore((state) => state.loading);
  const setLoading = useCalendarsStore((state) => state.setLoading);

  const refresh = async () => {
    if (!user) return;
    if (loading) return;
    setLoading(true)
    try {
      const calendars = await getCalendarV1CalendarsUserId(user.id)
      if (calendars) setCalendars(calendars)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return [refresh, loading] as const;
}
