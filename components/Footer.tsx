'use client'

import Link from 'next/link'

const footerLinks = {
  Product: [
    { name: 'Features', href: 'https://www.lorememory.com/features' },
    { name: 'Use Cases', href: 'https://www.lorememory.com/use-cases' },
    { name: 'Integrations', href: 'https://www.lorememory.com/integrations' },
  ],
  Company: [
    { name: 'About', href: 'https://www.lorememory.com/about' },
    { name: 'Contact', href: 'https://www.lorememory.com/contact' },
  ],
  Legal: [
    { name: 'Terms', href: 'https://www.lorememory.com/terms' },
    { name: 'Privacy', href: 'https://www.lorememory.com/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ backgroundColor: '#0D0F14', borderColor: '#1F2937' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <h3 className="mb-3 text-2xl font-bold" style={{ color: '#2EAE63' }}>
                Lore.
              </h3>
              <p className="mb-4 max-w-sm text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                The memory layer for your organization
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 text-sm font-semibold" style={{ color: '#F9FAFB' }}>
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-sm transition-colors hover:opacity-80"
                        style={{ color: '#9CA3AF' }}
                      >
                        <span className="group-hover:[color:#2EAE63]">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t pt-8" style={{ borderColor: '#1F2937' }}>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                © 2025 Lore. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
