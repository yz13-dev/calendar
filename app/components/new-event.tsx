import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@yz13/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@yz13/ui/sheet";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { AlignLeftIcon, CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

type NewEventProps = {
  date?: Date
  hour?: number
  minute?: number
}
const NewEvent = ({ date = new Date(), hour, minute }: NewEventProps) => {

  const [hours, setHours] = useState(hour ?? 0)
  const [minutes, setMinutes] = useState(minute ?? 0)

  return (
    <>
      <Input placeholder="Название" className="h-10 !text-base" />
      <div className="w-full space-y-3">
        <div className="flex items-center gap-4 flex-row">
          <ClockIcon size={20} />
          <div className="flex items-center w-full gap-2 *:w-1/2">
            <div className="w-full h-10 rounded-md bg-secondary" />
            <div className="w-full h-10 rounded-md bg-secondary" />
          </div>
        </div>
        <div className="flex items-center gap-4 flex-row">
          <CalendarIcon size={20} />
          <Button variant="ghost" className="w-full shrink capitalize justify-start">{format(date, "EEEEEE, d MMMM", { locale: ru })}</Button>
        </div>
        <div className="flex items-center gap-4 flex-row">
          <AlignLeftIcon size={20} className="shrink-0" />
          <Button variant="ghost" className="w-full shrink justify-start">Добавить описание</Button>
          {/*<Textarea rows={5} />*/}
        </div>
        <div className="w-full flex justify-end mt-auto">
          <Button><PlusIcon /><span>Создать</span></Button>
        </div>
      </div>
    </>
  )
}

type PopoverProps = {
  children?: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end",
  date?: Date
  hour?: number
  minute?: number
}
export const NewEventPopover = ({
  children,
  side = "right",
  align = "start",
  date,
  hour,
  minute
}: PopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={!!children}>{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="rounded-4xl space-y-4">
        <NewEvent date={date} hour={hour} minute={minute} />
      </PopoverContent>
    </Popover>
  )
}

type SheetProps = {
  children?: React.ReactNode
  date?: Date
  hour?: number
  minute?: number
}
export const NewEventSheet = ({
  children,
  date,
  hour,
  minute
}: SheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild={!!children}>{children}</SheetTrigger>
      <SheetContent className="rounded-4xl space-y-4 mr-6 my-6 h-[calc(100%-48px)] border p-6">
        <NewEvent date={date} hour={hour} minute={minute} />
      </SheetContent>
    </Sheet>
  )
}
export default NewEvent;
