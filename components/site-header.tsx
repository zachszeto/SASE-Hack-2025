import Link from "next/link"
import { Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavLink = {
  href: string
  label: string
}

type SiteHeaderProps = {
  navLinks?: NavLink[]
  className?: string
  actionsClassName?: string
  navClassName?: string
  signInHref?: string
  ctaHref?: string
  ctaLabel?: string
}

export function SiteHeader({
  navLinks = [],
  className,
  actionsClassName,
  navClassName,
  signInHref = "/login",
  ctaHref = "/signup",
  ctaLabel = "Get Started",
}: SiteHeaderProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 text-slate-800 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-sm">
          <Camera className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-slate-900">LocalCollab</span>
      </Link>

      {navLinks.length > 0 && (
        <nav className={cn("flex items-center gap-6 text-sm font-medium text-slate-600", navClassName)}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <div className={cn("flex items-center gap-2 self-start sm:self-auto", actionsClassName)}>
        <Button variant="ghost" className="h-9 rounded-full px-4 text-sm" asChild>
          <Link href={signInHref}>Sign In</Link>
        </Button>
        <Button className="h-9 rounded-full bg-slate-900 px-4 text-sm text-white hover:bg-slate-800" asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  )
}
