"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (days > 0) return `${days}h ${hours}j`
  if (hours > 0) return `${hours}j ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}d`
  return `${seconds}d`
}

export function SessionTimer() {
  const { data: session, status } = useSession()
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (status !== "authenticated" || !session?.expires) return

    const expiresAt = new Date(session.expires).getTime()

    const tick = () => {
      const diff = expiresAt - Date.now()

      if (diff <= 0) {
        setTimeLeft("Session expired")
        return
      }

      setTimeLeft(formatDuration(diff))
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [session, status])

  if (status !== "authenticated") return null

  return (
    <div className="text-sm text-muted-foreground">
      Session berakhir dalam: <span className="font-mono">{timeLeft}</span>
    </div>
  )
}