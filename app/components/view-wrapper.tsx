import { useSidebar } from "@yz13/ui/sidebar"
import { cn } from "@yz13/ui/utils"


export default function ({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar()
  return (
    <div
      className={cn(
        "h-dvh transition-all ml-auto duration-300",
        isMobile ? "w-full" : open ? "w-[calc(100%-var(--sidebar-width))]" : "w-full"
      )}
    >
      {children}
    </div>
  )
}
