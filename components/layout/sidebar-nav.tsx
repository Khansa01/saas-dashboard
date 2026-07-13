"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart2,
  ArrowLeftRight,
  FileText,
  Users,
  Settings,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
]

const bottomItems = [
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      <p className="px-4 pt-3 pb-1 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
        Main
      </p>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-800 font-medium border-l-2 border-blue-600 pl-[14px]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        )
      })}

      <p className="px-4 pt-4 pb-1 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
        Account
      </p>
      {bottomItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-800 font-medium border-l-2 border-blue-600 pl-[14px]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        )
      })}
    </>
  )
}