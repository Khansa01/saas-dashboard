"use client"

import { formatAmount } from "@/lib/currency"
import { useCurrency } from "../layout/currency-selector"

interface TopTransaction {
  id: string
  description: string
  category: string
  amount: number
}

interface Props {
  avgTransaction?: number
  topIncome?: TopTransaction[]
  topExpenses?: TopTransaction[]
}

export const AnalyticsStats = ({ avgTransaction, topIncome, topExpenses }: Props) => {
  const currency = useCurrency()

  // Kalau dipake buat avg transaction card
  if (avgTransaction !== undefined) return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
        <span>Avg transaction</span>
      </div>
      <p className="text-xl font-medium text-gray-900">
        {formatAmount(avgTransaction, currency.symbol)}
      </p>
    </div>
  )

  // Kalau dipake buat dua tabel bawah
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Top income</p>
        </div>
        <div>
          {!topIncome?.length ? (
            <p className="text-sm text-gray-400 p-4">No income yet</p>
          ) : (
            topIncome.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-4 py-3 border-t border-gray-50 first:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.description}</p>
                  <p className="text-xs text-gray-400">{t.category}</p>
                </div>
                <p className="text-sm font-medium text-green-700">+{formatAmount(t.amount, currency.symbol)}</p>
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
          {!topExpenses?.length ? (
            <p className="text-sm text-gray-400 p-4">No expenses yet</p>
          ) : (
            topExpenses.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-4 py-3 border-t border-gray-50 first:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.description}</p>
                  <p className="text-xs text-gray-400">{t.category}</p>
                </div>
                <p className="text-sm font-medium text-red-600">-{formatAmount(t.amount, currency.symbol)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}