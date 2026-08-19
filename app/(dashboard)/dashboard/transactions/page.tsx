import { getTransactions } from "@/server/queries/transaction.queries"
import { AddTransactionForm } from "@/components/dashboard/project-form"
import { TransactionFilters } from "@/components/dashboard/transaction-filters"
import { TransactionTable } from "@/components/dashboard/transaction-table"
import { getCurrency } from "@/server/actions/user.actions"
import { Suspense } from "react"
import { CURRENCIES, formatAmount } from "@/lib/currency"

export default async function TransactionsPage({ searchParams }: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const allTransactions = await getTransactions()
  const params = await searchParams
  const savedCode = await getCurrency()
  const currency = CURRENCIES.find(c => c.code === savedCode) ?? CURRENCIES[0]

  const filtered = allTransactions.filter((t) => {
    const matchStatus = !params.status || params.status === "All" ? true : t.status === params.status
    const matchSearch = !params.search ? true : t.description.toLowerCase().includes(params.search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalIn = allTransactions.filter((t) => t.type === "in").reduce((sum, t) => sum + t.amount, 0)
  const totalOut = allTransactions.filter((t) => t.type === "out").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-400 mt-0.5">{allTransactions.length} transactions total</p>
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
          <p className="text-xl font-medium text-green-700">+{formatAmount(totalIn, currency.symbol)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total expenses</p>
          <p className="text-xl font-medium text-red-600">-{formatAmount(totalOut, currency.symbol)}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">All transactions</p>
        </div>
        <Suspense>
          <TransactionFilters />
        </Suspense>
        <TransactionTable transactions={filtered} />
      </div>
    </div>
  )
}