"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Brand (clickable logo → home) */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Go to home" className="inline-flex items-center">
            <Image
              src="/logo-white.svg"
              alt="BroadCast Logo"
              width={20}
              height={20}
              className="h-10 w-10 invert"
            />
            <span className="ml-2 text-lg font-semibold tracking-tight text-slate-900">BroadCast</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-500 md:flex">

          {/* Map button (same style as nav items) */}
          <Link
            href="/map"
            className="rounded-full px-4 py-2 transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            Discover
          </Link>

          {/* For Businesses */}
          <div className="relative group">
            <span className="inline-flex cursor-default select-none items-center rounded-full px-4 py-2 text-slate-500 transition-colors group-hover:bg-rose-50 group-hover:text-rose-500">
              For Businesses
              <span className="ml-1 text-slate-400 transition-colors group-hover:text-rose-400">▾</span>
            </span>

            <div className="absolute left-0">
              <div className="h-3" />
              <div
                className="w-56 rounded-2xl border border-white/80 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur opacity-0 translate-y-1 transition-all duration-150
                           pointer-events-none
                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                role="menu"
                aria-label="For Businesses"
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="/business/dashboard"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      role="menuitem"
                    >
                      Business Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/creators"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      role="menuitem"
                    >
                      Browse Creators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      role="menuitem"
                    >
                      Post a Gig
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* For Creators */}
          <div className="relative group">
            <span className="inline-flex cursor-default select-none items-center rounded-full px-4 py-2 text-slate-500 transition-colors group-hover:bg-rose-50 group-hover:text-rose-500">
              For Creators
              <span className="ml-1 text-slate-400 transition-colors group-hover:text-rose-400">▾</span>
            </span>

            <div className="absolute left-0">
              <div className="h-3" />
              <div
                className="w-56 rounded-2xl border border-white/80 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur opacity-0 translate-y-1 transition-all duration-150
                           pointer-events-none
                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                role="menu"
                aria-label="For Creators"
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="/creators/profile"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      role="menuitem"
                    >
                      Creator Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketplace"
                      className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      role="menuitem"
                    >
                      Browse Gigs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Right side: profile icon link */}
        <div className="flex items-center gap-3">
          <Link
            href="/creators/profile"
            aria-label="Open profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-black-400 shadow-sm transition hover:border-rose-200 hover:text-black-500"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
