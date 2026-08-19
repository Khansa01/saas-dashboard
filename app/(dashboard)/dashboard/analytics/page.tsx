import { AnalyticsStats } from "@/components/dashboard/analytics-stats"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { TrendChart } from "@/components/dashboard/trend-chart"
import { getAnalyticsData } from "@/server/queries/transaction.queries"
import { TrendingUp, Activity, Clock } from "lucide-react"

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  if (!data) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-medium text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Detailed breakdown of your finances</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Activity size={13} className="text-blue-600" />
            Total transactions
          </div>
          <p className="text-xl font-medium text-gray-900">{data.totalTransactions}</p>
        </div>
        <AnalyticsStats avgTransaction={data.avgTransaction} />
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <TrendingUp size={13} className="text-green-600" />
            Completed
          </div>
          <p className="text-xl font-medium text-gray-900">{data.completedCount}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Clock size={13} className="text-amber-500" />
            Pending
          </div>
          <p className="text-xl font-medium text-gray-900">{data.pendingCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TrendChart data={data.trendData} />
        <CategoryChart data={data.categoryData} />
      </div>

      <AnalyticsStats
        topIncome={data.topIncome}
        topExpenses={data.topExpenses}
      />
    </div>
  )
}