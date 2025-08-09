import type { Route } from "./+types/page";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <h1 className="text-9xl font-semibold font-pixel">YZ13</h1>
    </div>
  )
}
