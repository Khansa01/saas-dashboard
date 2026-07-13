import { auth } from "@/lib/auth"
import { SidebarNav } from "./sidebar-nav"
import { LogoutButton } from "./logout-button"

export async function Sidebar() {
  const session = await auth()
  const user = session?.user

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <aside className="w-52 flex-shrink-0 h-full bg-white border-r border-gray-100 flex flex-col">
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">FinTrack</p>
        <p className="text-xs text-gray-400 mt-0.5">Business analytics</p>
      </div>

      <nav className="flex-1 py-2">
        <SidebarNav />
      </nav>

      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[11px] font-medium text-blue-800 flex-shrink-0 overflow-hidden">
          {user?.image ? (
            <img 
              src={user.image} 
              alt={user.name ?? ""} 
              width={28}
              height={28}
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">{user?.name ?? "User"}</p>
          <p className="text-[10px] text-gray-400 truncate">{user?.email ?? ""}</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  )
}