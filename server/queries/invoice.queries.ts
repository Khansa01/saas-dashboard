import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function getInvoices() {
  const session = await auth()
  if (!session?.user?.id) return []

  return db.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })
}