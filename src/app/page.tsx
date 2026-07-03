import Link from "next/link";
import { Star, Users, Play, Award, TrendingUp, Shield, ChevronRight } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
    await seedDatabase();
    const featuredCourses = await prisma.course.findMany({
      where: { published: true },
      include: { coach: { select: { name: true, avatar: true } } },
      orderBy: { enrollCount: "desc" },
      take: 6,
    });
    const coaches = await prisma.coach.findMany({
      where: { featured: true },
      take: 3,
    });
    const stats = {
      students: await prisma.user.count(),
      courses: await prisma.course.count({ where: { published: true } }),
      coaches: await prisma.coach.count(),
      videos: await prisma.video.count(),
    };
    return { featuredCourses, coaches, stats };
  } catch {
    return {
      featuredCourses: [],
      coaches: [],
      stats: { students: 500, courses: 12, coaches: 3, videos: 80 },
    };
  }
}

export default async function HomePage() {
  const { featuredCourses, coaches, stats } = await getHomeData();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e1b4b 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 rounded-full text-sm mb-6" style={{ color: "#d4af37" }}>
              <Star size={14} className="fill-current" />
              <span>#1 Πλατφόρμα Εκπαίδευσης Πόκερ στην Ελλάδα</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Γίνε{" "}
              <span style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Ανίκητος
              </span>
              {" "}στο Τραπέζι
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Μάθε πόκερ από τους κορυφαίους Έλληνες επαγγελματίες. Εκατοντάδες video μαθήματα,
              live coaching sessions και εξατομικευμένη ανάλυση χεριών.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
                style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712", boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
              >
                Ξεκίνα Δωρεάν <ChevronRight size={20} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <Play size={20} /> Δες τα Μαθήματα
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/10">
              {[
                { label: "Ενεργοί Παίκτες", value: `${stats.students.toLocaleString()}+` },
                { label: "Video Μαθήματα", value: `${stats.videos * 4}+` },
                { label: "Coaches", value: `${stats.coaches}+` },
                { label: "Αξιολόγηση", value: "4.9/5" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black" style={{ color: "#d4af37" }}>{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Γιατί να Επιλέξεις <span style={{ color: "#d4af37" }}>Spartan</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Η πλήρης εκπαίδευση που χρειάζεσαι για να γίνεις επικερδής παίκτης</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp size={28} />,
                title: "Αποδεδειγμένα Αποτελέσματα",
                desc: "Οι μαθητές μας αυξάνουν το win rate τους κατά μέσο όρο 45% μέσα στους πρώτους 3 μήνες.",
              },
              {
                icon: <Award size={28} />,
                title: "Κορυφαίοι Coaches",
                desc: "Μάθε από Έλληνες επαγγελματίες με εκατομμύρια κέρδη και αποδεδειγμένη εκπαιδευτική εμπειρία.",
              },
              {
                icon: <Shield size={28} />,
                title: "Εγγύηση Επιστροφής",
                desc: "30 ημέρες εγγύηση επιστροφής χρημάτων. Αν δεν μείνεις ευχαριστημένος, σου επιστρέφουμε τα χρήματα.",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(212, 175, 55, 0.1)", color: "#d4af37" }}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                Δημοφιλή <span style={{ color: "#d4af37" }}>Μαθήματα</span>
              </h2>
              <p className="text-gray-400">Τα πιο αγαπημένα μαθήματα από τους παίκτες μας</p>
            </div>
            <Link href="/courses" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-white transition-colors" style={{ color: "#d4af37" }}>
              Όλα τα μαθήματα <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
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

          <div className="text-center mt-10">
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all hover:bg-yellow-400/10" style={{ borderColor: "#d4af37", color: "#d4af37" }}>
              Δες Όλα τα Μαθήματα <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Coaches Preview */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Γνώρισε τους <span style={{ color: "#d4af37" }}>Coaches</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Επαγγελματίες με αποδεδειγμένη απόδοση και πάθος για τη διδασκαλία</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden card-hover text-center p-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-700">
                  {coach.avatar ? (
                    <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black" style={{ color: "#d4af37" }}>
                      {coach.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{coach.name}</h3>
                <p className="text-xs font-semibold mb-2" style={{ color: "#d4af37" }}>{coach.specialty}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{coach.bio}</p>
                <div className="flex justify-center gap-6 text-xs text-gray-500 mb-4">
                  <div>
                    <div className="font-bold text-white">{coach.earnings}</div>
                    <div>Κέρδη</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{coach.winRate}</div>
                    <div>Win Rate</div>
                  </div>
                </div>
                <Link href="/coaches" className="text-sm font-semibold py-2 px-4 rounded-lg transition-all hover:opacity-90 inline-block" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}>
                  Δες Προφίλ
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Τι Λένε οι <span style={{ color: "#d4af37" }}>Παίκτες μας</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Αλέξης Κ.",
                location: "Αθήνα",
                text: "Μέσα σε 2 μήνες βελτίωσα το win rate μου από -2bb/100 σε +6bb/100. Τα μαθήματα είναι εξαιρετικά!",
                rating: 5,
                plan: "Pro",
              },
              {
                name: "Σοφία Μ.",
                location: "Θεσσαλονίκη",
                text: "Η καλύτερη επένδυση που έκανα για το πόκερ μου. Ο Νίκος εξηγεί με απίστευτη σαφήνεια έννοιες που φαίνονταν πολύπλοκες.",
                rating: 5,
                plan: "Elite",
              },
              {
                name: "Δημήτρης Π.",
                location: "Πάτρα",
                text: "Από ερασιτέχνης που έχανε χρήματα, τώρα έχω κερδοφόρο μήνα. Spartan Coaching μόνο!",
                rating: 5,
                plan: "Basic",
              },
            ].map((review) => (
              <div key={review.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-gray-500 text-xs">{review.location}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(212, 175, 55, 0.1)", color: "#d4af37" }}>
                    {review.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-10 rounded-3xl border" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)", borderColor: "rgba(212, 175, 55, 0.3)" }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Έτοιμος να Ανεβάσεις <span style={{ color: "#d4af37" }}>Επίπεδο;</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Εγγράψου δωρεάν σήμερα και αποκτήστε πρόσβαση στα βασικά μαθήματα χωρίς κόστος.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}
              >
                Ξεκίνα Δωρεάν
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Δες τις Τιμές
              </Link>
            </div>
            <p className="text-gray-500 text-xs mt-6">Δεν απαιτείται πιστωτική κάρτα · 30 ημέρες εγγύηση επιστροφής χρημάτων</p>
          </div>
        </div>
      </section>
    </div>
  );
}
