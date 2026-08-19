import { RevenueChart } from "@/components/dashboard/activity-chart"
import { RecentTransactions } from "@/components/dashboard/recent-projects"
import { AddTransactionForm } from "@/components/dashboard/project-form"
import { getStats, getTransactions, getChartData } from "@/server/queries/transaction.queries"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export default async function DashboardPage() {
  const [stats, transactions, chartData] = await Promise.all([
    getStats(),
    getTransactions(),
    getChartData(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">June 2026 · All accounts</p>
        </div>
        <AddTransactionForm />
      </div>

      <DashboardStats
        revenue={stats?.revenue ?? 0}
        expenses={stats?.expenses ?? 0}
        profit={stats?.profit ?? 0}
        pending={stats?.pending ?? 0}
      />

      <RevenueChart data={chartData} />
      <RecentTransactions transactions={transactions} />
    </div>
  )
}