"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Λάθος email ή κωδικός. Δοκιμάστε: admin@spartancoaching.com / password123");
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
          <h1 className="text-2xl font-black text-white">Καλώς ήρθες πίσω!</h1>
          <p className="text-gray-400 text-sm mt-1">Σύνδεσε τον λογαριασμό σου</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm hover:text-white transition-colors" style={{ color: "#d4af37" }}>
                Ξέχασες τον κωδικό;
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}
            >
              {loading ? "Σύνδεση..." : (<><LogIn size={18} /> Σύνδεση</>)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Δεν έχεις λογαριασμό;{" "}
              <Link href="/register" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: "#d4af37" }}>
                Εγγραφή
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-400">
            <strong>Demo:</strong> admin@spartancoaching.com / password123
          </div>
        </div>
      </div>
    </div>
  );
}
