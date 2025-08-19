import useUser from "@/hooks/use-user";
import { Calendar } from "@yz13/ui/calendar";
import { Checkbox } from "@yz13/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "@yz13/ui/sidebar";
import { ru } from "date-fns/locale";
import { CalendarFoldIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useEffect } from "react";
import User from "./user";


export default function () {

  const [date, setDate] = useQueryState("date", parseAsIsoDate);
  const [user, loading] = useUser();

  useEffect(() => {
    if (!date) setDate(new Date())
  }, [date])
  return (
    <Sidebar>
      {/*<SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>*/}
      <SidebarContent>
        <Calendar
          selected={date ?? undefined}
          onSelect={date => {
            setDate(date ?? null)
          }}
          mode="single"
          className="w-full bg-transparent"
          locale={ru}
        />
        {
          loading
            ?
            <>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="!w-[92.5%]" />
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
            :
            user &&
            <>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <ClockIcon />
                        Расписание
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <CalendarIcon />
                        Бронирования
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="!w-[92.5%]" />
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <CalendarFoldIcon />
                            Календари
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <Checkbox />
                                Календарь #1
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
        }
      </SidebarContent>
      <SidebarFooter><User /></SidebarFooter>
    </Sidebar>
  )
}
