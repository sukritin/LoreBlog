'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Calendar, Menu, X } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Image from 'next/image'

const navItems = [
  { name: 'Features', href: 'https://www.lorememory.com/features' },
  { name: 'Use Cases', href: 'https://www.lorememory.com/use-cases' },
  { name: 'Integrations', href: 'https://www.lorememory.com/integrations' },
]

export default function Navigation() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav
        className="sticky top-0 right-0 left-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: '#0D0F14', borderColor: '#1F2937' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative h-16 w-16 flex-shrink-0 lg:h-20 lg:w-20">
                <Image
                  src="/static/images/logo.webp"
                  alt="Lore Logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="text-3xl font-bold transition-colors" style={{ color: '#FFFFFF' }}>
                Lore.
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-md relative font-semibold transition-colors"
                  style={{
                    color: pathname === item.href ? '#2EAE63' : '#F9FAFB',
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.color = '#2EAE63'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.color = '#F9FAFB'
                    }
                  }}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span
                      className="absolute right-0 -bottom-7 left-0 h-1"
                      style={{ backgroundColor: '#2EAE63' }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden items-center gap-4 lg:flex">
              <div className="rainbow-border-wrapper">
                <Button
                  variant="ghost"
                  style={{ color: '#F9FAFB' }}
                  className="rounded-lg bg-[#0D0F14] hover:opacity-80"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Demo
                </Button>
              </div>
              <Button
                className="rounded-lg text-sm text-white"
                style={{ backgroundColor: '#2EAE63' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4FCB7D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2EAE63')}
                onClick={() => {
                  const waitlist = document.getElementById('waitlist')
                  if (waitlist) {
                    waitlist.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    window.location.href = '/#waitlist'
                  }
                }}
              >
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              style={{ color: '#F9FAFB' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-t py-4 lg:hidden" style={{ borderColor: '#1F2937' }}>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium transition-colors"
                    style={{
                      color: pathname === item.href ? '#2EAE63' : '#F9FAFB',
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.color = '#2EAE63'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.color = '#F9FAFB'
                      }
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div
                  className="flex flex-col gap-3 border-t pt-4"
                  style={{ borderColor: '#1F2937' }}
                >
                  <div className="rainbow-border-wrapper w-full">
                    <Button
                      variant="outline"
                      className="w-full rounded-lg bg-[#0D0F14]"
                      style={{ color: '#F9FAFB', borderColor: 'transparent' }}
                      onClick={() => {
                        setIsDemoModalOpen(true)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Demo
                    </Button>
                  </div>
                  <Button
                    className="w-full rounded-lg text-sm text-white"
                    style={{ backgroundColor: '#2EAE63' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4FCB7D')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2EAE63')}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      const waitlist = document.getElementById('waitlist')
                      if (waitlist) {
                        waitlist.scrollIntoView({ behavior: 'smooth' })
                      } else {
                        window.location.href = '/#waitlist'
                      }
                    }}
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <BookDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </>
  )
}
