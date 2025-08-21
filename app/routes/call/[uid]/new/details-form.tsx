import { Button } from "@yz13/ui/button"
import { Input } from "@yz13/ui/input"
import { Textarea } from "@yz13/ui/textarea"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { AlarmClockIcon, CalendarIcon, ClockIcon } from "lucide-react"
import { motion } from "motion/react"
import { parseAsIsoDate, useQueryState } from "nuqs"
import { useMemo } from "react"


export default function () {

  const [time, setTime] = useQueryState("time")
  const [date] = useQueryState("date", parseAsIsoDate);
  const [duration] = useQueryState("duration");

  const parsedDuration = useMemo(() => {
    if (!duration) return null;
    const parsed = Number.parseInt(duration);
    const hours = Math.floor(parsed / 60);
    const minutes = parsed % 60;
    if (hours === 0) return `${minutes} мин`;
    if (hours >= 1 && minutes === 0) return `${hours} ч`;
    return `${hours} ч ${minutes} мин`;
  }, [duration])

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
        className="space-y-4 md:w-1/2 w-full"
      >
        <span className="text-2xl block font-medium">Созвон</span>
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} />
            <span className="text-sm capitalize">
              {date && format(date, "EEEE, dd MMMM yyyy", { locale: ru })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon size={18} />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlarmClockIcon size={18} />
            <span className="text-sm">{parsedDuration}</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        layoutId="call-form/right"
        className="flex flex-col gap-8 md:w-1/2 w-full"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm">Ваше имя</span>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Почта</span>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Дополнительная информация</span>
            <Textarea
              placeholder="Информация, которая поможет подготовиться к встрече"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full">
            <span className="text-xs text-muted-foreground">
              Продолжая, вы соглашаетесь с Терминами и Политикой конфиденциальности
            </span>
          </div>
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setTime(null)}
            >
              Назад
            </Button>
            <Button>Подтвердить</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
