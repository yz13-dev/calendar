import { redirect } from "react-router";





export const loader = async () => {

  const url = new URL("/auth/signin", "https://yz13.ru")
  const searchParams = url.searchParams;

  searchParams.set("next", "https://notes.yz13.ru")
  searchParams.set("appId", "eb4a87d8-5538-4207-ad54-b185a4b92d6f")

  return redirect(url.toString())
}


export default function () {
  return null
}
