import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/header";
import ViewWrapper from "@/components/view-wrapper";
import Day from "@/components/views/day";
import Month from "@/components/views/month";
import Week from "@/components/views/week";
import Year from "@/components/views/year";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { useQueryState } from "nuqs";
import type { Route } from "./+types/page";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  const [view] = useQueryState("view")
  return (
    <SidebarProvider>
      <title>Календарь</title>
      <AppSidebar />
      <ViewWrapper>
        <Header />
        {view === "year" && <Year />}
        {view === "month" && <Month />}
        {view === "week" && <Week />}
        {view === "day" && <Day />}
      </ViewWrapper>
    </SidebarProvider>
  )
}
