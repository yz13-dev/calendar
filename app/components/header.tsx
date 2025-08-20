import { Button } from "@yz13/ui/button";
import { SidebarTrigger } from "@yz13/ui/sidebar";
import { addDays, addMonths, addWeeks, addYears, format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useEffect } from "react";
import ViewSelect from "./view-select";


export default function () {

  const [selected, setSelected] = useQueryState("date", parseAsIsoDate);
  const [view] = useQueryState("view");

  const nextMonth = () => {
    if (!selected) return
    setSelected(addMonths(selected, 1))
  }
  const prevMonth = () => {
    if (!selected) return
    setSelected(addMonths(selected, -1))
  }
  const nextDay = () => {
    if (!selected) return
    setSelected(addDays(selected, 1))
  }
  const prevDay = () => {
    if (!selected) return
    setSelected(addDays(selected, -1))
  }
  const nextWeek = () => {
    if (!selected) return
    setSelected(addWeeks(selected, 1))
  }
  const prevWeek = () => {
    if (!selected) return
    setSelected(addWeeks(selected, -1))
  }
  const nextYear = () => {
    if (!selected) return
    setSelected(addYears(selected, 1))
  }
  const prevYear = () => {
    if (!selected) return
    setSelected(addYears(selected, -1))
  }

  const toToday = () => {
    setSelected(new Date())
  }

  const handleWheel = (e: WheelEvent) => {
    if (view !== "month") return;
    const isScrollUp = e.deltaY > 0;
    if (isScrollUp) nextMonth()
    else prevMonth()
  }

  useEffect(() => {

    window.addEventListener("wheel", handleWheel)
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [selected])
  return (
    <header className="w-full h-14 flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex items-center gap-1 *:text-xl *:font-medium">
          {
            view === "year" &&
            <span>{selected && format(selected, "yyyy", { locale: ru })}</span>
          }
          {
            view === "month" &&
            <>
              <span className="text-foreground capitalize">
                {selected && format(selected, "LLLL", { locale: ru })}
              </span>
              <span className="text-muted-foreground">
                {selected && format(selected, "yyyy")}
              </span>
            </>
          }
          {
            view === "week" &&
            <>
              <span>Неделя {selected && format(selected, "w", { locale: ru })}</span>
              <span className="text-muted-foreground">{selected && format(selected, "yyyy")}</span>
            </>
          }
          {
            view === "day" &&
            <>
              <span className="capitalize">{selected && format(selected, "EEEE, dd", { locale: ru })}</span>
              <span className="text-muted-foreground">{selected && format(selected, "MMMM yyyy", { locale: ru })}</span>
            </>
          }
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (view === "year") prevYear()
              if (view === "month") prevMonth()
              if (view === "week") prevWeek()
              if (view === "day") prevDay()
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (view === "year") nextYear()
              if (view === "month") nextMonth()
              if (view === "week") nextWeek()
              if (view === "day") nextDay()
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <ViewSelect />
        <Button
          variant="outline"
          onClick={toToday}
        >
          Сегодня
        </Button>
      </div>
    </header>
  )
}
