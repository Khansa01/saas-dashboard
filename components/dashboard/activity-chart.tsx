"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ChartData {
  month: string
  revenue: number
  expenses: number
}

export function RevenueChart({ data }: { data: ChartData[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
        <p className="text-sm text-gray-400">No chart data yet</p>
        <p className="text-xs text-gray-300 mt-1">Add transactions to see your revenue chart</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900">Revenue vs expenses</p>
      <p className="text-xs text-gray-400 mt-0.5 mb-4">Based on your transactions</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4}>
          <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="revenue" name="Revenue" fill="#378ADD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#E6F1FB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}