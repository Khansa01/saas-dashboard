import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
}

export function StatsCard({ label, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
        <Icon
          size={13}
          className={
            trend === "up"
              ? "text-blue-600"
              : trend === "down"
              ? "text-red-400"
              : "text-amber-500"
          }
        />
        {label}
      </div>
      <p className="text-xl font-medium text-gray-900">{value}</p>
      <p
        className={`text-xs mt-1 ${
          trend === "up"
            ? "text-green-700"
            : trend === "down"
            ? "text-red-600"
            : "text-gray-400"
        }`}
      >
        {change}
      </p>
    </div>
  )
}