import { getCurrency } from "@/server/actions/user.actions"
import { CurrencySelector } from "@/components/layout/currency-selector"
import { CURRENCIES } from "@/lib/currency"

export const Navbar = async () => {
  const savedCode = await getCurrency()
  const saved = CURRENCIES.find(c => c.code === savedCode) ?? CURRENCIES[0]

  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
      <p className="text-xs text-gray-400">FinTrack</p>
      <CurrencySelector initialCurrency={saved} />
    </nav>
  )
}