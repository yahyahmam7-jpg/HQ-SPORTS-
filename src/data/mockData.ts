import { AthleteUser, FeedPost } from '../types';

export const INITIAL_ATHLETES: AthleteUser[] = [
  {
    id: 'ath-1',
    name: 'كريم الديب',
    phone: '01012345678',
    address: 'الإسكندرية، مصر',
    club: 'نادي سموحة السكندري',
    sport: 'soccer',
    position: 'جناح هجومي / Winger',
    jerseyNumber: 11,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80',
    stats: {
      matches: 12,
      goals: 8,
      assists: 5,
      rating: 8.9,
      stamina: 92,
      speedKmH: 33.8,
      passAccuracy: 86,
      duelsWon: 74,
      tacticalDiscipline: 90,
      defenseRating: 68
    },
    matchHistory: [
      {
        id: 'm-1',
        opponent: 'نادي الاتحاد السكندري',
        date: '2026-10-18',
        score: '2 - 1',
        minutesPlayed: 88,
        goalsOrPoints: 1,
        assists: 1,
        rating: 9.1,
        coachNotes: 'تحركات ممتازة في المساحات النصفية، سرعة ارتداد دفاعي عالية، وحسم أمام المرمى في الدقيقة 73.',
        keyMetric: '89% دقة تمرير في الثلث الأخير + سرعة 33.2 كم/س'
      },
      {
        id: 'm-2',
        opponent: 'نادي بيراميدز',
        date: '2026-10-10',
        score: '1 - 1',
        minutesPlayed: 90,
        goalsOrPoints: 1,
        assists: 0,
        rating: 8.7,
        coachNotes: 'ضغط عالي ناجح واستخلاص كرتين في مناطق المنافس. يحتاج التركيز أكثر على العرضيات من الجبهة اليسرى.',
        keyMetric: 'سجل هدف التعادل + قطع 10.8 كم'
      },
      {
        id: 'm-3',
        opponent: 'نادي سيراميكا كليوباترا',
        date: '2026-09-29',
        score: '3 - 0',
        minutesPlayed: 75,
        goalsOrPoints: 2,
        assists: 1,
        rating: 9.4,
        coachNotes: 'أداء قيادي متكامل، تفوق واضح في الالتحامات الفردية 1 ضد 1 وفاعلية هجومية نموذجية.',
        keyMetric: 'رجل المباراة + صناعة هدفين وتسجيل هدفين'
      }
    ]
  },
  {
    id: 'ath-2',
    name: 'نورهان شريف',
    phone: '01098765432',
    address: 'القاهرة، مصر',
    club: 'النادي الأهلي',
    sport: 'handball',
    position: 'صانعة ألعاب / Center Back',
    jerseyNumber: 10,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    stats: {
      matches: 16,
      goals: 52,
      assists: 38,
      rating: 9.2,
      stamina: 94,
      speedKmH: 27.6,
      passAccuracy: 92,
      duelsWon: 81,
      tacticalDiscipline: 96,
      defenseRating: 84
    },
    matchHistory: [
      {
        id: 'mh-1',
        opponent: 'نادي سبورتنج',
        date: '2026-10-21',
        score: '28 - 24',
        minutesPlayed: 55,
        goalsOrPoints: 7,
        assists: 6,
        rating: 9.5,
        coachNotes: 'إدارة رائعة لنسق الهجوم السريع (Fast Break)، وتمريرات ذكية جداً للاعبي الدائرة مع 7 أهداف من 9 تصويبات.',
        keyMetric: '78% دقة تصويب 9 أمتار + 6 أسيست حاسمة'
      },
      {
        id: 'mh-2',
        opponent: 'نادي الزمالك (ديربي اليد)',
        date: '2026-10-14',
        score: '26 - 25',
        minutesPlayed: 58,
        goalsOrPoints: 6,
        assists: 4,
        rating: 9.0,
        coachNotes: 'ثبات ذهني استثنائي في الدقائق الأخيرة وتنفيذ ركلة جزاء حاسمة بنجاح في الثواني الأخيرة.',
        keyMetric: '100% نجاح في رميات الـ 7 أمتار (3 من 3)'
      }
    ]
  },
  {
    id: 'ath-3',
    name: 'عمر زاهر',
    phone: '01055566677',
    address: 'الجيزة، مصر',
    club: 'نادي الزمالك',
    sport: 'soccer',
    position: 'قلب دفاع / Center Back',
    jerseyNumber: 4,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    stats: {
      matches: 14,
      goals: 2,
      assists: 1,
      rating: 8.6,
      stamina: 89,
      speedKmH: 32.1,
      passAccuracy: 91,
      duelsWon: 88,
      tacticalDiscipline: 93,
      defenseRating: 92
    },
    matchHistory: [
      {
        id: 'oz-1',
        opponent: 'نادي الإسماعيلي',
        date: '2026-10-19',
        score: '1 - 0',
        minutesPlayed: 90,
        goalsOrPoints: 0,
        assists: 0,
        rating: 8.8,
        coachNotes: 'نظافة شباك مستحقة، تفوق كامل في الكرات الهوائية (6 من 6) وتغطية متميزة خلف الظهير الأيمن.',
        keyMetric: '100% كرات هوائية ناجحة + 9 تشتيتات'
      }
    ]
  }
];

