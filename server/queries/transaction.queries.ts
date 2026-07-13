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

export async function getAnalyticsData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  })

  // Breakdown per kategori
  const categoryMap: Record<string, number> = {}
  transactions.forEach((t) => {
    if (!categoryMap[t.category]) categoryMap[t.category] = 0
    categoryMap[t.category] += t.amount
  })
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))

  // Trend per bulan
  const monthMap: Record<string, { month: string; revenue: number; expenses: number; profit: number }> = {}
  transactions.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("en-US", { month: "short", year: "2-digit" })
    if (!monthMap[month]) monthMap[month] = { month, revenue: 0, expenses: 0, profit: 0 }
    if (t.type === "in") {
      monthMap[month].revenue += t.amount
    } else {
      monthMap[month].expenses += t.amount
    }
    monthMap[month].profit = monthMap[month].revenue - monthMap[month].expenses
  })
  const trendData = Object.values(monthMap)

  // Top transactions
  const topIncome = transactions
    .filter((t) => t.type === "in")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  const topExpenses = transactions
    .filter((t) => t.type === "out")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  // Summary stats
  const totalTransactions = transactions.length
  const avgTransaction = totalTransactions > 0
    ? transactions.reduce((sum, t) => sum + t.amount, 0) / totalTransactions
    : 0
  const completedCount = transactions.filter((t) => t.status === "Completed").length
  const pendingCount = transactions.filter((t) => t.status === "Pending").length

  return {
    categoryData,
    trendData,
    topIncome,
    topExpenses,
    totalTransactions,
    avgTransaction,
    completedCount,
    pendingCount,
  }
}