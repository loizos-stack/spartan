"use client";

import { useEffect, useState } from "react";
import { Star, Award, TrendingUp } from "lucide-react";

interface Coach {
  id: string;
  name: string;
  bio: string;
  specialty: string;
  avatar: string | null;
  earnings: string | null;
  winRate: string | null;
  courses: { id: string; title: string; enrollCount: number; rating: number }[];
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coaches")
      .then((r) => r.json())
      .then((data) => { setCoaches(data); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Φόρτωση...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Οι <span style={{ color: "#d4af37" }}>Coaches</span> μας
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Επαγγελματίες πόκερ με εκατομμύρια ευρώ σε κέρδη και αποδεδειγμένη εκπαιδευτική εμπειρία
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => {
            const avgRating = coach.courses.length > 0
              ? coach.courses.reduce((a, c) => a + c.rating, 0) / coach.courses.length
              : 0;
            const totalStudents = coach.courses.reduce((a, c) => a + c.enrollCount, 0);

            return (
              <div key={coach.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden card-hover">
                {/* Cover */}
                <div className="h-24 relative" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-900 bg-gray-700">
                      {coach.avatar ? (
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-black" style={{ color: "#d4af37" }}>
                          {coach.name[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-14 pb-6 px-6 text-center">
                  <h2 className="text-white font-black text-xl mb-1">{coach.name}</h2>
                  <p className="text-sm font-semibold mb-4" style={{ color: "#d4af37" }}>{coach.specialty}</p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{coach.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-center mb-1">
                        <Award size={16} style={{ color: "#d4af37" }} />
                      </div>
                      <div className="text-white font-bold text-sm">{coach.courses.length}</div>
                      <div className="text-gray-500 text-xs">Courses</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-center mb-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="text-white font-bold text-sm">{avgRating.toFixed(1)}</div>
                      <div className="text-gray-500 text-xs">Rating</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp size={16} className="text-green-400" />
                      </div>
                      <div className="text-white font-bold text-sm">{totalStudents.toLocaleString("el")}</div>
                      <div className="text-gray-500 text-xs">Μαθητές</div>
                    </div>
                  </div>

                  {/* Earnings */}
                  {(coach.earnings || coach.winRate) && (
                    <div className="flex justify-center gap-6 mb-6 text-sm">
                      {coach.earnings && (
                        <div className="text-center">
                          <div className="text-white font-bold">{coach.earnings}</div>
                          <div className="text-gray-500 text-xs">Συνολικά Κέρδη</div>
                        </div>
                      )}
                      {coach.winRate && (
                        <div className="text-center">
                          <div className="text-green-400 font-bold">{coach.winRate}</div>
                          <div className="text-gray-500 text-xs">Win Rate</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Courses */}
                  {coach.courses.length > 0 && (
                    <div className="border-t border-gray-800 pt-4 text-left">
                      <p className="text-gray-500 text-xs mb-2">Μαθήματα:</p>
                      {coach.courses.slice(0, 2).map((c) => (
                        <p key={c.id} className="text-gray-300 text-xs py-1 border-b border-gray-800/50 last:border-0 truncate">
                          • {c.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
