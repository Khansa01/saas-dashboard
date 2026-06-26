"use client"

import { useRef } from "react"
import { createTransaction } from "@/server/actions/transaction.actions"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddTransactionForm() {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    await createTransaction(formData)
    formRef.current?.reset()
    setOpen(false)
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={13} />
        Add transaction
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-100 p-6 w-full max-w-md shadow-sm">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Add transaction</h2>
            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description</label>
                <input
                  name="description"
                  placeholder="e.g. Stripe payout"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
                <select
                  name="category"
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
                  placeholder="0"
                  required
                  min="0"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type</label>
                <select
                  name="type"
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}