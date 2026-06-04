import Link from "next/link";
import { Star, Clock, Users, Lock, Play } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  coachName: string;
  coachAvatar?: string | null;
  category: string;
  level: string;
  totalVideos: number;
  totalHours: number;
  rating: number;
  enrollCount: number;
  isPremium: boolean;
  planRequired: string;
  thumbnail?: string | null;
}

const categoryLabels: Record<string, string> = {
  "cash-game": "Cash Game",
  "tournament": "Τουρνουά",
  "plo": "PLO",
  "spin-go": "Spin & Go",
  "mtt": "MTT",
};

const levelLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: "Αρχάριοι", color: "text-green-400 bg-green-400/10" },
  intermediate: { label: "Ενδιάμεσο", color: "text-yellow-400 bg-yellow-400/10" },
  advanced: { label: "Προχωρημένοι", color: "text-red-400 bg-red-400/10" },
};

export function CourseCard({
  id, title, description, coachName, coachAvatar,
  category, level, totalVideos, totalHours, rating,
  enrollCount, isPremium, planRequired, thumbnail,
}: CourseCardProps) {
  const levelInfo = levelLabels[level] || { label: level, color: "text-gray-400 bg-gray-400/10" };

  const thumbnailUrl = thumbnail || `https://picsum.photos/seed/${id}/640/360`;

  return (
    <Link href={`/courses/${id}`} className="block group">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden card-hover h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-gray-800">
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {isPremium && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-950/90 border px-2 py-1 rounded-md text-xs font-semibold" style={{ borderColor: "#d4af37", color: "#d4af37" }}>
              <Lock size={10} />
              PRO
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center play-btn">
              <Play size={20} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-xs bg-gray-950/80 text-gray-300 px-2 py-1 rounded">
              {categoryLabels[category] || category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>

          <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2 text-sm">
            {title}
          </h3>

          <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{description}</p>

          {/* Coach */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
              {coachAvatar ? (
                <img src={coachAvatar} alt={coachName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: "#d4af37" }}>
                  {coachName[0]}
                </div>
              )}
            </div>
            <span className="text-gray-400 text-xs">{coachName}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                {rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Users size={11} />
                {enrollCount.toLocaleString("el")}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {totalHours}ω · {totalVideos} βίντεο
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
