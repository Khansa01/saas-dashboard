"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { cache } from "react"

export const updateCurrency = async (code: string) => {
  const session = await auth()
  if (!session?.user?.id) return

  await db.user.update({
    where: { id: session.user.id },
    data: { currency: code }
  })
}

export const getCurrency = cache(async () => {  // ← tambah cache di sini
  const session = await auth()
  if (!session?.user?.id) return "USD"

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { currency: true }
  })

  return user?.currency ?? "USD"
})