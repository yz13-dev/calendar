import { Button } from "@yz13/ui/button";
import { Calendar } from "@yz13/ui/calendar";
import { isPast, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { DotIcon } from "lucide-react";
import { motion } from "motion/react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";


export default function () {

  const [duration] = useQueryState("duration");
  const [time, setTime] = useQueryState("time");
  const [date, setDate] = useQueryState("date", parseAsIsoDate);

  const parsedDuration = useMemo(() => {
    if (!duration) return null;
    const parsed = Number.parseInt(duration);
    const hours = Math.floor(parsed / 60);
    const minutes = parsed % 60;
    if (hours === 0) return `${minutes} мин`;
    if (hours >= 1 && minutes === 0) return `${hours} ч`;
    return `${hours} ч ${minutes} мин`;
  }, [duration])

  useEffect(() => {
    if (!date) setDate(new Date())
  }, [date])
  return (
    <motion.div
      layout
      layoutId="call-form"
      className="w-full max-w-2xl *:p-4 bg-card border rounded-2xl divide-x mx-auto flex md:flex-row flex-col"
      transition={{ duration: 0.6, type: "spring" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        layoutId="call-form/left"
        className="flex flex-col gap-4 md:w-2/3 w-full"
      >
        <Calendar
          mode="single"
          className="bg-transparent w-full p-0"
          disabled={date => {
            if (isToday(date)) return false;
            return isPast(date);
          }}
          locale={ru}
          selected={date ?? new Date()}
          onSelect={date => {
            if (date) setDate(date)
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        layoutId="call-form/right"
        className="space-y-2 md:w-1/3 w-full"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-base">Чт</span>
            <span className="text-base text-muted-foreground">21</span>
          </div>
          <div className="flex items-center gap-1">
            {
              parsedDuration &&
              <span className="text-base text-muted-foreground">{parsedDuration}</span>
            }
          </div>
        </div>
        <ul className="w-full space-y-2 *:w-full [&>li]:*:w-full">
          <li>
            <Button variant="outline" size="lg" onClick={() => setTime("11:00")}>
              <DotIcon strokeWidth={4} />
              11:00
            </Button>
          </li>
          <li>
            <Button variant="outline" size="lg">
              <DotIcon strokeWidth={4} />
              11:30
            </Button>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}
