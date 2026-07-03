"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Οι κωδικοί δεν ταιριάζουν");
      return;
    }
    if (form.password.length < 8) {
      setError("Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Σφάλμα εγγραφής");
      } else {
        router.push("/login?registered=1");
      }
    } catch {
      setError("Σφάλμα σύνδεσης");
    }
    setLoading(false);
  };

  const strengthChecks = [
    { label: "8+ χαρακτήρες", ok: form.password.length >= 8 },
    { label: "Κεφαλαίο γράμμα", ok: /[A-Z]/.test(form.password) },
    { label: "Αριθμός", ok: /\d/.test(form.password) },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)" }}>
              <span className="text-gray-950 font-black text-base">S</span>
            </div>
            <span className="font-bold text-xl">
              <span style={{ color: "#d4af37" }}>SPARTAN</span>
              <span className="text-white"> COACHING</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-white">Δημιουργία Λογαριασμού</h1>
          <p className="text-gray-400 text-sm mt-1">Ξεκίνα δωρεάν σήμερα</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Ονοματεπώνυμο</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Γιώργος Παπαδόπουλος"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="το@email.σου"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Κωδικός</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-3 mt-2">
                  {strengthChecks.map((c) => (
                    <div key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? "text-green-400" : "text-gray-600"}`}>
                      <Check size={10} />
                      {c.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Επιβεβαίωση Κωδικού</label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm"
              />
            </div>

            <div className="text-xs text-gray-500">
              Με την εγγραφή σου αποδέχεσαι τους{" "}
              <Link href="/terms" className="underline hover:text-white" style={{ color: "#d4af37" }}>Όρους Χρήσης</Link>
              {" "}και την{" "}
              <Link href="/privacy" className="underline hover:text-white" style={{ color: "#d4af37" }}>Πολιτική Απορρήτου</Link>.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}
            >
              {loading ? "Εγγραφή..." : (<><UserPlus size={18} /> Δημιουργία Λογαριασμού</>)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Έχεις ήδη λογαριασμό;{" "}
              <Link href="/login" className="font-semibold" style={{ color: "#d4af37" }}>
                Σύνδεση
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
