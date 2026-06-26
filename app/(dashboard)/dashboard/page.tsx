import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/activity-chart"
import { RecentTransactions } from "@/components/dashboard/recent-projects"
import { AddTransactionForm } from "@/components/dashboard/project-form"
import { getStats, getTransactions } from "@/server/queries/transaction.queries"
import { TrendingUp, TrendingDown, Coins, FileText } from "lucide-react"

export default async function DashboardPage() {
  const [stats, transactions] = await Promise.all([
    getStats(),
    getTransactions(),
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

      <div className="grid grid-cols-4 gap-3">
        <StatsCard
          label="Total revenue"
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
          change="+12.4% vs last month"
          trend="up"
          icon={TrendingUp}
        />
        <StatsCard
          label="Total expenses"
          value={`$${(stats?.expenses ?? 0).toLocaleString()}`}
          change="+3.2% vs last month"
          trend="down"
          icon={TrendingDown}
        />
        <StatsCard
          label="Net profit"
          value={`$${(stats?.profit ?? 0).toLocaleString()}`}
          change="+18.7% vs last month"
          trend="up"
          icon={Coins}
        />
        <StatsCard
          label="Pending invoices"
          value={String(stats?.pending ?? 0)}
          change="2 new this week"
          trend="neutral"
          icon={FileText}
        />
      </div>

      <RevenueChart />
      <RecentTransactions transactions={transactions} />
    </div>
  )
}