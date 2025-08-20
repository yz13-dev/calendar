import useUser from "@/hooks/use-user";
import { Checkbox } from "@yz13/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "@yz13/ui/sidebar";
import { CalendarFoldIcon, CalendarIcon, ClockIcon, SettingsIcon } from "lucide-react";
import DatePicker from "./date-picker";
import User from "./user";


export default function () {

  const [user, loading] = useUser();

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
