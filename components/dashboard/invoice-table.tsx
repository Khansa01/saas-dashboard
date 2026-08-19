"use client"

import { formatAmount } from "@/lib/currency"
import { useCurrency } from "@/components/layout/currency-selector"
import { EditInvoiceButton } from "@/components/dashboard/edit-invoice-button"
import { deleteInvoice } from "@/server/actions/invoice.actions"
import { FileText } from "lucide-react"

const statusStyle: Record<string, string> = {
  Paid: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Overdue: "bg-red-50 text-red-800",
}

interface Invoice {
  id: string
  title: string
  client: string
  amount: number
  dueDate: Date
  status: string
}

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  const currency = useCurrency()

  if (invoices.length === 0) return (
    <div className="p-8 text-center">
      <FileText size={32} className="text-gray-200 mx-auto mb-2" />
      <p className="text-sm text-gray-400">No invoices yet</p>
      <p className="text-xs text-gray-300 mt-1">Create your first invoice above</p>
    </div>
  )

  return (
    <div>
      <div className="grid grid-cols-6 px-4 py-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-50">
        <div className="col-span-2">Title</div>
        <div>Client</div>
        <div>Amount</div>
        <div>Due date</div>
        <div>Status</div>
      </div>
      {invoices.map((invoice) => (
        <div key={invoice.id} className="grid grid-cols-6 px-4 py-3 text-sm border-t border-gray-50 items-center hover:bg-gray-50">
          <div className="col-span-2 font-medium text-gray-900">{invoice.title}</div>
          <div className="text-gray-400 text-xs">{invoice.client}</div>
          <div className="text-xs font-medium text-gray-900">{formatAmount(invoice.amount, currency.symbol)}</div>
          <div className="text-xs text-gray-400">
            {new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusStyle[invoice.status]}`}>
              {invoice.status}
            </span>
            <div className="flex gap-1">
            <EditInvoiceButton invoice={invoice} />
            <button
                onClick={() => deleteInvoice(invoice.id)}
                className="text-gray-300 hover:text-red-500 transition-colors p-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}