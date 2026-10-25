import React, { useState } from 'react';
import { Language, SportType } from '../types';
import { translations } from '../translations';
import { Layers, Shield, Zap, Info, ChevronRight } from 'lucide-react';

interface TacticalBoardProps {
  currentLang: Language;
}

interface TacticalNode {
  id: string;
  number: number;
  label: string;
  roleAr: string;
  roleEn: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  instructionAr: string;
  instructionEn: string;
  targetKpiAr: string;
  targetKpiEn: string;
}

export const TacticalBoard: React.FC<TacticalBoardProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [sport, setSport] = useState<SportType>('soccer');
  const [soccerFormation, setSoccerFormation] = useState<'4-3-3' | '4-2-3-1' | '3-5-2'>('4-3-3');
  const [handballTactics, setHandballTactics] = useState<'6-0' | '5-1' | '7v6'>('6-0');
  const [selectedNode, setSelectedNode] = useState<TacticalNode | null>(null);

  // Soccer 4-3-3 nodes
  const soccer433Nodes: TacticalNode[] = [
    {
      id: 'gk',
      number: 1,
      label: 'GK',
      roleAr: 'حارس مرمى حديث (Sweeper Keeper)',
      roleEn: 'Sweeper Keeper',
      x: 50,
      y: 90,
      instructionAr: 'التمركز المتقدم على خط الـ 18 لتغطية المساحة خلف قلبي الدفاع، وتوزيع الكرة بدقة للظهيرين.',
      instructionEn: 'High positioning near the box edge to sweep in behind the center backs; precise distribution.',
      targetKpiAr: '85% دقة تمرير + تغطية كرات طولية',
      targetKpiEn: '85% pass accuracy + sweep clearances'
    },
    {
      id: 'cb-l',
      number: 4,
      label: 'LCB',
      roleAr: 'قلب دفاع أيسر',
      roleEn: 'Left Center Back',
      x: 35,
      y: 75,
      instructionAr: 'بناء اللعب من الخلف والتفوق في الالتحامات الهوائية ضد المهاجم الصريح.',
      instructionEn: 'Build-up play initiator, aerial dominance against the striker.',
      targetKpiAr: '90% تمرير للأمام + 80% صراعات هوائية',
      targetKpiEn: '90% forward pass + 80% aerial win'
    },
    {
      id: 'cb-r',
      number: 5,
      label: 'RCB',
      roleAr: 'قلب دفاع أيمن',
      roleEn: 'Right Center Back',
      x: 65,
      y: 75,
      instructionAr: 'التغطية العكسية، قيادة مصيدة التسلل والضغط السريع عند فقدان الكرة.',
      instructionEn: 'Covering depth, offside line management, aggressive counter-press trigger.',
      targetKpiAr: '4 استخلاصات بالثلث الدفاعي',
      targetKpiEn: '4 defensive third recoveries'
    },
    {
      id: 'lb',
      number: 3,
      label: 'LB',
      roleAr: 'ظهير أيسر هجومي',
      roleEn: 'Attacking Left Back',
      x: 15,
      y: 65,
      instructionAr: 'توفير الزيادة العددية على الجناح، والتمرير العرضي السريع لمنطقة الجزاء.',
      instructionEn: 'Flank width provider, rapid transition delivery into the penalty box.',
      targetKpiAr: '6 عرضيات + سرعة قصوى > 32 كم/س',
      targetKpiEn: '6 crosses + top sprint > 32 km/h'
    },
    {
      id: 'rb',
      number: 2,
      label: 'RB',
      roleAr: 'ظهير أيمن متوازن',
      roleEn: 'Inverted Right Back',
      x: 85,
      y: 65,
      instructionAr: 'الدخول لوسط الملعب أثناء الاستحواذ لخلق تفوق عددي وتأمين الارتداد.',
      instructionEn: 'Invert into half-spaces to secure central control and balance defensive transition.',
      targetKpiAr: '92% دقة تمريرات قصيرة',
      targetKpiEn: '92% short passing retention'
    },
    {
      id: 'dm',
      number: 6,
      label: 'DM',
      roleAr: 'لاعب ارتكاز دفاعي (Anchor)',
      roleEn: 'Defensive Midfielder (Anchor)',
      x: 50,
      y: 55,
      instructionAr: 'حماية المساحة بين خطي الدفاع والوسط، وقطع قنوات التمرير للمنافس.',
      instructionEn: 'Protect space between lines, intercept central pass lanes.',
      targetKpiAr: '10 استخلاصات + 11 كم مسافة مقطوعة',
      targetKpiEn: '10 recoveries + 11km covered'
    },
    {
      id: 'cm-l',
      number: 8,
      label: 'LCM',
      roleAr: 'وسط مدافع / صانع مساحات (Box-to-Box)',
      roleEn: 'Box-to-Box Midfielder',
      x: 30,
      y: 42,
      instructionAr: 'الضغط العكسي في الثلث الأوسط والمساندة في عمق منطقة الجزاء.',
      instructionEn: 'Aggressive second ball recovery and box crashing.',
      targetKpiAr: '3 تسديدات + 88% تمرير ناجح',
      targetKpiEn: '3 attempts + 88% pass retention'
    },
    {
      id: 'cm-r',
      number: 10,
      label: 'RCM',
      roleAr: 'صانع ألعاب متقدم (Advanced Playmaker)',
      roleEn: 'Advanced Playmaker',
      x: 70,
      y: 42,
      instructionAr: 'صناعة الفرص البينية والتحرك في أنصاف المساحات (Half Spaces).',
      instructionEn: 'Key passes into half-space channels and breaking low blocks.',
      targetKpiAr: '4 تمريرات مفتاحية في كل مباراة',
      targetKpiEn: '4 key chances created per game'
    },
    {
      id: 'lw',
      number: 11,
      label: 'LW',
      roleAr: 'جناح أيسر مهاجم (Inside Forward)',
      roleEn: 'Inside Forward (Left Wing)',
      x: 20,
      y: 20,
      instructionAr: 'الدخول للعمق بالقدم اليمنى، والتسديد المباشر على الزاوية البعيدة.',
      instructionEn: 'Cut inside on stronger foot, direct finishing at far post.',
      targetKpiAr: '5 مراوغات ناجحة + 1 هدف / مساهمة',
      targetKpiEn: '5 successful dribbles + 1 goal contribution'
    },
    {
      id: 'rw',
      number: 7,
      label: 'RW',
      roleAr: 'جناح أيمن سريع (Inverted Winger)',
      roleEn: 'Inverted Right Winger',
      x: 80,
      y: 20,
      instructionAr: 'استغلال المساحة خلف الظهير، واللعب السريع من لمسة واحدة.',
      instructionEn: 'Isolate fullbacks in 1v1 duels, quick 1-2 wall passes.',
      targetKpiAr: 'سرعة > 33.5 كم/س + 4 تسديدات',
      targetKpiEn: 'Speed > 33.5 km/h + 4 shots'
    },
    {
      id: 'st',
      number: 9,
      label: 'ST',
      roleAr: 'مهاجم صريح (Complete Striker)',
      roleEn: 'Complete Striker',
      x: 50,
      y: 12,
      instructionAr: 'طلب الكرة بين قلبي الدفاع، حجز المدافعين واستغلال العرضيات الأرضية.',
      instructionEn: 'Channel runs between CBs, hold-up play and clinical finishing.',
      targetKpiAr: '60% تحويل الفرص لأهداف + 4 صراعات أرضية',
      targetKpiEn: '60% shot conversion + 4 ground duels'
    }
  ];

  // Handball 6-0 Defense / Attack nodes
  const handballNodes: TacticalNode[] = [
    {
      id: 'hb-gk',
      number: 1,
      label: 'GK',
      roleAr: 'حارس مرمى اليد',
      roleEn: 'Handball Goalkeeper',
      x: 50,
      y: 92,
      instructionAr: 'التحكم في زوايا المرمى (Positional Save)، وإطلاق الهجمة الخاطفة في أقل من 3 ثوانٍ.',
      instructionEn: 'Angle closure on wing shots, rapid 3-second fast break outlet pass.',
      targetKpiAr: '40% نسبة تصديات + 5 تمريرات هجمة مرتدة',
      targetKpiEn: '40% save rate + 5 fast-break outlets'
    },
    {
      id: 'hb-cb',
      number: 10,
      label: 'CB',
      roleAr: 'صانع الألعاب (Center Back)',
      roleEn: 'Center Back / Playmaker',
      x: 50,
      y: 40,
      instructionAr: 'توجيه خط الهجوم، سحب المدافع المركزي وتمرير الكرة لدائرة الارتكاز أو التصويب الخاطف.',
      instructionEn: 'Orchestrating offensive tempo, drawing middle defender, slip pass to pivot.',
      targetKpiAr: '8 أسيست + 90% قرارات هجومية صحيحة',
      targetKpiEn: '8 assists + 90% positive attack decisions'
    },
    {
      id: 'hb-lb',
      number: 8,
      label: 'LB',
      roleAr: 'ظهير أيسر هداف (Left Back)',
      roleEn: 'Left Back (Distance Shooter)',
      x: 28,
      y: 46,
      instructionAr: 'الارتقاء العالي والتصويب من مسافة 9 أمتار فوق جدار الصد.',
      instructionEn: 'High vertical jump release from 9m over defensive block.',
      targetKpiAr: '7 أهداف + سرعة قذف > 105 كم/س',
      targetKpiEn: '7 goals + throw velocity > 105 km/h'
    },
    {
      id: 'hb-rb',
      number: 9,
      label: 'RB',
      roleAr: 'ظهير أيمن أعسر (Right Back)',
      roleEn: 'Right Back (Lefty)',
      x: 72,
      y: 46,
      instructionAr: 'الاختراق القوي بين المدافع 1 و2 والتصويب باليد اليسرى.',
      instructionEn: 'Aggressive drive between def 1 & 2, left-handed finish.',
      targetKpiAr: '5 أهداف + استدراج رميتي 7 أمتار',
      targetKpiEn: '5 goals + 2 penalty draws'
    },
    {
      id: 'hb-pv',
      number: 6,
      label: 'PV',
      roleAr: 'لاعب الدائرة (Pivot / Line Player)',
      roleEn: 'Pivot (Line Player)',
      x: 50,
      y: 68,
      instructionAr: 'تثبيت قلبي الدفاع وفتح ممرات التصويب للباكات، واستلام الكرات المعقدة.',
      instructionEn: 'Screening central defenders, rolling to receive tight passes on the 6m line.',
      targetKpiAr: '85% دقة تحويل من الـ 6 أمتار',
      targetKpiEn: '85% conversion from 6m line'
    },
    {
      id: 'hb-lw',
      number: 11,
      label: 'LW',
      roleAr: 'جناح أيسر (Left Wing)',
      roleEn: 'Left Wing (Fast Break Specialist)',
      x: 12,
      y: 68,
      instructionAr: 'الانطلاق في الهجمة المرتدة السريعة والتصويب بزاوية طيران واسعة.',
      instructionEn: 'Lightning counter-attack break, wide airborne jump-in finishing.',
      targetKpiAr: '100% إنهاء في الهجمة المرتدة (Fast Break)',
      targetKpiEn: '100% fast-break execution'
    },
    {
      id: 'hb-rw',
      number: 7,
      label: 'RW',
      roleAr: 'جناح أيمن (Right Wing)',
      roleEn: 'Right Wing (Acrobatic Lefty)',
      x: 88,
      y: 68,
      instructionAr: 'الارتقاء في المساحات الضيقة وخداع الحارس في زاوية القائم القريب.',
      instructionEn: 'Narrow angle dive, wrist fake near-post finish.',
      targetKpiAr: '75% كفاءة تسديد من الزاوية',
      targetKpiEn: '75% wing angle efficiency'
    }
  ];

  const currentNodes = sport === 'soccer' ? soccer433Nodes : handballNodes;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#141824] border border-[#232c3f] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t.tacticsTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              {t.tacticsSubtitle}
            </p>
          </div>

          {/* Sport Selector Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0c0e14] border border-[#232c3f] rounded-xl self-start sm:self-auto text-xs">
            <button
              onClick={() => {
                setSport('soccer');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sport === 'soccer'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚽ {currentLang === 'ar' ? 'كرة قدم' : 'Soccer'}
            </button>
            <button
              onClick={() => {
                setSport('handball');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sport === 'handball'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🤾 {currentLang === 'ar' ? 'كرة يد' : 'Handball'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Pitch Simulator and Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The Pitch Canvas (2 Columns on large screens) */}
        <div className="lg:col-span-2 bg-[#121620] border border-[#232b3c] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.pitchLegend}</span>
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#1a2130] text-amber-400 border border-amber-500/20">
              {sport === 'soccer' ? 'Formation 4-3-3 Attack Shape' : 'Handball 6-0 Tactical Line'}
            </span>
          </div>

          {/* Pitch Container with realistic field markings */}
          <div 
            className={`w-full max-w-lg aspect-[3/4] rounded-2xl relative border-2 overflow-hidden shadow-2xl transition-all ${
              sport === 'soccer'
                ? 'bg-gradient-to-b from-[#113824] via-[#0d2d1d] to-[#113824] border-emerald-500/40'
                : 'bg-gradient-to-b from-[#1c2c44] via-[#152338] to-[#1c2c44] border-sky-500/40'
            }`}
          >
            {/* Pitch Lines (SVG overlay for soccer & handball) */}
            {sport === 'soccer' ? (
              <svg className="absolute inset-0 w-full h-full stroke-white/20 fill-none pointer-events-none" strokeWidth="1.5">
                {/* Outer boundary */}
                <rect x="5%" y="4%" width="90%" height="92%" rx="8" />
                {/* Halfway line & center circle */}
                <line x1="5%" y1="50%" x2="95%" y2="50%" />
                <circle cx="50%" cy="50%" r="14%" />
                <circle cx="50%" cy="50%" r="1.5%" className="fill-white/30" />
                {/* Top Penalty Area */}
                <rect x="25%" y="4%" width="50%" height="16%" />
                <rect x="37%" y="4%" width="26%" height="6%" />
                <circle cx="50%" cy="14%" r="1.2%" className="fill-white/30" />
                {/* Bottom Penalty Area */}
                <rect x="25%" y="80%" width="50%" height="16%" />
                <rect x="37%" y="90%" width="26%" height="6%" />
                <circle cx="50%" cy="86%" r="1.2%" className="fill-white/30" />
              </svg>
            ) : (
              <svg className="absolute inset-0 w-full h-full stroke-white/20 fill-none pointer-events-none" strokeWidth="1.5">
                {/* Handball Court Boundary */}
                <rect x="6%" y="4%" width="88%" height="92%" rx="8" />
                <line x1="6%" y1="50%" x2="94%" y2="50%" />
                {/* 6-Meter Goal Area (Bottom) */}
                <path d="M 22% 96% A 28% 26% 0 0 1 78% 96%" strokeWidth="2" strokeDasharray="none" />
                {/* 9-Meter Free Throw Line (Bottom) */}
                <path d="M 14% 96% A 36% 35% 0 0 1 86% 96%" strokeDasharray="5 5" />
                {/* 7-Meter Penalty Mark */}
                <line x1="46%" y1="78%" x2="54%" y2="78%" strokeWidth="2" />
                {/* 4-Meter Goalkeeper limit */}
                <line x1="47%" y1="87%" x2="53%" y2="87%" strokeWidth="1.5" />
              </svg>
            )}

            {/* Interactive Player Position Nodes */}
            {currentNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute group cursor-pointer focus:outline-none transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex flex-col items-center justify-center font-black text-xs shadow-xl transition-all border-2 ${
                      isSelected
                        ? 'bg-amber-400 text-black border-white ring-4 ring-amber-400/50'
                        : sport === 'soccer'
                        ? 'bg-[#0f172a] text-amber-400 border-amber-500/80 hover:bg-amber-500 hover:text-black'
                        : 'bg-[#0f172a] text-sky-300 border-sky-400/80 hover:bg-sky-400 hover:text-black'
                    }`}
                  >
                    <span className="text-[11px] leading-none">#{node.number}</span>
                    <span className="text-[8px] font-bold leading-none tracking-tight opacity-90">
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Tactical Inspector Panel (Right column on desktop) */}
        <div className="bg-[#121620] border border-[#232b3c] rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 border-b border-[#21293b] pb-3 mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">{t.tacticsNotesTitle}</h3>
          </div>

          {selectedNode ? (
            <div className="space-y-4 flex-1">
              {/* Node Card Header */}
              <div className="p-4 rounded-2xl bg-[#0c0e14] border border-[#232c3f]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-black font-black text-base flex items-center justify-center shadow-md">
                    #{selectedNode.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {currentLang === 'ar' ? selectedNode.roleAr : selectedNode.roleEn}
                    </h4>
                    <span className="text-xs text-amber-400 font-mono font-semibold">
                      Position: {selectedNode.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tactical Directives */}
              <div className="p-4 rounded-2xl bg-[#0c0e14] border border-[#232c3f] space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  {currentLang === 'ar' ? 'مهام التمركز والضغط:' : 'Tactical Assignments:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'ar' ? selectedNode.instructionAr : selectedNode.instructionEn}
                </p>
              </div>

              {/* Target Analytical Metric */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="text-xs font-bold text-amber-400 block">
                  {currentLang === 'ar' ? 'المؤشر الرقمي المستهدف (KPI):' : 'Key Performance Target (KPI):'}
                </span>
                <p className="text-xs text-amber-200 font-semibold">
                  {currentLang === 'ar' ? selectedNode.targetKpiAr : selectedNode.targetKpiEn}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Layers className="w-10 h-10 text-slate-600 mb-3 opacity-60" />
              <p className="text-xs font-medium">
                {currentLang === 'ar'
                  ? 'انقر على أي لاعب في الملعب لمشاهدة مهام التمركز والمؤشرات البدنية والفنية المطلوبة.'
                  : 'Click any player marker on the pitch to view tactical duties and analytical KPIs.'}
              </p>
            </div>
          )}

          {/* Quick Formation Guide */}
          <div className="mt-4 pt-4 border-t border-[#1f2738] text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300 block mb-1">
              {currentLang === 'ar' ? 'نظام التحليل الفني في HQ:' : 'HQ Sports Tactical Philosophy:'}
            </span>
            <p>
              {currentLang === 'ar'
                ? 'يتم تقييم أداء اللاعب بناءً على التزامه بخطوط الضغط، المساحات النصفية، ومعدل استرجاع الكرة في أول 5 ثوانٍ.'
                : 'Player performance is rated on pressing line maintenance, half-space occupation, and 5-second transition recoveries.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
