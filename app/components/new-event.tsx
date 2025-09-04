import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@yz13/ui/popover";
import { Textarea } from "@yz13/ui/textarea";
import { PlusIcon } from "lucide-react";


export default function ({
  children,
  side = "right",
  align = "start",
}: {
  children?: React.ReactNode,
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end"
}) {
  return (
    <Popover>
      <PopoverTrigger asChild={!!children}>{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="rounded-4xl space-y-3">
        <Input placeholder="Название" />
        <div className="flex items-center gap-2 *:w-1/2">
          <div className="w-full h-10 rounded-md bg-secondary" />
          <div className="w-full h-10 rounded-md bg-secondary" />
        </div>
        <Textarea rows={5} />
        <div className="w-full flex justify-end mt-6">
          <Button><PlusIcon /><span>Создать</span></Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
