"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import navigationData from "@/data/navigation.json"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"
  }`

  return (
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <img
                  src="/images/image.png"
                  alt="Safe Exam Browser"
                  className="h-10 w-10 transition-transform group-hover:rotate-12"
              />
              <span className="font-bold text-lg text-(--color-primary) dark:text-blue-400">Safe Exam Browser</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1">
                {navigationData.main.map((item, index) => {
                  const isActive = pathname === item.href
                  const isExternal = item.external

                  return (
                      <Link
                          key={item.id}
                          href={item.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              isActive
                                  ? "bg-(--color-primary) dark:bg-blue-600 text-white"
                                  : "text-(--color-gray) dark:text-gray-300 hover:bg-(--color-surface) dark:hover:bg-gray-800 hover:text-(--color-primary) dark:hover:text-blue-400"
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.label}
                        {isExternal && <span className="ml-1 text-xs">↗</span>}
                      </Link>
                  )
                })}
              </div>
            </div>

            {/* Mobile button */}
            <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2
                       text-(--color-gray) dark:text-gray-300 hover:bg-(--color-surface) dark:hover:bg-gray-800"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
            >
              {/* simple icon swap */}
              <span className="text-xl leading-none">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
            id="mobile-nav"
            className={`md:hidden overflow-hidden transition-all duration-300 ${
                mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 pb-4">
            <div className="mt-2 rounded-xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm p-2">
              {navigationData.main.map((item) => {
                const isActive = pathname === item.href
                const isExternal = item.external

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isActive
                                ? "bg-(--color-primary) dark:bg-blue-600 text-white"
                                : "text-(--color-gray) dark:text-gray-300 hover:bg-(--color-surface) dark:hover:bg-gray-800 hover:text-(--color-primary) dark:hover:text-blue-400"
                        }`}
                    >
                      <span>{item.label}</span>
                      {isExternal && <span className="text-sm">↗</span>}
                    </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
  )
}
