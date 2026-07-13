"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { updateInvoice } from "@/server/actions/invoice.actions"

interface Invoice {
  id: string
  title: string
  client: string
  amount: number
  status: string
  dueDate: Date
}

export function EditInvoiceButton({ invoice }: { invoice: Invoice }) {
  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await updateInvoice(invoice.id, formData)
    setOpen(false)
  }

  const formattedDate = new Date(invoice.dueDate).toISOString().split("T")[0]

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-gray-300 hover:text-blue-500 transition-colors p-1">
        <Pencil size={13} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-100 p-6 w-full max-w-md shadow-sm">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Edit invoice</h2>
            <form action={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Title</label>
                <input name="title" defaultValue={invoice.title} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Client</label>
                <input name="client" defaultValue={invoice.client} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                <input name="amount" type="number" defaultValue={invoice.amount} required min="0" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Due date</label>
                <input name="dueDate" type="date" defaultValue={formattedDate} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select name="status" defaultValue={invoice.status} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}