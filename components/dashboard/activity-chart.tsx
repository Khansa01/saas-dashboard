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

const data = [
  { month: "Jan", revenue: 32000, expenses: 18000 },
  { month: "Feb", revenue: 38000, expenses: 21000 },
  { month: "Mar", revenue: 29000, expenses: 16000 },
  { month: "Apr", revenue: 43000, expenses: 24000 },
  { month: "May", revenue: 39000, expenses: 19000 },
  { month: "Jun", revenue: 48000, expenses: 21000 },
]

export function RevenueChart() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900">Revenue vs expenses</p>
      <p className="text-xs text-gray-400 mt-0.5 mb-4">Last 6 months</p>
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