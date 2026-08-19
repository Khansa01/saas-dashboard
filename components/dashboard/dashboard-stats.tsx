"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { useCurrency } from "@/components/layout/currency-selector"
import { formatAmount } from "@/lib/currency"
import { TrendingUp, TrendingDown, Coins, FileText } from "lucide-react"

interface Props {
  revenue: number
  expenses: number
  profit: number
  pending: number
}

export const DashboardStats = ({ revenue, expenses, profit, pending }: Props) => {
  const currency = useCurrency()

  return (
    <div className="grid grid-cols-4 gap-3">
      <StatsCard label="Total revenue" value={formatAmount(revenue, currency.symbol)} change="+12.4% vs last month" trend="up" icon={TrendingUp} />
      <StatsCard label="Total expenses" value={formatAmount(expenses, currency.symbol)} change="+3.2% vs last month" trend="down" icon={TrendingDown} />
      <StatsCard label="Net profit" value={formatAmount(profit, currency.symbol)} change="+18.7% vs last month" trend="up" icon={Coins} />
      <StatsCard label="Pending invoices" value={String(pending)} change="2 new this week" trend="neutral" icon={FileText} />
    </div>
  )
}