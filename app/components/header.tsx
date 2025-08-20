import { Button } from "@yz13/ui/button";
import { SidebarTrigger } from "@yz13/ui/sidebar";
import { addMonths, format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import ViewSelect from "./view-select";


export default function () {

  const [selected, setSelected] = useQueryState("date", parseAsIsoDate);

  const nextMonth = () => {
    if (!selected) return
    setSelected(addMonths(selected, 1))
  }
  const prevMonth = () => {
    if (!selected) return
    setSelected(addMonths(selected, -1))
  }

  const toToday = () => {
    setSelected(new Date())
  }

  return (
    <header className="w-full h-14 flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex items-center gap-1 *:text-xl *:font-medium">
          <span className="text-foreground capitalize">
            {selected && format(selected, "LLLL", { locale: ru })}
          </span>
          <span className="text-muted-foreground">
            {selected && format(selected, "yyyy")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
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
