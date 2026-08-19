"use client"

import { formatAmount } from "@/lib/currency"
import { useCurrency } from "@/components/layout/currency-selector"
import { CheckCircle, Clock, XCircle } from "lucide-react"

interface Props {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  invoices: { id: string; amount: number }[]
}

export const InvoiceAmounts = ({ totalPaid, totalPending, totalOverdue, invoices }: Props) => {
  const currency = useCurrency()

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <CheckCircle size={13} className="text-green-600" /> Paid
          </div>
          <p className="text-xl font-medium text-green-700">{formatAmount(totalPaid, currency.symbol)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Clock size={13} className="text-amber-500" /> Pending
          </div>
          <p className="text-xl font-medium text-amber-600">{formatAmount(totalPending, currency.symbol)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <XCircle size={13} className="text-red-500" /> Overdue
          </div>
          <p className="text-xl font-medium text-red-600">{formatAmount(totalOverdue, currency.symbol)}</p>
        </div>
      </div>
    </>
  )
}