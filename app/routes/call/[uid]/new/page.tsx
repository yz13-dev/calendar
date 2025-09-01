import { getUserV1Uid } from "@yz13/api";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, GlobeIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useQueryState } from "nuqs";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/page";
import DatePickerForm from "./date-picker-form";
import DetailsForm from "./details-form";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const uid = params.uid;

    const user = await getUserV1Uid(uid)

    return { user }

  } catch (error) {
    console.error(error);
    return { user: null }
  }
}

export default function ({ params }: Route.ComponentProps) {
  const { user } = useLoaderData<typeof loader>();

  const avatar_url = user?.avatar_url;
  const username = user?.username;
  const email = user?.email;

  const [time] = useQueryState("time")
  const [duration, setDuration] = useQueryState("duration")

  if (!duration) {
    return (
      <div className="min-h-dvh">
        <div className="w-full max-w-lg mx-auto px-4 pt-[10%] pb-6 space-y-4">
          <div className="flex items-center gap-1.5">
            <Avatar className="size-9">
              <AvatarImage src={avatar_url ?? undefined} />
              <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{username}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
          <ul className="space-y-3">
            <li
              className="group rounded-lg bg-card space-y-2 p-4 border transition-colors hover:cursor-pointer"
              onClick={() => setDuration("30")}
            >
              <div className="w-full h-12 p-1 bg-secondary/40 rounded-[6px] flex items-center gap-2">
                <div className="h-full w-1 bg-secondary rounded-full" />
                <div className="w-full h-full flex flex-col justify-center">
                  <span className="text-sm font-medium">Долгий созвон</span>
                  <span className="text-xs text-muted-foreground">Без описания</span>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-lg font-medium">30 минут</span>
                <ArrowRightIcon className="size-4 group-hover:opacity-100 opacity-0 transition-opacity" />
              </div>
            </li>
            <li
              className="group rounded-lg bg-card space-y-2 p-4 border transition-colors hover:cursor-pointer"
              onClick={() => setDuration("60")}
            >
              <div className="w-full h-12 p-1 bg-secondary/40 rounded-[6px] flex items-center gap-2">
                <div className="h-full w-1 bg-secondary rounded-full" />
                <div className="w-full h-full flex flex-col justify-center">
                  <span className="text-sm font-medium">Долгий созвон</span>
                  <span className="text-xs text-muted-foreground">Без описания</span>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-lg font-medium">1 час</span>
                <ArrowRightIcon className="size-4 group-hover:opacity-100 opacity-0 transition-opacity" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-dvh">
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between px-4 pt-[10%] pb-6">
        <div className={cn("flex flex-col gap-2 transition-opacity", time ? "opacity-0" : "opacity-100")}>
          <span className="text-2xl font-medium">Созвон</span>
          <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full bg-secondary" />
              <span className="text-base text-foreground font-medium">YZ13</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="size-5" />
              <span className="text-base text-foreground font-medium">Asia/Yekaterinburg</span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {
          time
            ? <DetailsForm />
            : <DatePickerForm />
        }
      </AnimatePresence>
      <div className="max-w-2xl w-full transition-all mx-auto p-6 flex items-center justify-center">
        <GlobeIcon />
      </div>
    </div>
  )
}
