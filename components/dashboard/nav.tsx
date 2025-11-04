'use client'

import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { LogOut, Hammer, Home, Upload, Sparkles, Mic, Coins } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface DashboardNavProps {
  user: User
}

const navItems = [
  { href: '/dashboard-routes/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard-routes/upload', label: 'Upload', icon: Upload },
  { href: '/dashboard-routes/generate', label: 'Generate', icon: Sparkles },
  { href: '/dashboard-routes/brand-voice', label: 'Brand Voice', icon: Mic },
  { href: '/dashboard-routes/credits', label: 'Credits', icon: Coins },
]

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard-routes/dashboard" className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EchoForge</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      className={cn(
                        'gap-2',
                        isActive && 'bg-slate-100 dark:bg-slate-800'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

