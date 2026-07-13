"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createInvoice(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const client = formData.get("client") as string
  const amount = parseFloat(formData.get("amount") as string)
  const status = formData.get("status") as string
  const dueDate = new Date(formData.get("dueDate") as string)

  await db.invoice.create({
    data: {
      title,
      client,
      amount,
      status,
      dueDate,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard/invoices")
}

export async function deleteInvoice(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.invoice.delete({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/dashboard/invoices")
}

export async function updateInvoice(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const client = formData.get("client") as string
  const amount = parseFloat(formData.get("amount") as string)
  const status = formData.get("status") as string
  const dueDate = new Date(formData.get("dueDate") as string)

  await db.invoice.update({
    where: { id, userId: session.user.id },
    data: { title, client, amount, status, dueDate },
  })

  revalidatePath("/dashboard/invoices")
}