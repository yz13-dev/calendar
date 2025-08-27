import { parseAsIsoDate, useQueryState } from "nuqs";

const HOUR_HEIGHT = 0;

export default function () {

  const [date] = useQueryState("date", parseAsIsoDate)

  const selected = date ?? new Date();

  const weekday = selected.toLocaleString("default", { weekday: "long" });
  const day = selected.toLocaleString("default", { day: "numeric" });

  const hours = Array.from({ length: 24 }).map((_, i) => i)

  return (
    <div className="w-full divide-y border-b">
      <div className="flex items-center h-10 *:h-full sticky top-0 bg-background z-10">
        <div className="w-16 shrink-0 px-2 flex items-center justify-center">
          <span className="text-xs text-end">+0 UTC</span>
        </div>
        <div className="w-full border-r *:px-2">
          <div
            className="w-full flex items-center justify-start h-full gap-1"
          >
            <span className="capitalize text-sm font-normal text-muted-foreground">
              {weekday}
            </span>
            <span>{day}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center divide-x h-20 *:h-full">
        <div className="w-16 p-2 flex justify-end shrink-0">
          <span className="text-sm text-end">Весь день</span>
        </div>
        <div className="w-full border-r *:h-full">
          <div></div>
        </div>
      </div>
      {
        hours
          .map(hour => {
            const hours = hour.toString().padStart(2, "0");
            return (
              <div key={hour} className="flex items-center divide-x h-20 *:h-full">
                <div className="w-16 flex justify-end shrink-0">
                  <span className="px-2 w-full text-end bg-background text-sm relative -top-3">{hours}:00</span>
                </div>
                <div className="w-full border-r *:h-full">
                  <div></div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
