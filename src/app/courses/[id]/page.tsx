import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Clock, Users, Play, Lock, ChevronRight, Award } from "lucide-react";
import { seedDatabase } from "@/lib/seed";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try { await seedDatabase(); } catch {}
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      coach: true,
      videos: { orderBy: { order: "asc" } },
    },
  });

  if (!course) notFound();

  const levelMap: Record<string, string> = {
    beginner: "Αρχάριοι",
    intermediate: "Ενδιάμεσο",
    advanced: "Προχωρημένοι",
  };

  const categoryMap: Record<string, string> = {
    "cash-game": "Cash Game",
    "tournament": "Τουρνουά",
    "plo": "PLO",
    "spin-go": "Spin & Go",
    "mtt": "MTT",
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Link href="/courses" className="hover:text-white transition-colors">Μαθήματα</Link>
                <ChevronRight size={14} />
                <span>{categoryMap[course.category] || course.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{course.title}</h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-white">{course.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">({course.enrollCount.toLocaleString("el")} εγγεγραμμένοι)</span>
                </div>
                <span className="text-gray-500">·</span>
                <span className="text-gray-300 text-sm">{levelMap[course.level] || course.level}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-300 text-sm">{course.totalVideos} βίντεο · {course.totalHours}ω</span>
              </div>

              {/* Coach */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  {course.coach.avatar ? (
                    <img src={course.coach.avatar} alt={course.coach.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold" style={{ color: "#d4af37" }}>
                      {course.coach.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Coach: {course.coach.name}</div>
                  <div className="text-gray-400 text-xs">{course.coach.specialty}</div>
                </div>
              </div>
            </div>

            {/* Right - Enrollment card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-gray-950 border border-gray-700 rounded-2xl overflow-hidden sticky top-20">
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={`https://picsum.photos/seed/${course.id}/640/360`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  {course.isPremium && (
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg" style={{ background: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                      <Lock size={16} style={{ color: "#d4af37" }} />
                      <span className="text-sm font-medium" style={{ color: "#d4af37" }}>
                        Απαιτεί {course.planRequired.toUpperCase()} συνδρομή
                      </span>
                    </div>
                  )}
                  <Link
                    href={course.isPremium ? "/pricing" : "#"}
                    className="w-full block text-center py-3 px-4 rounded-xl font-bold text-base mb-3 transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}
                  >
                    {course.isPremium ? "Αποκτήστε Πρόσβαση" : "Εγγραφή Δωρεάν"}
                  </Link>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Play size={14} /> {course.totalVideos} βίντεο μαθήματα
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} /> {course.totalHours} ώρες περιεχόμενο
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={14} /> Πιστοποιητικό ολοκλήρωσης
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} /> {course.enrollCount.toLocaleString("el")} εγγεγραμμένοι
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-white mb-6">Περιεχόμενο Μαθήματος</h2>

          <div className="space-y-3">
            {course.videos.map((video, index) => (
              <div
                key={video.id}
                className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: "rgba(212, 175, 55, 0.1)", color: "#d4af37" }}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-sm truncate">{video.title}</h3>
                    {video.isFree && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                        Δωρεάν
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{video.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-500 text-xs">{Math.floor(video.duration / 60)}λ</span>
                  {video.isFree ? (
                    <Play size={16} className="text-green-400" />
                  ) : (
                    <Lock size={14} className="text-gray-600" />
                  )}
                </div>
              </div>
            ))}
            {course.totalVideos > course.videos.length && (
              <div className="text-center py-4 text-gray-500 text-sm">
                + {course.totalVideos - course.videos.length} ακόμα βίντεο με συνδρομή
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
