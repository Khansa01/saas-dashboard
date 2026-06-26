"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const amount = parseFloat(formData.get("amount") as string)
  const type = formData.get("type") as string
  const status = formData.get("status") as string

  await db.transaction.create({
    data: {
      description,
      category,
      amount,
      type,
      status,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
}

export async function deleteTransaction(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.transaction.delete({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/dashboard")
}

export async function updateTransaction(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const amount = parseFloat(formData.get("amount") as string)
  const type = formData.get("type") as string
  const status = formData.get("status") as string

  await db.transaction.update({
    where: { id, userId: session.user.id },
    data: { description, category, amount, type, status },
  })

  revalidatePath("/dashboard")
}