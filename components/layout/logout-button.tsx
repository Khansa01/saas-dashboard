"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
    >
      <LogOut size={13} />
    </button>
  )
}