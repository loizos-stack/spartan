"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Search, Filter } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  totalVideos: number;
  totalHours: number;
  rating: number;
  enrollCount: number;
  isPremium: boolean;
  planRequired: string;
  thumbnail: string | null;
  coach: { name: string; avatar: string | null };
}

const categories = [
  { value: "all", label: "Όλα" },
  { value: "cash-game", label: "Cash Game" },
  { value: "tournament", label: "Τουρνουά" },
  { value: "plo", label: "PLO" },
  { value: "spin-go", label: "Spin & Go" },
  { value: "mtt", label: "MTT" },
];

const levels = [
  { value: "all", label: "Όλα τα Επίπεδα" },
  { value: "beginner", label: "Αρχάριοι" },
  { value: "intermediate", label: "Ενδιάμεσο" },
  { value: "advanced", label: "Προχωρημένοι" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (level !== "all") params.set("level", level);

    fetch(`/api/courses?${params}`)
      .then((r) => r.json())
      .then((data) => { setCourses(data); setLoading(false); });
  }, [category, level]);

  const filtered = courses.filter((c) =>
    search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black text-white mb-2">
            Βιβλιοθήκη <span style={{ color: "#d4af37" }}>Μαθημάτων</span>
          </h1>
          <p className="text-gray-400 mb-6">Εκατοντάδες video μαθήματα από τους κορυφαίους επαγγελματίες</p>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Αναζήτηση μαθημάτων..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.value
                    ? "text-gray-950 font-bold"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                style={category === cat.value ? { background: "linear-gradient(135deg, #d4af37, #f0d060)" } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Filter size={16} className="text-gray-400" />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
            >
              {levels.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-6">{filtered.length} μαθήματα</p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Δεν βρέθηκαν μαθήματα</p>
            <p className="text-gray-600 text-sm mt-2">Δοκίμασε διαφορετική αναζήτηση</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                coachName={course.coach.name}
                coachAvatar={course.coach.avatar}
                category={course.category}
                level={course.level}
                totalVideos={course.totalVideos}
                totalHours={course.totalHours}
                rating={course.rating}
                enrollCount={course.enrollCount}
                isPremium={course.isPremium}
                planRequired={course.planRequired}
                thumbnail={course.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
