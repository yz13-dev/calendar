import { getV1AuthMe } from "@yz13/api";
import type { GetV1UsersUid200 } from "@yz13/api/types";
import { useEffect, useState } from "react";

export type User = GetV1UsersUid200

export default function (): [User | null, boolean] {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const user = await getV1AuthMe({ headers: { "Access-Control-Allow-Origin": "calendar.yz13.ru" } })
      setUser(user)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])
  return [user, loading] as const;
}


export const useRefreshUser = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const user = await getV1AuthMe()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return [refresh, loading] as const;
}
