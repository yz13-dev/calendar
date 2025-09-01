import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@yz13/ui/select";
import { Textarea } from "@yz13/ui/textarea";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";




export default function () {

  const [loading, setLoading] = useState<boolean>(false)

  const newCalendar = () => {

  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="space-y-3 max-w-sm w-full">
        <Button variant="secondary" asChild>
          <Link to="/">
            <ArrowLeftIcon /><span>Назад</span>
          </Link>
        </Button>
        <span className="block font-medium text-2xl">Новый календарь</span>
        <Input placeholder="Название календаря" />
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Что-то</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          className="resize-none"
          placeholder="Описание"
          rows={7}
        />
        <div className="flex justify-end">
          <Button>Создать календарь</Button>
        </div>
      </div>
    </div>
  )
}
