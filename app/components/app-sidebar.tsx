import { Calendar } from "@yz13/ui/calendar";
import { Checkbox } from "@yz13/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "@yz13/ui/sidebar";
import { ru } from "date-fns/locale";
import { CalendarFoldIcon, CalendarIcon, ChevronDownIcon, ClockIcon } from "lucide-react";


export default function () {
  return (
    <Sidebar>
      {/*<SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>*/}
      <SidebarContent>
        <Calendar
          mode="single"
          className="w-full bg-transparent"
          locale={ru}
        />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ClockIcon />
                  Расписение
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
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex items-center justify-between gap-2 hover:bg-muted/40 p-2 rounded-md">
          <div className="w-full flex items-center gap-2">
            <div className="size-9 rounded-full border bg-secondary" />
            <div className="flex flex-col justify-center">
              <span className="text-sm text-foreground font-medium">YZ13</span>
              <span className="text-xs text-muted-foreground">yz13@yz13.ru</span>
            </div>
          </div>
          <div className="px-1">
            <ChevronDownIcon size={18} className="text-muted-foreground" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
