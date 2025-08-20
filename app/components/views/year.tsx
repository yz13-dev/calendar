import { Calendar } from "@yz13/ui/calendar"
import { eachMonthOfInterval } from "date-fns"
import { ru } from "date-fns/locale"
import { parseAsIsoDate, useQueryState } from "nuqs"


export default function () {

  const [date] = useQueryState("date", parseAsIsoDate)

  const selected = date ?? new Date()

  const firstMonth = new Date(selected.getFullYear(), 0, 1)
  const lastMonth = new Date(selected.getFullYear(), 11, 1)

  const interval = eachMonthOfInterval({ start: firstMonth, end: lastMonth })

  return (
    <div className="w-full grid lg:grid-cols-4 grid-cols-3 lg:grid-rows-3 grid-rows-4 gap-4 p-6">
      {
        interval
          .map(month => {

            const monthName = month.toLocaleString("default", { month: "long" })

            return (
              <Calendar
                key={month.toISOString()}
                className="w-full p-0"
                mode="single"
                defaultMonth={month}
                showOutsideDays={false}
                hideNavigation
                locale={ru}
              />
            )
          })
      }
    </div>
  )
}
