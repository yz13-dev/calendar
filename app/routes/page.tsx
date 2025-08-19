import AppSidebar from "@/components/app-sidebar";
import FullscreenCalendar from "@/components/fullscreen-calendar";
import Header from "@/components/header";
import ViewWrapper from "@/components/view-wrapper";
import { SidebarProvider } from "@yz13/ui/sidebar";
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
      <title>Календарь</title>
      <AppSidebar />
      <ViewWrapper>
        <Header />
        <FullscreenCalendar />
      </ViewWrapper>
    </SidebarProvider>
  )
}
