"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useCurrency } from "../layout/currency-selector"
import { formatAmount } from "@/lib/currency"

const COLORS = ["#378ADD", "#97C459", "#EF9F27", "#F09595", "#9B8DD4"]

interface CategoryData {
  name: string
  value: number
}

export const CategoryChart = ({ data }: { data: CategoryData[] }) => {
  const currency = useCurrency()

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900">Breakdown by category</p>
      <p className="text-xs text-gray-400 mt-0.5 mb-4">All time</p>
      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center">
          <p className="text-sm text-gray-400">No data yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatAmount(Number(value), currency.symbol), ""]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}