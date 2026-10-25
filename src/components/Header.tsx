import React from 'react';
import { AthleteUser, Language } from '../types';
import { translations } from '../translations';
import { 
  Shield, 
  Activity, 
  Globe, 
  UserCheck, 
  Users, 
  Layers, 
  Settings2,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: () => void;
  activeTab: 'feed' | 'profile' | 'tactics' | 'admin';
  onSelectTab: (tab: 'feed' | 'profile' | 'tactics' | 'admin') => void;
  currentUser: AthleteUser | null;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenAuth: () => void;
  athletes: AthleteUser[];
  onSelectAthlete: (athlete: AthleteUser) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  activeTab,
  onSelectTab,
  currentUser,
  isAdmin,
  onToggleAdmin,
  onOpenAuth,
  athletes,
  onSelectAthlete
}) => {
  const t = translations[currentLang];
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f1218]/95 backdrop-blur-md border-b border-[#222a38] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark with brand crest */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0e13] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-amber-400 text-sm tracking-wider">HQ</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white uppercase whitespace-nowrap">
                {t.brandName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest hidden sm:inline-block">
                SOCCER & HANDBALL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden lg:block leading-none mt-0.5">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (hidden on small screens, handled by bottom dock) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-sm font-semibold">
          <button
            onClick={() => onSelectTab('feed')}
            className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'feed'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>{t.navFeed}</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>{t.navProfile}</span>
          </button>

          <button
            onClick={() => onSelectTab('tactics')}
            className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tactics'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>{t.navTactics}</span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings2 className="w-4 h-4 text-amber-400" />
            <span>{t.navAdmin}</span>
            {isAdmin && (
              <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-black">
                PRO
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions & User Profile Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a3445] bg-[#141822] text-xs font-semibold text-slate-200 hover:border-amber-500/40 hover:text-amber-400 transition-colors cursor-pointer"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.toggleLang}</span>
          </button>

          {/* Quick Admin/Coach Switch Toggle */}
          <button
            onClick={onToggleAdmin}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              isAdmin
                ? 'bg-amber-500 text-black border-amber-400 shadow-sm shadow-amber-500/30'
                : 'bg-[#141822] text-slate-300 border-[#2a3445] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAdmin ? t.coachMode : t.athleteMode}</span>
          </button>

          {/* User selector dropdown / Auth trigger */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#2a3445] bg-[#141822] hover:border-amber-500/40 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
                  }}
                />
                <span className="text-xs font-bold text-white max-w-[90px] truncate hidden sm:inline-block">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs hover:brightness-110 shadow-md shadow-amber-500/20"
              >
                {t.loginRegister}
              </button>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && currentUser && (
              <div 
                className="absolute top-full mt-2 ltr:right-0 rtl:left-0 w-64 bg-[#141822] border border-[#2c374a] rounded-xl shadow-2xl p-2 z-50 text-xs"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="p-2 border-b border-[#242e3f] mb-1">
                  <p className="font-bold text-white text-sm">{currentUser.name}</p>
                  <p className="text-slate-400 text-[11px]">{currentUser.club} · {currentUser.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'}</p>
                </div>

                <div className="py-1">
                  <p className="text-[10px] text-amber-400 font-bold px-2 py-1 uppercase tracking-wider">
                    {t.quickDemoUsers}
                  </p>
                  {athletes.map((ath) => (
                    <button
                      key={ath.id}
                      onClick={() => {
                        onSelectAthlete(ath);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-start px-2 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#1e2535] transition-colors ${
                        ath.id === currentUser.id ? 'text-amber-400 font-bold bg-[#1a2130]' : 'text-slate-300'
                      }`}
                    >
                      <img
                        src={ath.photo}
                        alt={ath.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="truncate">{ath.name} ({ath.sport === 'soccer' ? '⚽' : '🤾'})</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#242e3f] mt-1 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onOpenAuth();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-start px-2 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#1e2535] flex items-center gap-2"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.authSwitchToRegister}</span>
                  </button>
                  <button
                    onClick={() => {
                      onToggleAdmin();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-start px-2 py-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 flex items-center gap-2 font-bold sm:hidden"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isAdmin ? t.coachMode : t.athleteMode}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
