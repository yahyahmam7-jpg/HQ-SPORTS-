import React, { useState, useEffect } from 'react';
import { AthleteUser, Language, MatchReport, FeedPost } from '../types';
import { translations } from '../translations';
import { 
  Sliders, 
  Save, 
  PlusCircle, 
  CheckCircle, 
  Megaphone, 
  Users, 
  ShieldAlert, 
  Activity, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminPanelProps {
  athletes: AthleteUser[];
  selectedAthleteId: string;
  onSelectAthleteId: (id: string) => void;
  onUpdateAthleteStats: (athleteId: string, updatedStats: AthleteUser['stats']) => void;
  onAddMatchReport: (athleteId: string, report: Omit<MatchReport, 'id'>) => void;
  onBroadcastPost: (post: Omit<FeedPost, 'id' | 'timestamp' | 'reactions' | 'userReactions' | 'comments'>) => void;
  currentLang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  athletes,
  selectedAthleteId,
  onSelectAthleteId,
  onUpdateAthleteStats,
  onAddMatchReport,
  onBroadcastPost,
  currentLang
}) => {
  const t = translations[currentLang];

  const currentAthlete = athletes.find((a) => a.id === selectedAthleteId) || athletes[0];

  // Stat form states
  const [matches, setMatches] = useState<number>(currentAthlete?.stats.matches || 0);
  const [goals, setGoals] = useState<number>(currentAthlete?.stats.goals || 0);
  const [assists, setAssists] = useState<number>(currentAthlete?.stats.assists || 0);
  const [rating, setRating] = useState<number>(currentAthlete?.stats.rating || 8.5);
  const [stamina, setStamina] = useState<number>(currentAthlete?.stats.stamina || 90);
  const [speedKmH, setSpeedKmH] = useState<number>(currentAthlete?.stats.speedKmH || 32);
  const [passAccuracy, setPassAccuracy] = useState<number>(currentAthlete?.stats.passAccuracy || 88);
  const [duelsWon, setDuelsWon] = useState<number>(currentAthlete?.stats.duelsWon || 75);
  const [tacticalDiscipline, setTacticalDiscipline] = useState<number>(
    currentAthlete?.stats.tacticalDiscipline || 90
  );

  // Match report form states
  const [matchOpponent, setMatchOpponent] = useState('');
  const [matchScore, setMatchScore] = useState('');
  const [matchRating, setMatchRating] = useState<number>(8.8);
  const [matchMinutes, setMatchMinutes] = useState<number>(90);
  const [matchGoals, setMatchGoals] = useState<number>(1);
  const [matchAssists, setMatchAssists] = useState<number>(0);
  const [matchKeyMetric, setMatchKeyMetric] = useState('');
  const [matchCoachNotes, setMatchCoachNotes] = useState('');

  // Broadcast announcement
  const [bulletinContent, setBulletinContent] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state whenever selected athlete changes
  useEffect(() => {
    if (currentAthlete) {
      setMatches(currentAthlete.stats.matches);
      setGoals(currentAthlete.stats.goals);
      setAssists(currentAthlete.stats.assists || 0);
      setRating(currentAthlete.stats.rating);
      setStamina(currentAthlete.stats.stamina);
      setSpeedKmH(currentAthlete.stats.speedKmH);
      setPassAccuracy(currentAthlete.stats.passAccuracy);
      setDuelsWon(currentAthlete.stats.duelsWon);
      setTacticalDiscipline(currentAthlete.stats.tacticalDiscipline);
    }
  }, [currentAthlete?.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAthlete) return;

    onUpdateAthleteStats(currentAthlete.id, {
      matches: Number(matches),
      goals: Number(goals),
      assists: Number(assists),
      rating: Number(rating),
      stamina: Number(stamina),
      speedKmH: Number(speedKmH),
      passAccuracy: Number(passAccuracy),
      duelsWon: Number(duelsWon),
      tacticalDiscipline: Number(tacticalDiscipline)
    });

    showToast(t.statsSavedSuccess);
  };

  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAthlete || !matchOpponent.trim()) return;

    onAddMatchReport(currentAthlete.id, {
      opponent: matchOpponent.trim(),
      date: new Date().toISOString().split('T')[0],
      score: matchScore.trim() || '2 - 1',
      rating: Number(matchRating),
      minutesPlayed: Number(matchMinutes),
      goalsOrPoints: Number(matchGoals),
      assists: Number(matchAssists),
      keyMetric:
        matchKeyMetric.trim() ||
        (currentAthlete.sport === 'soccer'
          ? '88% تمريرات صحيحة + مجهود بدني عالي'
          : '75% دقة تسديد + 5 صناعة أهداف'),
      coachNotes:
        matchCoachNotes.trim() ||
        (currentLang === 'ar'
          ? 'التزام فني ممتاز بالخطة التكتيكية وتطبيق دقيق لتعليمات الجهاز الفني.'
          : 'Superb tactical adherence and diligent application of the game plan.')
    });

    setMatchOpponent('');
    setMatchScore('');
    setMatchKeyMetric('');
    setMatchCoachNotes('');
    showToast(t.matchAddedSuccess);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinContent.trim()) return;

    onBroadcastPost({
      authorId: 'hq-mgmt',
      authorName: currentLang === 'ar' ? 'الجهاز الفني وإدارة HQ Sports' : 'HQ Sports Coaching Staff',
      authorClub: 'HQ Analytics HQ',
      authorPhoto: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=240&auto=format&fit=crop&q=80',
      sport: 'general',
      isOfficialHQ: true,
      content: bulletinContent.trim(),
      matchTag: currentLang === 'ar' ? 'توجيه فني معتمد' : 'Certified Technical Directive'
    });

    setBulletinContent('');
    showToast(t.broadcastSuccess);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 ltr:right-6 rtl:left-6 z-50 bg-emerald-500 text-black px-4 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#141824] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {t.adminTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              {t.adminSubtitle}
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-500 text-black shadow-md shadow-amber-500/20">
            {t.adminBadge}
          </span>
        </div>
      </div>

      {/* Athlete Selector for Editing */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 shadow-xl">
        <label className="block text-xs font-bold text-amber-400 mb-2">
          {t.selectPlayerLabel}
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={selectedAthleteId}
            onChange={(e) => onSelectAthleteId(e.target.value)}
            className="flex-1 bg-[#0c0e14] border border-[#283244] text-white text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
          >
            {athletes.map((ath) => (
              <option key={ath.id} value={ath.id}>
                {ath.name} — {ath.club} ({ath.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'})
              </option>
            ))}
          </select>

          {currentAthlete && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0c0f16] border border-[#1f2638] text-xs shrink-0">
              <img
                src={currentAthlete.photo}
                alt={currentAthlete.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
              />
              <div className="text-start">
                <span className="font-bold text-white block">{currentAthlete.name}</span>
                <span className="text-[10px] text-slate-400">
                  {currentAthlete.stats.matches} {currentLang === 'ar' ? 'مباريات' : 'matches'} · ⭐ {currentAthlete.stats.rating}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Core Real-Time Stat Adjustment Form (Prompt Core Feature) */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1f2638] pb-3 mb-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>
              {currentLang === 'ar'
                ? `تعديل إحصائيات اللاعب: ${currentAthlete?.name}`
                : `Edit Live Stats: ${currentAthlete?.name}`}
            </span>
          </h3>
          <span className="text-xs text-amber-400/90 font-mono">
            {currentAthlete?.sport === 'soccer' ? '⚽ SOCCER' : '🤾 HANDBALL'}
          </span>
        </div>

        <form onSubmit={handleSaveStats} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
            {/* Matches */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldMatches}
              </label>
              <input
                type="number"
                min="0"
                value={matches}
                onChange={(e) => setMatches(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Goals / Points */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldGoals}
              </label>
              <input
                type="number"
                min="0"
                value={goals}
                onChange={(e) => setGoals(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Assists */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldAssists}
              </label>
              <input
                type="number"
                min="0"
                value={assists}
                onChange={(e) => setAssists(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldRating}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-amber-300 focus:outline-none focus:border-amber-400 font-mono text-sm font-bold"
              />
            </div>

            {/* Stamina % */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldStamina}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={stamina}
                onChange={(e) => setStamina(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Top Speed (km/h) */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.statSpeed}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={speedKmH}
                onChange={(e) => setSpeedKmH(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Pass Accuracy % */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldPassAcc}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={passAccuracy}
                onChange={(e) => setPassAccuracy(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>

            {/* Duels Won % */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.fieldDuels}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={duelsWon}
                onChange={(e) => setDuelsWon(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{t.quickSaveStats}</span>
          </button>
        </form>
      </div>

      {/* Add Certified Match Report Form */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.logNewMatchTitle}</span>
        </h3>

        <form onSubmit={handleAddMatch} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.matchOpponent}
              </label>
              <input
                type="text"
                required
                value={matchOpponent}
                onChange={(e) => setMatchOpponent(e.target.value)}
                placeholder={currentLang === 'ar' ? 'مثال: نادي بيراميدز' : 'e.g. Pyramids FC'}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.matchScore}
              </label>
              <input
                type="text"
                required
                value={matchScore}
                onChange={(e) => setMatchScore(e.target.value)}
                placeholder="2 - 1"
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.matchRating}
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={matchRating}
                onChange={(e) => setMatchRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.matchMinutes}
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={matchMinutes}
                onChange={(e) => setMatchMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {currentLang === 'ar' ? 'الأهداف المسجلة بالمباراة' : 'Goals in Match'}
              </label>
              <input
                type="number"
                min="0"
                value={matchGoals}
                onChange={(e) => setMatchGoals(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.matchKeyMetric}
              </label>
              <input
                type="text"
                value={matchKeyMetric}
                onChange={(e) => setMatchKeyMetric(e.target.value)}
                placeholder={currentLang === 'ar' ? '92% دقة تمرير' : '92% pass accuracy'}
                className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {t.matchCoachNotes}
            </label>
            <textarea
              rows={2}
              value={matchCoachNotes}
              onChange={(e) => setMatchCoachNotes(e.target.value)}
              placeholder={
                currentLang === 'ar'
                  ? 'اكتب توصيات الجهاز الفني ونقاط القوة والتحسين...'
                  : 'Write coaching staff directives and match analysis notes...'
              }
              className="w-full px-3 py-2 rounded-xl bg-[#0c0e14] border border-[#293347] text-white focus:outline-none focus:border-emerald-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.btnAddMatch}</span>
          </button>
        </form>
      </div>

      {/* Broadcast Coaching Directive / Bulletin */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>{t.broadcastTitle}</span>
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          {t.broadcastPlaceholder}
        </p>

        <form onSubmit={handleBroadcast} className="space-y-3">
          <textarea
            rows={2}
            required
            value={bulletinContent}
            onChange={(e) => setBulletinContent(e.target.value)}
            placeholder={
              currentLang === 'ar'
                ? 'تنبيه فني معتمد لجميع اللاعبين: التركيز على استعادة الكرة في أول 5 ثوانٍ من فقدانها...'
                : 'Official bulletin: Focus on counter-pressing within the first 5 seconds of possession loss...'
            }
            className="w-full px-3 py-2.5 rounded-xl bg-[#0c0e14] border border-[#283244] text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.btnBroadcast}</span>
          </button>
        </form>
      </div>

      {/* Athletes Roster Table */}
      <div className="bg-[#131722] border border-[#212a3b] rounded-2xl p-5 sm:p-6 shadow-xl overflow-hidden">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-amber-400" />
          <span>{t.managePlayersList} ({athletes.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-[#212a3a] text-slate-400 text-[11px]">
                <th className="pb-3 font-semibold text-start">{t.player}</th>
                <th className="pb-3 font-semibold text-start">{t.club}</th>
                <th className="pb-3 font-semibold text-start">{t.sport}</th>
                <th className="pb-3 font-semibold text-center">{t.statMatches}</th>
                <th className="pb-3 font-semibold text-center">{t.statGoals}</th>
                <th className="pb-3 font-semibold text-center">{t.statRating}</th>
                <th className="pb-3 font-semibold text-end">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2230]">
              {athletes.map((ath) => (
                <tr key={ath.id} className="hover:bg-[#181f2d] transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={ath.photo}
                        alt={ath.name}
                        className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
                      />
                      <div>
                        <span className="font-bold text-white block">{ath.name}</span>
                        <span className="text-[10px] text-slate-400">{ath.position}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-300 font-medium">{ath.club}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-[#1a2130] text-amber-300 text-[10px] font-semibold">
                      {ath.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono tabular-nums text-slate-200">
                    {ath.stats.matches}
                  </td>
                  <td className="py-3 text-center font-mono tabular-nums text-emerald-400 font-bold">
                    {ath.stats.goals}
                  </td>
                  <td className="py-3 text-center font-mono tabular-nums text-amber-400 font-bold">
                    {ath.stats.rating}
                  </td>
                  <td className="py-3 text-end">
                    <button
                      onClick={() => {
                        onSelectAthleteId(ath.id);
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#222a3a] hover:bg-amber-500 hover:text-black text-amber-300 font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
