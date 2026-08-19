import { getInvoices } from "@/server/queries/invoice.queries"
import { AddInvoiceForm } from "@/components/dashboard/add-invoice-form"
import { InvoiceAmounts } from "@/components/dashboard/invoice-amounts"
import { InvoiceTable } from "@/components/dashboard/invoice-table"

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

      <InvoiceAmounts totalPaid={totalPaid} totalPending={totalPending} totalOverdue={totalOverdue} invoices={invoices} />

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">All invoices</p>
        </div>
        <InvoiceTable invoices={invoices} />
      </div>
    </div>
  )
}