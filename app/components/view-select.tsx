import views, { defaultView } from "@/const/views";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@yz13/ui/select";
import { useQueryState } from "nuqs";
import { useEffect } from "react";




export default function () {

  const [view, setView] = useQueryState("view");

  useEffect(() => {
    if (!view) setView(defaultView)
  }, [view])
  return (
    <Select value={view ?? undefined} onValueChange={setView}>
      <SelectTrigger className="md:min-w-28 min-w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {
          views
            .map((view, index) => {
              return (
                <SelectItem
                  key={`${view.view}/${index}`}
                  value={view.view}
                >
                  {view.label}
                </SelectItem>
              )
            })
        }
      </SelectContent>
    </Select>
  )
}
