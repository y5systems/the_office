"use client"

import { useApp } from "@/components/providers/app-provider"
import { PixelButton } from "@/components/ui/pixel-button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const { user } = useApp()
  const pathname = usePathname()

  if (!user) return null

  const navItems =
    user.role === "partner"
      ? [
          { href: "/partner", label: "Dashboard", icon: "🏢" },
          { href: "/partner/create", label: "Create Task", icon: "➕" },
          { href: "/profile", label: "Profile", icon: "👤" },
        ]
      : [
          { href: "/contributor", label: "Tasks", icon: "📋" },
          { href: "/contributor/my-tasks", label: "My Tasks", icon: "✅" },
          { href: "/profile", label: "Profile", icon: "👤" },
        ]

  return (
    <nav className="pixel-border bg-white p-2 mx-3 my-2 mb-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="pixel-font text-lg">
          TheOffice 🏢
        </Link>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <PixelButton variant={pathname === item.href ? "primary" : "secondary"} size="sm">
                {item.icon} {item.label}
              </PixelButton>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
