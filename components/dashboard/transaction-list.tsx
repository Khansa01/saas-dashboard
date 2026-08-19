"use client"

import { DeleteButton } from "@/components/dashboard/delete-dialog"
import { EditButton } from "@/components/dashboard/edit-dialog"
import {  useCurrency } from "@/components/layout/currency-selector"
import { formatAmount } from "@/lib/currency"

interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: string
  status: string
}

const statusStyle: Record<string, string> = {
  Completed: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Failed: "bg-red-50 text-red-800",
}

export const TransactionList = ({ transactions, totalIn, totalOut }: {
  transactions: Transaction[]
  totalIn: number
  totalOut: number
}) => {
  const currency = useCurrency()

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total transactions</p>
          <p className="text-xl font-medium text-gray-900">{transactions.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total income</p>
          <p className="text-xl font-medium text-green-700">+{formatAmount(totalIn, currency.symbol)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total expenses</p>
          <p className="text-xl font-medium text-red-600">-{formatAmount(totalOut, currency.symbol)}</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-400">No transactions found</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-50">
            <div>Description</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Status</div>
            <div></div>
          </div>
          {transactions.map((t) => (
            <div key={t.id} className="grid grid-cols-5 px-4 py-3 text-sm border-t border-gray-50 items-center hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">{t.description}</div>
              <div className="text-gray-400 text-xs">{t.category}</div>
              <div className={`text-xs font-medium ${t.type === "in" ? "text-green-700" : "text-red-600"}`}>
                {t.type === "in" ? "+" : "-"}{formatAmount(t.amount, currency.symbol)}
              </div>
              <div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusStyle[t.status]}`}>
                  {t.status}
                </span>
              </div>
              <div className="flex justify-end gap-1">
                <EditButton transaction={t} />
                <DeleteButton id={t.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}