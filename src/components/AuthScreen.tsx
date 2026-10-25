import React, { useState } from 'react';
import { AthleteUser, Language, SportType } from '../types';
import { translations } from '../translations';
import { User, Phone, MapPin, Shield, Trophy, Image, Check, X, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  currentLang: Language;
  onRegister: (newUser: AthleteUser) => void;
  onSelectExisting: (athlete: AthleteUser) => void;
  athletes: AthleteUser[];
  onClose?: () => void;
  isModal?: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  currentLang,
  onRegister,
  onSelectExisting,
  athletes,
  onClose,
  isModal = false
}) => {
  const t = translations[currentLang];

  const [mode, setMode] = useState<'register' | 'select'>('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [club, setClub] = useState('');
  const [sport, setSport] = useState<SportType>('soccer');
  const [position, setPosition] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState<number | ''>('');
  const [photo, setPhoto] = useState('');

  const defaultSoccerAvatars = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80'
  ];

  const defaultHandballAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=240&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const chosenPhoto =
      photo.trim() ||
      (sport === 'soccer'
        ? defaultSoccerAvatars[Math.floor(Math.random() * defaultSoccerAvatars.length)]
        : defaultHandballAvatars[Math.floor(Math.random() * defaultHandballAvatars.length)]);

    const isAdminUser =
      phone.trim() === '01000000000' ||
      name.toLowerCase().includes('admin') ||
      name.includes('مدير') ||
      name.includes('كابتن');

    const newUser: AthleteUser = {
      id: `ath-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim() || '01000000000',
      address: address.trim() || (currentLang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'),
      club: club.trim() || (currentLang === 'ar' ? 'نادي النجوم الرياضي' : 'Stars Sports Club'),
      sport,
      position: position.trim() || (sport === 'soccer' ? 'مهاجم / Striker' : 'ظهير / Back Court'),
      jerseyNumber: typeof jerseyNumber === 'number' ? jerseyNumber : 9,
      photo: chosenPhoto,
      isAdmin: isAdminUser,
      stats: {
        matches: 6,
        goals: 4,
        assists: 3,
        rating: 8.6,
        stamina: 90,
        speedKmH: sport === 'soccer' ? 32.5 : 26.8,
        passAccuracy: 88,
        duelsWon: 76,
        tacticalDiscipline: 89,
        defenseRating: 75
      },
      matchHistory: [
        {
          id: `m-${Date.now()}`,
          opponent: currentLang === 'ar' ? 'مباراة افتتاحية تجريبية' : 'Debut Showcase Match',
          date: '2026-10-24',
          score: sport === 'soccer' ? '2 - 0' : '27 - 22',
          minutesPlayed: sport === 'soccer' ? 80 : 50,
          goalsOrPoints: 1,
          assists: 1,
          rating: 8.6,
          coachNotes:
            currentLang === 'ar'
              ? 'بداية فنية واعدة، التزام تكتيكي متميز وقدرة جيدة على صناعة الفرص.'
              : 'Promising technical debut with solid tactical execution and great vision.',
          keyMetric:
            sport === 'soccer'
              ? '88% دقة تمرير + تسجيل هدف حاسم'
              : '70% دقة تصويب + 4 صناعة أهداف'
        }
      ]
    };

    onRegister(newUser);
  };

  const content = (
    <div className="w-full max-w-xl mx-auto bg-[#131720] border border-[#232c3d] rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Top Card Branding */}
      <div className="flex items-center justify-between pb-4 border-b border-[#202838] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#0c0e13] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-amber-400 text-lg">HQ</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{t.authTitle}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.authSubtitle}</p>
          </div>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1a2130] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Switcher: Register New vs Pick Existing Athlete */}
      <div className="grid grid-cols-2 p-1 bg-[#0c0e14] rounded-xl border border-[#222a3a] mb-6">
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'register'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.authSwitchToRegister}
        </button>
        <button
          type="button"
          onClick={() => setMode('select')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'select'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.authSwitchToLogin}
        </button>
      </div>

      {mode === 'select' ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 mb-2">
            {currentLang === 'ar'
              ? 'اختر أي لاعب مسجل لتجربة المنظومة فوراً أو الدخول بصفته:'
              : 'Select any registered athlete to immediately experience the analytics portal:'}
          </p>
          <div className="grid grid-cols-1 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {athletes.map((ath) => (
              <button
                key={ath.id}
                type="button"
                onClick={() => onSelectExisting(ath)}
                className="w-full text-start p-3 rounded-xl border border-[#222c3d] bg-[#171d2b] hover:border-amber-500/50 hover:bg-[#1c2436] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ath.photo}
                    alt={ath.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-400"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {ath.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {ath.club} · {ath.position}
                    </p>
                    <span className="text-[10px] text-amber-400/90 font-medium">
                      {ath.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'} · #{ath.jerseyNumber || 10}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    ⭐ {ath.stats.rating} / 10
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {ath.stats.matches} {currentLang === 'ar' ? 'مباريات' : 'matches'}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {currentLang === 'ar'
                ? 'نصيحة: يمكنك تجربة وضع الإدارة الكامل والمدرب بتفعيل الزر الذهبي في الأعلى أو تسجيل رقم تليفون 01000000000.'
                : 'Tip: You can activate full coach / management admin mode using the golden button in the header or registering with phone 01000000000.'}
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.lblName}</span>
              <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={currentLang === 'ar' ? 'مثال: أحمد مصطفى' : 'e.g. Ahmed Mostafa'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          {/* Phone & Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.lblPhone}</span>
                <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010xxxxxxxx"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {t.lblPhoneHelp}
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.lblAddress}</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={currentLang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Club & Sport Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.lblClub}</span>
                <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={club}
                onChange={(e) => setClub(e.target.value)}
                placeholder={currentLang === 'ar' ? 'نادي سموحة / الأهلي / الزمالك' : 'e.g. Al Ahly / Smouha SC'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.lblSport}</span>
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as SportType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              >
                <option value="soccer">{t.sportSoccer}</option>
                <option value="handball">{t.sportHandball}</option>
              </select>
            </div>
          </div>

          {/* Position & Jersey */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                {t.lblPosition}
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={
                  sport === 'soccer'
                    ? (currentLang === 'ar' ? 'جناح / قلب دفاع / وسط' : 'Winger / CB / Midfield')
                    : (currentLang === 'ar' ? 'صانع ألعاب / ظهير / جناح' : 'Playmaker / Back / Wing')
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                {t.lblJersey}
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="10"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.lblPhoto}</span>
            </label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#2a3447] text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{t.btnSubmitReg}</span>
          </button>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="my-auto w-full max-w-xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4">
      {content}
    </div>
  );
};