export const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorId: 'hq-admin',
    authorName: 'إدارة التحليل الفني - HQ Sports',
    authorClub: 'HQ Analytics HQ',
    authorPhoto: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=240&auto=format&fit=crop&q=80',
    sport: 'general',
    isOfficialHQ: true,
    content: '🏆 تنويه فني للأسبوع الرياضي: تم تحديث تقارير الـ GPS ومعدلات الضغط العكسي لجميع لاعبي كرة القدم وكرة اليد المسجلين في HQ. يرجى من كل لاعب مراجعة شاشة التحليلات لمتابعة توصيات أخصائي الأحمال وتحليل التمركز.',
    timestamp: 'منذ ساعتين',
    matchTag: 'تقرير فني رسمي للأسبوع',
    reactions: {
      soccer: 14,
      handball: 9,
      fire: 28,
      target: 21,
      glove: 6
    },
    userReactions: {},
    comments: [
      {
        id: 'c-1',
        userName: 'كريم الديب',
        userClub: 'نادي سموحة',
        text: 'شكراً كابتن تم الاطلاع على تقرير التمركز والسرعات ⚽💪',
        timestamp: 'منذ ساعة'
      },
      {
        id: 'c-2',
        userName: 'نورهان شريف',
        userClub: 'النادي الأهلي',
        text: 'تحليل دقيق جداً لمعدل الهجمة المرتدة، شكراً لفريق HQ Sports 🔥',
        timestamp: 'منذ 45 دقيقة'
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'ath-1',
    authorName: 'كريم الديب',
    authorClub: 'نادي سموحة السكندري',
    authorPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80',
    sport: 'soccer',
    isOfficialHQ: false,
    content: 'الحمد لله على أداء اليوم في مباراة القمة وتسجيل هدف الفوز! شكراً لإدارة HQ Sports على تحليل التمركز بدقة عالية وكيفية استغلال المساحة خلف قلبي الدفاع ⚽🔥',
    timestamp: 'منذ 5 ساعات',
    matchTag: 'سموحة ضد الاتحاد (2 - 1)',
    reactions: {
      soccer: 32,
      handball: 2,
      fire: 41,
      target: 18,
      glove: 4
    },
    userReactions: {},
    comments: [
      {
        id: 'c-3',
        userName: 'محمود حسن',
        userClub: 'مدرب أكاديمية',
        text: 'مباراة كبيرة جداً يا كريم، الاستلام الموجه قبل التسديد كان نقطة التحول!',
        timestamp: 'منذ 3 ساعات'
      },
      {
        id: 'c-4',
        userName: 'عمر زاهر',
        userClub: 'نادي الزمالك',
        text: 'عاش يا وحش بالتوفيق دائماً يا كيمو 👏🔥',
        timestamp: 'منذ ساعتين'
      }
    ]
  },
  {
    id: 'post-3',
    authorId: 'ath-2',
    authorName: 'نورهان شريف',
    authorClub: 'النادي الأهلي لكرة اليد',
    authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    sport: 'handball',
    isOfficialHQ: false,
    content: 'تركيز كامل في تمرين اليوم على حلول الدفاع 5-1 والتصويب من مسافة 9 أمتار مع دوران الكرة السريع. شكراً لكابتن التحليل على المقاطع المسجلة والملاحظات التكتيكية 🤾‍♀️✨',
    timestamp: 'أمس',
    matchTag: 'تدريبات فنية تخصصية',
    reactions: {
      soccer: 4,
      handball: 37,
      fire: 29,
      target: 24,
      glove: 12
    },
    userReactions: {},
    comments: [
      {
        id: 'c-5',
        userName: 'كابتن أحمد سامي',
        userClub: 'HQ Coaching Team',
        text: 'دقة ممتازة في زوايا الذراع يا نورهان، استمري في نفس التوقيت الحركي!',
        timestamp: 'أمس'
      }
    ]
  }
];
