"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { updateCurrency } from "@/server/actions/user.actions"
import { CURRENCIES } from "@/lib/currency"

export type Currency = (typeof CURRENCIES)[number]

// Simple global state tanpa context biar simpel
let globalCurrency = CURRENCIES[0]
const listeners = new Set<() => void>()

export const  getCurrency = () => { return globalCurrency }
export const setCurrencyGlobal = (c: Currency) => {
  globalCurrency = c
  updateCurrency(c.code)
  listeners.forEach(fn => fn())
}

export const useCurrency = () => {
  const [, rerender] = useState(0)

  useEffect(() => {
    const listener = () => rerender(n => n + 1)
    listeners.add(listener)
    return () => { listeners.delete(listener) }
    }, [])

  return globalCurrency
}

export const CurrencySelector = ({ initialCurrency }: { initialCurrency: Currency }) => {
  const [open, setOpen] = useState(false)

  const [, rerender] = useState(() => {
    globalCurrency = initialCurrency
    return 0
  })

  const currency = useCurrency()

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 transition-colors"
      >
        <span className="text-gray-400">{currency.symbol}</span>
        <span>{currency.code}</span>
        <ChevronDown size={12} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-1">
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => { setCurrencyGlobal(c); setOpen(false) }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${c.code === currency.code ? "text-blue-600 font-medium" : "text-gray-700"}`}
              >
                <span className="w-5 text-gray-400">{c.symbol}</span>
                <span>{c.code}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
