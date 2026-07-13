"use client"

import Link from "next/link"
import { SessionTimer } from "@/components/auth/session-timer"
import { LogoutButton } from "@/components/auth/logout-button"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
        <SessionTimer />
    </nav>
  )
}