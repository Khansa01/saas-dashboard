"use client"

import { signOut } from "next-auth/react"

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
    >
      Logout
    </button>
  )
}