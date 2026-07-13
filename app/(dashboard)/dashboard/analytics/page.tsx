import { CategoryChart } from "@/components/dashboard/category-chart"
import { TrendChart } from "@/components/dashboard/trend-chart"
import { getAnalyticsData } from "@/server/queries/transaction.queries"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"

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
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <TrendingUp size={13} className="text-green-600" />
            Avg transaction
          </div>
          <p className="text-xl font-medium text-gray-900">${data.avgTransaction.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Top income</p>
          </div>
          <div>
            {data.topIncome.length === 0 ? (
              <p className="text-sm text-gray-400 p-4">No income yet</p>
            ) : (
              data.topIncome.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-4 py-3 border-t border-gray-50 first:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.category}</p>
                  </div>
                  <p className="text-sm font-medium text-green-700">+${t.amount.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Top expenses</p>
          </div>
          <div>
            {data.topExpenses.length === 0 ? (
              <p className="text-sm text-gray-400 p-4">No expenses yet</p>
            ) : (
              data.topExpenses.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-4 py-3 border-t border-gray-50 first:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.category}</p>
                  </div>
                  <p className="text-sm font-medium text-red-600">-${t.amount.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}