import AppSidebar from "@/components/app-sidebar";
import FullscreenCalendar from "@/components/fullscreen-calendar";
import { SidebarProvider } from "@yz13/ui/sidebar";
import type { Route } from "./+types/page";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-[calc(100%-var(--sidebar-width))] h-dvh">
        <FullscreenCalendar />
      </div>
    </SidebarProvider>
  )
}
