export default function () {
  return (
    <div className="w-full min-h-dvh flex *:py-3 gap-3">
      <div className="w-1/4 pl-3 space-y-3">

        <div className="w-full flex flex-row">
          <div className="size-20 flex flex-col items-center justify-center">
            <span className="text-center text-muted-foreground">СРД</span>
            <span className="text-4xl font-medium">20</span>
          </div>
          <div className="w-[calc(100%-80px)] space-y-3">
            <div className="w-full bg-secondary h-20" />
            <div className="w-full bg-secondary h-20" />
            <div className="w-full bg-secondary h-20" />
          </div>
        </div>

        <div className="w-full flex flex-row">
          <div className="size-20 flex flex-col items-center justify-center">
            <span className="text-center text-muted-foreground">ЧТГ</span>
            <span className="text-4xl font-medium">21</span>
          </div>
          <div className="w-[calc(100%-80px)] space-y-3">
            <div className="w-full bg-secondary h-20" />
          </div>
        </div>

      </div>
      <div className="w-3/4 pr-3">
        <div className="w-full h-20 bg-secondary"></div>
      </div>
    </div>
  )
}
