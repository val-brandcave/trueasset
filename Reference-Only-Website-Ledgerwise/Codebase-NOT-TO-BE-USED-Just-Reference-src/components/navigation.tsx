"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2, Users, Landmark, HardHat, BookOpen, HelpCircle, Shield, Menu, X } from "lucide-react";
import { ShinyBorder } from "./shiny-border";
import Link from "next/link";

type MegaMenuItem = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

type MegaMenuSection = {
  title: string;
  items: MegaMenuItem[];
  column?: "left" | "right";
};

type NavItem = {
  label: string;
  href?: string;
  megaMenu?: MegaMenuSection[];
};

const navItems: NavItem[] = [
  { label: "How it Works", href: "/how-it-works" },
  {
    label: "Solutions",
    megaMenu: [
      {
        title: "By Role",
        items: [
          { label: "For Builders", href: "/solutions/builders", description: "Streamline your construction finances", icon: <Building2 className="h-5 w-5" /> },
          { label: "For Project Owners", href: "/solutions/project-owners", description: "Complete visibility into your projects", icon: <Users className="h-5 w-5" /> },
          { label: "For Lenders", href: "/solutions/lenders", description: "Reduce risk with real-time insights", icon: <Landmark className="h-5 w-5" /> },
          { label: "For Subcontractors", href: "/solutions/subcontractors", description: "Get paid faster, track easier", icon: <HardHat className="h-5 w-5" /> },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    megaMenu: [
      {
        title: "Learn",
        column: "left",
        items: [
          { label: "Blog", href: "/blog", description: "Latest news and insights", icon: <BookOpen className="h-5 w-5" /> },
          { label: "Trust & Security", href: "/trust-security", description: "How we keep your data safe", icon: <Shield className="h-5 w-5" /> },
        ],
      },
      {
        title: "Support",
        column: "right",
        items: [
          { label: "FAQ", href: "/faq", description: "Common questions answered", icon: <HelpCircle className="h-5 w-5" /> },
        ],
      },
      {
        title: "Company",
        column: "right",
        items: [
          { label: "About", href: "/about", description: "Our story and mission", icon: <Building2 className="h-5 w-5" /> },
        ],
      },
    ],
  },
];

export function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenu(mobileSubmenu === label ? null : label);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="relative">
        <ShinyBorder orientation="horizontal" className="bottom-0" />

        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" onClick={() => { closeMenu(); closeMobileMenu(); }}>
              <img src="/logo-light.svg" alt="Ledgerwise" className="h-5 md:h-6" />
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm text-[#71717a] hover:text-[#18181b] transition-colors rounded-full hover:bg-[#18181b]/5"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm transition-colors rounded-full ${
                        openMenu === item.label
                          ? 'bg-[#18181b]/10 text-[#18181b]'
                          : 'text-[#71717a] hover:text-[#18181b] hover:bg-[#18181b]/5'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile Menu Button */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/contact"
                className="hidden md:block text-sm text-[#71717a] hover:text-[#18181b] transition-colors"
                onClick={() => { closeMenu(); closeMobileMenu(); }}
              >
                Contact
              </Link>
              <Link
                href="/request-access"
                className="px-4 py-2 md:px-5 text-xs md:text-sm font-medium text-white btn-brand-orange transition-colors"
                onClick={() => { closeMenu(); closeMobileMenu(); }}
              >
                Request Access
              </Link>
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-[#18181b]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Integrated Mega Menu */}
          <AnimatePresence mode="wait">
            {openMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: 'easeOut' }
                }}
                className="overflow-hidden border-t border-[#18181b]/10"
              >
                <div className="mx-auto max-w-7xl px-8 py-8">
                  {(() => {
                    const menu = navItems.find(item => item.label === openMenu)?.megaMenu;
                    if (!menu) return null;

                    const hasColumns = menu.some(s => s.column);

                    if (hasColumns) {
                      // Two-column layout for Resources
                      return (
                        <div className="grid grid-cols-2 gap-x-16">
                          <div className="space-y-3">
                            {menu.filter(s => s.column !== "right").map((section) => (
                              <div key={section.title}>
                                <div className="space-y-3">
                                  {section.items.map((menuItem) => (
                                    <Link
                                      key={menuItem.label}
                                      href={menuItem.href}
                                      className="flex items-start gap-3 group"
                                      onClick={closeMenu}
                                    >
                                      <span className="flex-shrink-0 text-[#18181b]/40 group-hover:text-[#18181b] transition-colors mt-0.5">
                                        {menuItem.icon}
                                      </span>
                                      <div>
                                        <span className="block text-sm font-medium text-[#18181b]">
                                          {menuItem.label}
                                        </span>
                                        {menuItem.description && (
                                          <p className="text-sm text-[#71717a]/60 mt-0.5">
                                            {menuItem.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-3">
                            {menu.filter(s => s.column === "right").map((section) => (
                              <div key={section.title}>
                                <div className="space-y-3">
                                  {section.items.map((menuItem) => (
                                    <Link
                                      key={menuItem.label}
                                      href={menuItem.href}
                                      className="flex items-start gap-3 group"
                                      onClick={closeMenu}
                                    >
                                      <span className="flex-shrink-0 text-[#18181b]/40 group-hover:text-[#18181b] transition-colors mt-0.5">
                                        {menuItem.icon}
                                      </span>
                                      <div>
                                        <span className="block text-sm font-medium text-[#18181b]">
                                          {menuItem.label}
                                        </span>
                                        {menuItem.description && (
                                          <p className="text-sm text-[#71717a]/60 mt-0.5">
                                            {menuItem.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      // Grid layout for Solutions (2 items per row)
                      return (
                        <div>
                          {menu.map((section) => (
                            <div key={section.title}>
                              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                {section.items.map((menuItem) => (
                                  <Link
                                    key={menuItem.label}
                                    href={menuItem.href}
                                    className="flex items-start gap-3 group"
                                    onClick={closeMenu}
                                  >
                                    <span className="flex-shrink-0 text-[#18181b]/40 group-hover:text-[#18181b] transition-colors mt-0.5">
                                      {menuItem.icon}
                                    </span>
                                    <div>
                                      <span className="block text-sm font-medium text-[#18181b]">
                                        {menuItem.label}
                                      </span>
                                      {menuItem.description && (
                                        <p className="text-sm text-[#71717a]/60 mt-0.5">
                                          {menuItem.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[#18181b]/10 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base text-[#18181b] hover:bg-[#18181b]/5 rounded-lg"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-base text-[#18181b] hover:bg-[#18181b]/5 rounded-lg"
                        >
                          {item.label}
                          <ChevronDown className={`h-5 w-5 text-[#71717a] transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenu === item.label && item.megaMenu && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {item.megaMenu.flatMap(section => section.items).map((menuItem) => (
                                  <Link
                                    key={menuItem.label}
                                    href={menuItem.href}
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#71717a] hover:text-[#18181b] hover:bg-[#18181b]/5 rounded-lg"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="text-[#18181b]/40">{menuItem.icon}</span>
                                    {menuItem.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
                {/* Mobile CTA */}
                <div className="pt-4 border-t border-[#18181b]/10 mt-4">
                  <Link
                    href="/request-access"
                    className="block w-full px-5 py-3 text-center text-sm font-medium text-white btn-brand-orange transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Request Access
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close */}
      {(openMenu || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { closeMenu(); closeMobileMenu(); }}
        />
      )}
    </nav>
  );
}
