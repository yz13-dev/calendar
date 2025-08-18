import views from "@/const/views";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@yz13/ui/select";
import { useQueryState } from "nuqs";




export default function () {

  const [view, setView] = useQueryState("view");

  return (
    <Select value={view ?? undefined} onValueChange={setView}>
      <SelectTrigger>Вид</SelectTrigger>
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
