"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { updateTransaction } from "@/server/actions/transaction.actions"

interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: string
  status: string
}

export function EditButton({ transaction }: { transaction: Transaction }) {
  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await updateTransaction(transaction.id, formData)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-300 hover:text-blue-500 transition-colors p-1"
      >
        <Pencil size={13} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-100 p-6 w-full max-w-md">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Edit transaction</h2>
            <form action={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description</label>
                <input
                  name="description"
                  defaultValue={transaction.description}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
                <select
                  name="category"
                  defaultValue={transaction.category}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Revenue</option>
                  <option>Operations</option>
                  <option>Marketing</option>
                  <option>Payroll</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                <input
                  name="amount"
                  type="number"
                  defaultValue={transaction.amount}
                  required
                  min="0"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type</label>
                <select
                  name="type"
                  defaultValue={transaction.type}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="in">Income</option>
                  <option value="out">Expense</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select
                  name="status"
                  defaultValue={transaction.status}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}