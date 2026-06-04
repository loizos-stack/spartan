"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut, BookOpen, Settings } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: "/courses", label: "Μαθήματα" },
    { href: "/coaches", label: "Coaches" },
    { href: "/pricing", label: "Τιμές" },
    { href: "/about", label: "Σχετικά" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)" }}>
              <span className="text-gray-950 font-black text-sm">S</span>
            </div>
            <span className="font-bold text-lg">
              <span style={{ color: "#d4af37" }}>SPARTAN</span>
              <span className="text-white"> COACHING</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}>
                    {session.user?.name?.[0] || "U"}
                  </div>
                  <span className="text-gray-200">{session.user?.name?.split(" ")[0]}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => setUserMenuOpen(false)}>
                      <BookOpen size={15} /> Τα Μαθήματά μου
                    </Link>
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => setUserMenuOpen(false)}>
                      <User size={15} /> Προφίλ
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => setUserMenuOpen(false)}>
                      <Settings size={15} /> Ρυθμίσεις
                    </Link>
                    <div className="border-t border-gray-700" />
                    <button onClick={() => signOut()} className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition-colors">
                      <LogOut size={15} /> Αποσύνδεση
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-2">
                  Σύνδεση
                </Link>
                <Link href="/register" className="text-sm font-semibold px-4 py-2 rounded-lg transition-all" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}>
                  Εγγραφή
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-300">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block text-gray-300 hover:text-white py-2 font-medium" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-700 pt-3 flex flex-col gap-2">
            {session ? (
              <button onClick={() => signOut()} className="text-left text-red-400 py-2">Αποσύνδεση</button>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 py-2" onClick={() => setMobileOpen(false)}>Σύνδεση</Link>
                <Link href="/register" className="text-center py-2 rounded-lg font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }} onClick={() => setMobileOpen(false)}>Εγγραφή</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
