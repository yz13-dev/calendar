import AppSidebar from "@/components/app-sidebar";
import FullscreenCalendar from "@/components/fullscreen-calendar";
import { Button } from "@yz13/ui/button";
import { Select, SelectTrigger } from "@yz13/ui/select";
import { SidebarProvider, SidebarTrigger } from "@yz13/ui/sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Route } from "./+types/page";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div
        className="w-[calc(100%-var(--sidebar-width))] h-dvh"
      >
        <header className="w-full h-14 flex items-center justify-between px-3 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-xl font-medium">Month <span className="text-muted-foreground">Year</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><ChevronLeftIcon /></Button>
              <Button variant="outline" size="icon"><ChevronRightIcon /></Button>
            </div>
            <Select>
              <SelectTrigger>View</SelectTrigger>
            </Select>
            <Button variant="outline">Сегодня</Button>
          </div>
        </header>
        <FullscreenCalendar />
      </div>
    </SidebarProvider>
  )
}
