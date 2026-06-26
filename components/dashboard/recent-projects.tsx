const transactions = [
  { desc: "Stripe payout", category: "Revenue", amount: "+$12,400", status: "Completed", type: "in" },
  { desc: "AWS invoice", category: "Operations", amount: "-$2,340", status: "Completed", type: "out" },
  { desc: "Meta ads", category: "Marketing", amount: "-$1,800", status: "Pending", type: "out" },
  { desc: "Client payment", category: "Revenue", amount: "+$8,500", status: "Completed", type: "in" },
]

const statusStyle: Record<string, string> = {
  Completed: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Failed: "bg-red-50 text-red-800",
}

export function RecentTransactions() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-900">Recent transactions</p>
        <button className="text-xs text-blue-600 hover:underline">View all →</button>
      </div>
      <div>
        <div className="grid grid-cols-4 px-4 py-2 text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-50">
          <div>Description</div>
          <div>Category</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        {transactions.map((t, i) => (
          <div key={i} className="grid grid-cols-4 px-4 py-3 text-sm border-t border-gray-50 items-center">
            <div className="font-medium text-gray-900">{t.desc}</div>
            <div className="text-gray-400 text-xs">{t.category}</div>
            <div className={`text-xs font-medium ${t.type === "in" ? "text-green-700" : "text-red-600"}`}>
              {t.amount}
            </div>
            <div>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusStyle[t.status]}`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}