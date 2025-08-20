import useUser from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { Button } from "@yz13/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ChevronDownIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";



export default function () {

  const [user, loading] = useUser();
  const [open, setOpen] = useState(false);

  if (loading) return <Skeleton className="w-full h-[54px]" />
  if (!user) return <Button className="w-full text-base [&>svg]:size-5 h-[54px]" size="lg" asChild>
    <Link to="/login">
      Войти
      <LogInIcon />
    </Link>
  </Button>

  const username = user.username ?? "Пользователь";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex items-center justify-between gap-2 bg-muted/50 hover:bg-muted border p-2 rounded-md">
          <div className="w-full flex items-center gap-2">
            <Avatar className="size-9 border">
              <AvatarImage src={user?.avatar_url ?? undefined} />
              <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-foreground font-medium">{username}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <div className="px-1">
            <ChevronDownIcon size={18} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-[var(--radix-dropdown-menu-trigger-width)] shadow-none">
        <DropdownMenuItem><LogOutIcon /> Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
