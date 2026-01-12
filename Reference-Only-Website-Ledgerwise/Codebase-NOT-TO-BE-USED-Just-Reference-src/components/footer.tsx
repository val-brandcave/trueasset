"use client";

import Link from "next/link";

const footerLinks = {
  solutions: {
    title: "Solutions",
    links: [
      { label: "For Builders", href: "/solutions/builders" },
      { label: "For Project Owners", href: "/solutions/project-owners" },
      { label: "For Lenders", href: "/solutions/lenders" },
      { label: "For Subcontractors", href: "/solutions/subcontractors" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Trust & Security", href: "/trust-security" },
      { label: "About", href: "/about" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "How it Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-brand-blue-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8 mb-10 md:mb-12">
          {/* Logo and tagline */}
          <div className="col-span-2">
            <Link href="/">
              <img src="/logo-light.svg" alt="Ledgerwise" className="h-6 md:h-7 brightness-0 invert" />
            </Link>
            <p className="text-white/60 mt-3 md:mt-4 text-xs md:text-sm leading-relaxed max-w-xs">
              Payment infrastructure for construction. Stop running a bank. Start running a business.
            </p>
            <Link
              href="/request-early-access"
              className="inline-block mt-4 md:mt-6 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-medium text-[#18181b] bg-white rounded-full hover:bg-[#f4f4f5] transition-colors"
            >
              Request Early Access
            </Link>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
              {footerLinks.solutions.title}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.solutions.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
              {footerLinks.resources.title}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.resources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
              {footerLinks.company.title}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
              {footerLinks.legal.title}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-white/60">
            {currentYear} LedgerWise. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-white/60">
            Licensed & Bonded Payment Infrastructure Provider
          </p>
        </div>
      </div>
    </footer>
  );
}
