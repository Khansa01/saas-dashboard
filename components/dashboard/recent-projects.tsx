import { DeleteButton } from "@/components/dashboard/delete-dialog"
import { EditButton } from "@/components/dashboard/edit-dialog"

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

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
        <p className="text-sm text-gray-400">No transactions yet</p>
        <p className="text-xs text-gray-300 mt-1">Add your first transaction above</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-900">Recent transactions</p>
        <button className="text-xs text-blue-600 hover:underline">View all →</button>
      </div>
      <div>
        <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-50">
          <div>Description</div>
          <div>Category</div>
          <div>Amount</div>
          <div>Status</div>
          <div></div>
        </div>
        {transactions.map((t) => (
          <div key={t.id} className="grid grid-cols-5 px-4 py-3 text-sm border-t border-gray-50 items-center">
            <div className="font-medium text-gray-900">{t.description}</div>
            <div className="text-gray-400 text-xs">{t.category}</div>
            <div className={`text-xs font-medium ${t.type === "in" ? "text-green-700" : "text-red-600"}`}>
              {t.type === "in" ? "+" : "-"}${t.amount.toLocaleString()}
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
    </div>
  )
}