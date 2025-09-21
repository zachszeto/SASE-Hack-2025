"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand (clickable logo → home) */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Go to home" className="inline-flex items-center">
            <Image
              src="/logo-white.svg"
              alt="BroadCast Logo"
              width={20}
              height={20}
              className="w-12 h-12 invert"
            />
            <span className="text-xl font-bold text-gray-900">BroadCast</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* For Businesses */}
          <div className="relative group">
            <span className="text-gray-600 group-hover:text-blue-600 transition-colors inline-flex items-center cursor-default select-none">
              For Businesses
              <span className="ml-1 text-gray-400 group-hover:text-blue-600 transition-colors">▾</span>
            </span>

            <div className="absolute left-0">
              <div className="h-3" />
              <div
                className="w-56 rounded-lg border border-gray-200 bg-white backdrop-blur-sm shadow-lg opacity-0 translate-y-1 transition-all duration-150
                           pointer-events-none
                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                role="menu"
                aria-label="For Businesses"
              >
                <ul className="py-2">
                <li>
                    <Link
                      href="/business/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      Business Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/creators"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      Browse Creators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
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
            <span className="text-gray-600 group-hover:text-blue-600 transition-colors inline-flex items-center cursor-default select-none">
              For Creators
              <span className="ml-1 text-gray-400 group-hover:text-blue-600 transition-colors">▾</span>
            </span>

            <div className="absolute left-0">
              <div className="h-3" />
              <div
                className="w-56 rounded-lg border border-gray-200 bg-white backdrop-blur-sm shadow-lg opacity-0 translate-y-1 transition-all duration-150
                           pointer-events-none
                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                role="menu"
                aria-label="For Creators"
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="/creators/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      Creator Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketplace"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
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

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/map">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
