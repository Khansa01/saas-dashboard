import { getInvoices } from "@/server/queries/invoice.queries"
import { deleteInvoice } from "@/server/actions/invoice.actions"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import { AddInvoiceForm } from "@/components/dashboard/add-invoice-form"
import { EditInvoiceButton } from "@/components/dashboard/edit-invoice-button"

const statusStyle: Record<string, string> = {
  Paid: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Overdue: "bg-red-50 text-red-800",
}

export default async function InvoicesPage() {
  const invoices = await getInvoices()

  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0)
  const totalPending = invoices.filter((i) => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0)
  const totalOverdue = invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-400 mt-0.5">{invoices.length} invoices total</p>
        </div>
        <AddInvoiceForm />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <CheckCircle size={13} className="text-green-600" /> Paid
          </div>
          <p className="text-xl font-medium text-green-700">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Clock size={13} className="text-amber-500" /> Pending
          </div>
          <p className="text-xl font-medium text-amber-600">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <XCircle size={13} className="text-red-500" /> Overdue
          </div>
          <p className="text-xl font-medium text-red-600">${totalOverdue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">All invoices</p>
        </div>

        {invoices.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No invoices yet</p>
            <p className="text-xs text-gray-300 mt-1">Create your first invoice above</p>
          </div>
        ) : (
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
                <div className="text-xs font-medium text-gray-900">${invoice.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-400">
                  {new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusStyle[invoice.status]}`}>
                    {invoice.status}
                  </span>
                  <div className="flex gap-1">
                    <EditInvoiceButton invoice={invoice} />
                    <form action={async () => {
                      "use server"
                      await deleteInvoice(invoice.id)
                    }}>
                      <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}