import { Button } from "@yz13/ui/button";
import { SidebarTrigger } from "@yz13/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/ui/tooltip";
import { useDebounceFn } from "ahooks";
import { addDays, addMonths, addWeeks, addYears, format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon, RotateCcwIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import ViewSelect from "./view-select";

type Props = {
  className?: string
}
export default function ({ className = "" }: Props) {

  const [selected, setSelected] = useQueryState("date", parseAsIsoDate);
  const [view, setView] = useQueryState("view");

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


  const handleWheel = useDebounceFn((e: WheelEvent) => {
    if (view !== "month") return;
    const isScrollUp = e.deltaY > 0;
    const isScrollDown = e.deltaY < 0;
    if (isScrollUp) {
      nextMonth()
      e.preventDefault()
    }
    if (isScrollDown) {
      prevMonth()
      e.preventDefault()
    }
  }, { wait: 150 })

  useHotkeys("ctrl+up, alt+up", () => {
    if (view === "year") prevYear()
    if (view === "month") prevMonth()
    if (view === "week") prevWeek()
    if (view === "day") prevDay()
  })
  useHotkeys("ctrl+down, alt+down", () => {
    if (view === "year") nextYear()
    if (view === "month") nextMonth()
    if (view === "week") nextWeek()
    if (view === "day") nextDay()
  })
  useHotkeys("ctrl+left, alt+left", () => {
    if (view === "year") setView("month")
    if (view === "month") setView("week")
    if (view === "week") setView("day")
    if (view === "day") return;
  })
  useHotkeys("ctrl+right, alt+right", () => {
    if (view === "year") return;
    if (view === "month") setView("year")
    if (view === "week") setView("month")
    if (view === "day") setView("week")
  })
  useEffect(() => {
    window.addEventListener("wheel", handleWheel.run, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel.run)
    }
  }, [selected, view])
  return (
    <header className="w-full h-14 flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent side="right">
              <kbd>Ctrl+B</kbd>
            </TooltipContent>
          </Tooltip>
        </div>
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
              <span className="text-muted-foreground">
                {selected && format(selected, "MMMM", { locale: ru })}
              </span>
              <span className="lg:inline hidden text-muted-foreground">
                {selected && format(selected, "yyyy", { locale: ru })}
              </span>
            </>
          }
        </div>
      </div>
      <div className="flex items-center lg:gap-4 gap-2">
        <div className="md:flex hidden items-center md:gap-2 gap-1">
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
          <RotateCcwIcon />
          <span className="lg:inline hidden">Сегодня</span>
        </Button>
      </div>
    </header>
  )
}
