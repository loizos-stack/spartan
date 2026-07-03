import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  const existing = await prisma.coach.count();
  if (existing > 0) return;

  const hashedPassword = await bcrypt.hash("password123", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@spartancoaching.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
      subscriptionPlan: "elite",
      subscriptionStatus: "active",
    },
  });

  const coaches = [
    {
      email: "nikos@spartancoaching.com",
      name: "Νίκος Παπαδόπουλος",
      bio: "Επαγγελματίας παίκτης πόκερ με 10+ χρόνια εμπειρία στα live και online τουρνουά. Ειδικός στο No-Limit Hold'em και MTT.",
      specialty: "MTT & Τουρνουά",
      earnings: "€2.5M+ συνολικά κέρδη",
      winRate: "+8.2bb/100",
    },
    {
      email: "maria@spartancoaching.com",
      name: "Μαρία Αντωνίου",
      bio: "Κορυφαία παίκτρια cash games με εξειδίκευση στο 6-max NLHE. Έχει εκπαιδεύσει εκατοντάδες μαθητές σε όλη την Ευρώπη.",
      specialty: "Cash Games & 6-max",
      earnings: "€1.8M+ συνολικά κέρδη",
      winRate: "+12.5bb/100",
    },
    {
      email: "kostas@spartancoaching.com",
      name: "Κώστας Γεωργίου",
      bio: "PLO ειδικός και αναλυτής του παιχνιδιού. Γνωστός για τις σε βάθος αναλύσεις hand history και την προχωρημένη θεωρία.",
      specialty: "PLO & Ανάλυση",
      earnings: "€3.1M+ συνολικά κέρδη",
      winRate: "+6.8bb/100",
    },
  ];

  for (const coachData of coaches) {
    const user = await prisma.user.create({
      data: {
        email: coachData.email,
        name: coachData.name,
        password: hashedPassword,
        role: "coach",
        subscriptionPlan: "elite",
        subscriptionStatus: "active",
      },
    });

    await prisma.coach.create({
      data: {
        userId: user.id,
        name: coachData.name,
        bio: coachData.bio,
        specialty: coachData.specialty,
        earnings: coachData.earnings,
        winRate: coachData.winRate,
        featured: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      },
    });
  }

  const allCoaches = await prisma.coach.findMany();

  const coursesData = [
    {
      title: "Βασικές Αρχές No-Limit Hold'em",
      description: "Μάθε τα πάντα για το NLHE από μηδέν. Ιδανικό για αρχάριους που θέλουν να χτίσουν γερές βάσεις.",
      category: "cash-game",
      level: "beginner",
      planRequired: "free",
      totalVideos: 12,
      totalHours: 6.5,
      rating: 4.8,
      enrollCount: 1250,
      coachId: allCoaches[0].id,
    },
    {
      title: "Προχωρημένη Στρατηγική MTT",
      description: "Βαθιά ανάλυση τουρνουά στρατηγικής: ICM, push/fold, bubble play και final table dynamics.",
      category: "tournament",
      level: "advanced",
      planRequired: "pro",
      isPremium: true,
      totalVideos: 24,
      totalHours: 18.0,
      rating: 4.9,
      enrollCount: 680,
      coachId: allCoaches[0].id,
    },
    {
      title: "6-Max Cash Game Mastery",
      description: "Κατακτήστε τα 6-max cash games με εις βάθος ανάλυση ranges, bet sizing και exploitative play.",
      category: "cash-game",
      level: "intermediate",
      planRequired: "basic",
      isPremium: true,
      totalVideos: 18,
      totalHours: 12.5,
      rating: 4.7,
      enrollCount: 920,
      coachId: allCoaches[1].id,
    },
    {
      title: "PLO για Αρχάριους",
      description: "Εισαγωγή στο Pot-Limit Omaha: βασικές αρχές, hand selection, και σύγκριση με NLHE.",
      category: "plo",
      level: "beginner",
      planRequired: "basic",
      totalVideos: 10,
      totalHours: 7.0,
      rating: 4.6,
      enrollCount: 540,
      coachId: allCoaches[2].id,
    },
    {
      title: "GTO vs Exploitative Play",
      description: "Κατανοήστε πότε να χρησιμοποιείτε GTO στρατηγική και πότε να εκμεταλλεύεστε τους αντιπάλους.",
      category: "cash-game",
      level: "advanced",
      planRequired: "pro",
      isPremium: true,
      totalVideos: 20,
      totalHours: 15.0,
      rating: 4.9,
      enrollCount: 750,
      coachId: allCoaches[1].id,
    },
    {
      title: "Spin & Go Στρατηγική",
      description: "Εξειδικευμένες τεχνικές για Spin & Go τουρνουά. Κέρδισε συνεχόμενα στα 3-handed υπερταχεία φορμά.",
      category: "spin-go",
      level: "intermediate",
      planRequired: "basic",
      totalVideos: 14,
      totalHours: 9.0,
      rating: 4.5,
      enrollCount: 430,
      coachId: allCoaches[0].id,
    },
  ];

  for (const courseData of coursesData) {
    const course = await prisma.course.create({ data: courseData });

    const videoCount = Math.min(courseData.totalVideos, 3);
    for (let i = 1; i <= videoCount; i++) {
      await prisma.video.create({
        data: {
          title: `Μάθημα ${i}: ${["Εισαγωγή", "Βασικές Αρχές", "Πρακτική Εφαρμογή"][i - 1]}`,
          description: `Λεπτομερής ανάλυση του ${i}ου μαθήματος.`,
          courseId: course.id,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          duration: 1800 + i * 300,
          order: i,
          isFree: i === 1,
          views: Math.floor(Math.random() * 5000) + 500,
        },
      });
    }
  }

  console.log("Database seeded successfully!");
}
