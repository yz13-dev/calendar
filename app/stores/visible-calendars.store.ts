import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"




type State = {
  visible: string[]
}

type Actions = {
  setVisible: (visible: string[]) => void
}

export const useVisibleCalendarsStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        visible: [],
        setVisible: visible => set({ visible })
      }),
      {
        name: "visible-calendars",
      }
    )
  )
)
