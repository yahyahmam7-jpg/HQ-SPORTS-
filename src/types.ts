export type SportType = 'soccer' | 'handball';

export type Language = 'ar' | 'en';

export interface MatchReport {
  id: string;
  opponent: string;
  date: string;
  score: string;
  minutesPlayed: number;
  goalsOrPoints: number;
  assists: number;
  rating: number; // e.g. 8.7
  coachNotes: string;
  keyMetric: string; // e.g. "94% pass accuracy" or "6/7 9m shots"
}

export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  rating: number; // 0 - 10
  stamina: number; // 0 - 100%
  speedKmH: number; // e.g. 33.4
  passAccuracy: number; // 0 - 100%
  duelsWon: number; // 0 - 100%
  tacticalDiscipline: number; // 0 - 100%
  defenseRating?: number; // 0 - 100%
  saveEfficiency?: number; // for keepers
}

export interface AthleteUser {
  id: string;
  name: string;
  phone: string;
  address: string;
  club: string;
  sport: SportType;
  position: string;
  photo: string;
  isAdmin?: boolean;
  jerseyNumber?: number;
  stats: PlayerStats;
  matchHistory: MatchReport[];
}

export interface PostComment {
  id: string;
  userName: string;
  userClub?: string;
  userPhoto?: string;
  text: string;
  timestamp: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorClub: string;
  authorPhoto: string;
  sport: SportType | 'general';
  isOfficialHQ?: boolean;
  content: string;
  mediaUrl?: string;
  matchTag?: string;
  timestamp: string;
  reactions: {
    soccer: number; // ⚽
    handball: number; // 🤾
    fire: number; // 🔥
    target: number; // 🎯
    glove: number; // 🧤
  };
  userReactions: Record<string, string>; // userId -> emoji
  comments: PostComment[];
}
