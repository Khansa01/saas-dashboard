import { getTransactions } from "@/server/queries/transaction.queries"
import { AddTransactionForm } from "@/components/dashboard/project-form"
import { DeleteButton } from "@/components/dashboard/delete-dialog"
import { EditButton } from "@/components/dashboard/edit-dialog"
import { TransactionFilters } from "@/components/dashboard/transaction-filters"
import { Suspense } from "react"

const statusStyle: Record<string, string> = {
  Completed: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Failed: "bg-red-50 text-red-800",
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const allTransactions = await getTransactions()
  const params = await searchParams

  const filtered = allTransactions.filter((t) => {
    const matchStatus =
      !params.status || params.status === "All"
        ? true
        : t.status === params.status

    const matchSearch = !params.search
      ? true
      : t.description.toLowerCase().includes(params.search.toLowerCase())

    return matchStatus && matchSearch
  })

  const totalIn = allTransactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalOut = allTransactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {allTransactions.length} transactions total
          </p>
        </div>
        <AddTransactionForm />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total transactions</p>
          <p className="text-xl font-medium text-gray-900">{allTransactions.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total income</p>
          <p className="text-xl font-medium text-green-700">+${totalIn.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total expenses</p>
          <p className="text-xl font-medium text-red-600">-${totalOut.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">All transactions</p>
        </div>

        <Suspense>
          <TransactionFilters />
        </Suspense>

        {filtered.length === 0 ? (
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
            {filtered.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-5 px-4 py-3 text-sm border-t border-gray-50 items-center hover:bg-gray-50 transition-colors"
              >
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
        )}
      </div>
    </div>
  )
}