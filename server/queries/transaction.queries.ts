import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function getTransactions() {
  const session = await auth()
  if (!session?.user?.id) return []

  return db.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })
}

export async function getStats() {
  const session = await auth()
  if (!session?.user?.id) return null

  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
  })

  const revenue = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0)

  const pending = transactions.filter((t) => t.status === "Pending").length

  return {
    revenue,
    expenses,
    profit: revenue - expenses,
    pending,
  }
}

export async function getChartData() {
  const session = await auth()
  if (!session?.user?.id) return []

  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  })

  const monthMap: Record<string, { month: string; revenue: number; expenses: number }> = {}

  transactions.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("en-US", { month: "short" })
    if (!monthMap[month]) {
      monthMap[month] = { month, revenue: 0, expenses: 0 }
    }
    if (t.type === "in") {
      monthMap[month].revenue += t.amount
    } else {
      monthMap[month].expenses += t.amount
    }
  })

  return Object.values(monthMap)
}