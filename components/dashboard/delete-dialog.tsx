"use client"

import { deleteTransaction } from "@/server/actions/transaction.actions"
import { Trash2 } from "lucide-react"

export function DeleteButton({ id }: { id: string }) {
  return (
    <button
      onClick={async () => {
        await deleteTransaction(id)
      }}
      className="text-gray-300 hover:text-red-500 transition-colors p-1"
    >
      <Trash2 size={13} />
    </button>
  )
}