export const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "IDR", symbol: "Rp" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "SGD", symbol: "S$" },
]

export type Currency = (typeof CURRENCIES)[number]

export const formatAmount = (amount: number, symbol: string): string => {
  const code = CURRENCIES.find(c => c.symbol === symbol)?.code ?? "USD"
  
  if (code === "IDR") {
    return `${symbol}${amount.toLocaleString("id-ID")}`
  }
  
  return `${symbol}${amount.toLocaleString("en-US")}`
}
