import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/activity-chart"
import { RecentTransactions } from "@/components/dashboard/recent-projects"
import { TrendingUp, TrendingDown, Coins, FileText } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-medium text-gray-900">Overview</h1>
        <p className="text-sm text-gray-400 mt-0.5">June 2026 · All accounts</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <StatsCard
          label="Total revenue"
          value="$48,295"
          change="+12.4% vs last month"
          trend="up"
          icon={TrendingUp}
        />
        <StatsCard
          label="Total expenses"
          value="$21,430"
          change="+3.2% vs last month"
          trend="down"
          icon={TrendingDown}
        />
        <StatsCard
          label="Net profit"
          value="$26,865"
          change="+18.7% vs last month"
          trend="up"
          icon={Coins}
        />
        <StatsCard
          label="Pending invoices"
          value="14"
          change="2 new this week"
          trend="neutral"
          icon={FileText}
        />
      </div>

      <RevenueChart />
      <RecentTransactions />
    </div>
  )
}