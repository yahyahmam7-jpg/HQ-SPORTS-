import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Users, Activity, Layers, Settings2 } from 'lucide-react';

interface BottomNavProps {
  currentLang: Language;
  activeTab: 'feed' | 'profile' | 'tactics' | 'admin';
  onSelectTab: (tab: 'feed' | 'profile' | 'tactics' | 'admin') => void;
  isAdmin: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentLang,
  activeTab,
  onSelectTab,
  isAdmin
}) => {
  const t = translations[currentLang];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f1218]/95 backdrop-blur-lg border-t border-[#222a38] px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-4 items-center h-14">
        
        {/* Feed Tab */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'feed' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className={`w-5 h-5 transition-transform ${activeTab === 'feed' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navFeed.split(' ')[0]}
          </span>
        </button>

        {/* Profile / Analytics Tab */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className={`w-5 h-5 transition-transform ${activeTab === 'profile' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navProfile.split(' ')[0]}
          </span>
        </button>

        {/* Tactics Tab */}
        <button
          onClick={() => onSelectTab('tactics')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'tactics' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className={`w-5 h-5 transition-transform ${activeTab === 'tactics' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navTactics.split(' ')[0]}
          </span>
        </button>

        {/* Admin Tab */}
        <button
          onClick={() => onSelectTab('admin')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            activeTab === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Settings2 className={`w-5 h-5 transition-transform ${activeTab === 'admin' ? 'scale-110' : ''}`} />
            {isAdmin && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#0f1218]"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navAdmin.split(' ')[0]}
          </span>
        </button>

      </div>
    </nav>
  );
};
