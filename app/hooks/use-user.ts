import { getAuthV1Me } from "@yz13/api";
import type { GetUserV1Uid200 } from "@yz13/api/types";
import { useEffect } from "react";
import { create } from "zustand";

export type User = GetUserV1Uid200;

type State = {
  user: User | null;
  loading: boolean;
}
type Actions = {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export default function (): [User | null, boolean] {

  const user = useUserStore((state) => state.user)
  const loading = useUserStore((state) => state.loading)
  const setUser = useUserStore((state) => state.setUser)
  const setLoading = useUserStore((state) => state.setLoading)

  const refresh = async () => {
    setLoading(true)
    try {
      const user = await getAuthV1Me()
      setUser(user)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])
  return [user, loading] as const;
}


export const useRefreshUser = () => {

  const setUser = useUserStore((state) => state.setUser)
  const loading = useUserStore((state) => state.loading)
  const setLoading = useUserStore((state) => state.setLoading)

  const refresh = async () => {
    setLoading(true)
    try {
      const user = await getAuthV1Me()
      setUser(user)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return [refresh, loading] as const;
}
