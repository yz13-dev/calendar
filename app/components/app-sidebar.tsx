import useCalendars from "@/hooks/use-calendars";
import useUser from "@/hooks/use-user";
import { Checkbox } from "@yz13/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "@yz13/ui/sidebar";
import { CalendarFoldIcon, CalendarIcon, CalendarSyncIcon, ClockIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { Link } from "react-router";
import DatePicker from "./date-picker";
import User from "./user";


export default function () {

  const [user, loading] = useUser();

  const [calendars] = useCalendars()

  return (
    <Sidebar>
      {/*<SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>*/}
      <SidebarContent>
        <DatePicker />
        {
          loading
            ?
            <>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuSkeleton />
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
                      <SidebarMenuButton asChild>
                        <Link to="/schedule">
                          <ClockIcon />
                          Расписание
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <CalendarIcon />
                        Бронирования
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SettingsIcon />
                        Настройки
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
                            {
                              calendars.length === 0
                              &&
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <Link to="/calendar/new">
                                    <PlusIcon />
                                    <span>Создать календарь</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            }
                            {
                              calendars
                                .map(calendar => {
                                  const isShared = calendar.shared_with?.includes(user.id)
                                  return (
                                    <SidebarMenuSubItem key={`sidebar/${calendar.id}`}>
                                      <SidebarMenuSubButton>
                                        <Checkbox />
                                        {
                                          isShared
                                            ? <CalendarSyncIcon size={16} />
                                            : <CalendarIcon size={16} />
                                        }
                                        {calendar.name}
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )
                                })
                            }
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
