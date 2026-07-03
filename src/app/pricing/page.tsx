import Link from "next/link";
import { Check, Zap, Shield, Award, Star } from "lucide-react";

const plans = [
  {
    name: "Δωρεάν",
    price: "€0",
    period: "/μήνα",
    description: "Ιδανικό για να ξεκινήσεις και να δεις τι προσφέρουμε",
    features: [
      "Πρόσβαση σε δωρεάν μαθήματα",
      "Βασικά βίντεο για αρχάριους",
      "Πρόσβαση στο forum",
      "Newsletter με tips",
    ],
    cta: "Εγγραφή Δωρεάν",
    href: "/register",
    popular: false,
    color: "border-gray-700",
    icon: <Shield size={24} />,
  },
  {
    name: "Basic",
    price: "€19",
    period: "/μήνα",
    description: "Για σοβαρούς παίκτες που θέλουν να βελτιωθούν",
    features: [
      "Όλα τα δωρεάν μαθήματα",
      "100+ premium βίντεο μαθήματα",
      "Spin & Go & Cash Game courses",
      "Ανάλυση χεριών (2/εβδομάδα)",
      "Πρόσβαση σε quiz & exercises",
      "Email υποστήριξη",
    ],
    cta: "Ξεκίνα Basic",
    href: "/register?plan=basic",
    popular: false,
    color: "border-gray-700",
    icon: <Zap size={24} />,
  },
  {
    name: "Pro",
    price: "€49",
    period: "/μήνα",
    description: "Η πλήρης εμπειρία για αποφασισμένους παίκτες",
    features: [
      "Όλα τα Basic μαθήματα",
      "300+ premium βίντεο",
      "MTT & Tournament courses",
      "GTO & Advanced strategy",
      "Ανάλυση χεριών (10/εβδομάδα)",
      "Live Q&A sessions",
      "Discord community access",
      "Προτεραιότητα υποστήριξη",
    ],
    cta: "Ξεκίνα Pro",
    href: "/register?plan=pro",
    popular: true,
    color: "border-yellow-400/50",
    icon: <Award size={24} />,
  },
  {
    name: "Elite",
    price: "€99",
    period: "/μήνα",
    description: "Για παίκτες που θέλουν 1-on-1 coaching",
    features: [
      "Όλα τα Pro μαθήματα",
      "Απεριόριστη ανάλυση χεριών",
      "2 ώρες private coaching/μήνα",
      "Personalized training plan",
      "Database review",
      "Άμεση επικοινωνία με coach",
      "Lifetime access σε όλο το content",
      "VIP Discord channel",
    ],
    cta: "Ξεκίνα Elite",
    href: "/register?plan=elite",
    popular: false,
    color: "border-gray-700",
    icon: <Star size={24} />,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      {/* Header */}
      <div className="py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Επίλεξε το <span style={{ color: "#d4af37" }}>Πλάνο</span> σου
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ξεκίνα δωρεάν και αναβάθμισε όποτε θέλεις. Εγγύηση επιστροφής χρημάτων 30 ημερών.
        </p>

        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm mt-4">
          <Check size={14} />
          <span>Εξοικονόμησε 20% με ετήσιο πλάνο</span>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900 border-2 rounded-2xl overflow-hidden flex flex-col ${plan.color} ${plan.popular ? "shadow-2xl scale-105" : ""}`}
              style={plan.popular ? { boxShadow: "0 0 40px rgba(212, 175, 55, 0.2)" } : {}}
            >
              {plan.popular && (
                <div className="text-center py-2 text-xs font-bold text-gray-950" style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)" }}>
                  ⭐ ΠΙΟ ΔΗΜΟΦΙΛΕΣ
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4" style={{ color: plan.popular ? "#d4af37" : "#6b7280" }}>
                  {plan.icon}
                </div>

                <h2 className="text-xl font-black text-white mb-1">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 ${
                    plan.popular ? "text-gray-950" : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                  style={plan.popular ? { background: "linear-gradient(135deg, #d4af37, #f0d060)" } : {}}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Συχνές <span style={{ color: "#d4af37" }}>Ερωτήσεις</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "Μπορώ να ακυρώσω οποτεδήποτε;",
                a: "Ναι, μπορείτε να ακυρώσετε τη συνδρομή σας οποτεδήποτε. Δεν υπάρχουν δεσμεύσεις.",
              },
              {
                q: "Τι γίνεται αν δεν μείνω ικανοποιημένος;",
                a: "Προσφέρουμε εγγύηση επιστροφής χρημάτων 30 ημερών. Στείλτε μας email και θα σας επιστρέψουμε το ποσό.",
              },
              {
                q: "Μπορώ να αλλάξω πλάνο;",
                a: "Φυσικά! Μπορείτε να αναβαθμίσετε ή να υποβαθμίσετε το πλάνο σας οποιαδήποτε στιγμή.",
              },
              {
                q: "Είναι τα μαθήματα στα Ελληνικά;",
                a: "Ναι, όλα τα μαθήματα είναι στα Ελληνικά από Έλληνες επαγγελματίες coaches.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
