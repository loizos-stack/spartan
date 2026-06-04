import Link from "next/link";
import { Target, Heart, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e1b4b 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Η Ιστορία μας
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Το Spartan Coaching γεννήθηκε από παίκτες, για παίκτες.
            Η αποστολή μας είναι να κάνουμε την υψηλού επιπέδου εκπαίδευση πόκερ
            προσβάσιμη σε κάθε Έλληνα παίκτη.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-black text-white mb-4">
              <span style={{ color: "#d4af37" }}>Αποστολή</span> & Όραμα
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Ιδρύθηκε το 2024 από μια ομάδα αφοσιωμένων παικτών πόκερ που ήθελαν να δημιουργήσουν
              κάτι μοναδικό: μια ελληνική πλατφόρμα εκπαίδευσης που συνδυάζει υψηλής ποιότητας
              περιεχόμενο με εξατομικευμένη καθοδήγηση.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Πιστεύουμε ότι κάθε παίκτης, ανεξαρτήτως επιπέδου, μπορεί να γίνει κερδοφόρος
              με τη σωστή εκπαίδευση και αφοσίωση.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Οι coaches μας δεν είναι απλώς καλοί παίκτες — είναι δεινοί δάσκαλοι που ξέρουν
              πώς να μεταδίδουν τη γνώση τους με τρόπο κατανοητό και εφαρμόσιμο.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Target size={28} />, label: "Εστίαση στα Αποτελέσματα", desc: "Κάθε μάθημα σχεδιάζεται για άμεση εφαρμογή στο τραπέζι." },
              { icon: <Heart size={28} />, label: "Πάθος για το Παιχνίδι", desc: "Αγαπάμε το πόκερ και αυτό φαίνεται σε κάθε βίντεο." },
              { icon: <Users size={28} />, label: "Κοινότητα", desc: "Γίνε μέρος μιας ισχυρής κοινότητας παικτών." },
              { icon: <TrendingUp size={28} />, label: "Συνεχής Ανάπτυξη", desc: "Νέο περιεχόμενο κάθε εβδομάδα." },
            ].map((item) => (
              <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="mb-3" style={{ color: "#d4af37" }}>{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{item.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "2024", label: "Έτος Ίδρυσης" },
            { value: "3+", label: "Expert Coaches" },
            { value: "500+", label: "Ευτυχισμένοι Μαθητές" },
            { value: "100+", label: "Ώρες Περιεχόμενου" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-black mb-1" style={{ color: "#d4af37" }}>{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-2">
            Η <span style={{ color: "#d4af37" }}>Ομάδα</span> μας
          </h2>
          <p className="text-gray-400">Πίσω από κάθε επιτυχημένο φοιτητή, υπάρχει ένας αφοσιωμένος coach</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-10 rounded-3xl border" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)", borderColor: "rgba(212, 175, 55, 0.3)" }}>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Έλα να Γίνεις <span style={{ color: "#d4af37" }}>Spartan</span>
          </h2>
          <p className="text-gray-400 mb-6">Γίνε μέρος της οικογένειας μας και ξεκλείδωσε το πλήρες δυναμικό σου</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#030712" }}
          >
            Ξεκίνα Δωρεάν
          </Link>
        </div>
      </div>
    </div>
  );
}
