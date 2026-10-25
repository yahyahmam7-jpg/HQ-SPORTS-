import React from 'react';
import { AthleteUser, Language } from '../types';
import { translations } from '../translations';
import { 
  Trophy, 
  Activity, 
  Flame, 
  Compass, 
  Shield, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  Target, 
  Zap, 
  ChevronRight,
  Edit3,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface PlayerProfileProps {
  athlete: AthleteUser;
  athletes: AthleteUser[];
  onSelectAthlete: (athlete: AthleteUser) => void;
  currentLang: Language;
  onEditInAdmin: (athlete: AthleteUser) => void;
  isAdmin: boolean;
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({
  athlete,
  athletes,
  onSelectAthlete,
  currentLang,
  onEditInAdmin,
  isAdmin
}) => {
  const t = translations[currentLang];
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Athlete Selector Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[#131722] border border-[#222a3a] rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="font-bold text-amber-400">{t.selectPlayerLabel}</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={athlete.id}
            onChange={(e) => {
              const found = athletes.find((a) => a.id === e.target.value);
              if (found) onSelectAthlete(found);
            }}
            className="flex-1 sm:flex-none bg-[#0c0e14] border border-[#293347] text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
          >
            {athletes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.club} ({a.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'})
              </option>
            ))}
          </select>

          {isAdmin && (
            <button
              onClick={() => onEditInAdmin(athlete)}
              className="px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.editStatsAsAdmin}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-[#1c2232] border border-[#2c374b] text-slate-300 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
            title={t.shareProfile}
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Profile Dossier Card */}
      <div className="bg-[#141824] border border-[#232c3f] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-start">
          {/* Avatar with golden sports crest */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 shadow-xl shadow-amber-500/20">
              <img
                src={athlete.photo}
                alt={athlete.name}
                className="w-full h-full rounded-[14px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200';
                }}
              />
            </div>
            {athlete.jerseyNumber && (
              <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-black text-amber-400 font-black text-sm border-2 border-amber-500 flex items-center justify-center shadow-lg">
                #{athlete.jerseyNumber}
              </span>
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                {athlete.sport === 'soccer' ? '⚽ كرة قدم / Soccer' : '🤾 كرة يد / Handball'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-[#1f2638] text-slate-300 border border-[#2d3850]">
                {athlete.position}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {athlete.name}
            </h1>

            <p className="text-sm font-semibold text-slate-300 mb-3 flex items-center justify-center md:justify-start gap-1.5">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{athlete.club}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{athlete.address}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="tabular-nums font-mono">{athlete.phone}</span>
              </span>
            </div>
          </div>

          {/* Quick Rating Badge */}
          <div className="p-4 rounded-2xl bg-[#0c0f16] border border-[#252f43] text-center shrink-0 w-36">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.statRating}
            </span>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 tabular-nums">
              {athlete.stats.rating}
              <span className="text-xs text-slate-500 font-normal"> / 10</span>
            </div>
            <div className="w-full bg-[#1b2232] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                style={{ width: `${(athlete.stats.rating / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Stat Cards (Matching prompt's core metrics) */}
      <div>
        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4" />
          <span>{t.statsHeader}</span>
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Matches */}
          <div className="bg-[#131722] border border-[#212a3b] p-4 sm:p-5 rounded-2xl text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums block mb-1">
              {athlete.stats.matches}
            </span>
            <p className="text-xs font-semibold text-slate-300">{t.statMatches}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">HQ Analyzed Sessions</span>
          </div>

          {/* Card 2: Goals / Contributions */}
          <div className="bg-[#131722] border border-[#212a3b] p-4 sm:p-5 rounded-2xl text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums block mb-1">
              {athlete.stats.goals}
              {athlete.stats.assists > 0 && (
                <span className="text-base font-bold text-slate-400"> +{athlete.stats.assists}</span>
              )}
            </span>
            <p className="text-xs font-semibold text-slate-300">{t.statGoals}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {athlete.sport === 'soccer' ? 'Goals & Assists' : 'Points & Key Passes'}
            </span>
          </div>

          {/* Card 3: Overall Rating */}
          <div className="bg-[#131722] border border-[#212a3b] p-4 sm:p-5 rounded-2xl text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 tabular-nums block mb-1">
              {athlete.stats.rating}
            </span>
            <p className="text-xs font-semibold text-slate-300">{t.statRating}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Scale out of 10.0</span>
          </div>

          {/* Card 4: Stamina & Physical Fitness */}
          <div className="bg-[#131722] border border-[#212a3b] p-4 sm:p-5 rounded-2xl text-center shadow-lg hover:border-amber-500/40 transition-colors">
            <span className="text-3xl sm:text-4xl font-black text-sky-400 tabular-nums block mb-1">
              {athlete.stats.stamina}%
            </span>
            <p className="text-xs font-semibold text-slate-300">{t.statStamina}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">GPS Workload Capacity</span>
          </div>
        </div>
      </div>

      {/* Advanced Technical Radar & Breakdown Bars */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>
            {currentLang === 'ar' ? 'مؤشرات الأداء التكتيكي والبدني المفصلة' : 'Advanced Technical & Physical Metrics'}
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sprint Speed */}
          <div className="p-3.5 rounded-xl bg-[#0c0f16] border border-[#1f2738]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">{t.statSpeed}</span>
              <span className="font-mono font-bold text-amber-400 tabular-nums">
                {athlete.stats.speedKmH} km/h
              </span>
            </div>
            <div className="w-full bg-[#171d2b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${Math.min(100, (athlete.stats.speedKmH / 36) * 100)}%` }}
              />
            </div>
          </div>

          {/* Pass Accuracy */}
          <div className="p-3.5 rounded-xl bg-[#0c0f16] border border-[#1f2738]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">{t.statPassAccuracy}</span>
              <span className="font-mono font-bold text-emerald-400 tabular-nums">
                {athlete.stats.passAccuracy}%
              </span>
            </div>
            <div className="w-full bg-[#171d2b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${athlete.stats.passAccuracy}%` }}
              />
            </div>
          </div>

          {/* Duels Won */}
          <div className="p-3.5 rounded-xl bg-[#0c0f16] border border-[#1f2738]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">{t.statDuels}</span>
              <span className="font-mono font-bold text-sky-400 tabular-nums">
                {athlete.stats.duelsWon}%
              </span>
            </div>
            <div className="w-full bg-[#171d2b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full"
                style={{ width: `${athlete.stats.duelsWon}%` }}
              />
            </div>
          </div>

          {/* Tactical Discipline */}
          <div className="p-3.5 rounded-xl bg-[#0c0f16] border border-[#1f2738]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">{t.statTactical}</span>
              <span className="font-mono font-bold text-purple-400 tabular-nums">
                {athlete.stats.tacticalDiscipline}%
              </span>
            </div>
            <div className="w-full bg-[#171d2b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-400 h-full rounded-full"
                style={{ width: `${athlete.stats.tacticalDiscipline}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Certified Match History & Analysis Reports */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{t.matchHistoryTitle}</span>
        </h4>

        {athlete.matchHistory.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">{t.emptyMatchHistory}</p>
        ) : (
          <div className="space-y-3.5">
            {athlete.matchHistory.map((match) => (
              <div
                key={match.id}
                className="p-4 rounded-xl bg-[#0d1017] border border-[#1f2638] space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b2130] pb-2.5">
                  <div>
                    <span className="text-xs font-bold text-white">
                      {t.vsOpponent} {match.opponent}
                    </span>
                    <span className="text-[11px] text-slate-400 block sm:inline sm:ms-2">
                      ({match.date})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#171d2c] text-amber-300 border border-[#29344c]">
                      {match.score}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ⭐ {match.rating} / 10
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{match.minutesPlayed} {t.minutes}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-amber-400/90 font-semibold block mb-0.5">
                    {t.coachFeedback}
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {match.coachNotes}
                  </p>
                </div>

                {match.keyMetric && (
                  <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <Target className="w-3.5 h-3.5 shrink-0" />
                    <span>{match.keyMetric}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
