import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)" }}>
                <span className="text-gray-950 font-black text-sm">S</span>
              </div>
              <span className="font-bold text-lg">
                <span style={{ color: "#d4af37" }}>SPARTAN</span>
                <span className="text-white"> COACHING</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Η κορυφαία πλατφόρμα εκπαίδευσης πόκερ στην Ελλάδα. Μάθε από τους καλύτερους και ανέβα το επίπεδό σου.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors text-sm">Facebook</a>
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors text-sm">YouTube</a>
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors text-sm">Discord</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Πλατφόρμα</h4>
            <ul className="space-y-2">
              {[
                { href: "/courses", label: "Μαθήματα" },
                { href: "/coaches", label: "Coaches" },
                { href: "/pricing", label: "Συνδρομές" },
                { href: "/about", label: "Σχετικά μας" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Υποστήριξη</h4>
            <ul className="space-y-2">
              {[
                { href: "/faq", label: "Συχνές Ερωτήσεις" },
                { href: "/contact", label: "Επικοινωνία" },
                { href: "/terms", label: "Όροι Χρήσης" },
                { href: "/privacy", label: "Πολιτική Απορρήτου" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SpartanCoaching.com — Όλα τα δικαιώματα κατοχυρωμένα
          </p>
          <p className="text-gray-600 text-xs">
            18+ | Να παίζετε υπεύθυνα
          </p>
        </div>
      </div>
    </footer>
  );
}
