import React, { useState, useEffect } from 'react';
import { AthleteUser, FeedPost, Language, MatchReport, SportType } from './types';
import { INITIAL_ATHLETES, INITIAL_POSTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CommunityFeed } from './components/CommunityFeed';
import { PlayerProfile } from './components/PlayerProfile';
import { AdminPanel } from './components/AdminPanel';
import { TacticalBoard } from './components/TacticalBoard';
import { AuthScreen } from './components/AuthScreen';
import { CommentsModal } from './components/CommentsModal';

export default function App() {
  // Language State
  const [currentLang, setCurrentLang] = useState<Language>('ar');

  // Athletes Database State
  const [athletes, setAthletes] = useState<AthleteUser[]>(() => {
    try {
      const saved = localStorage.getItem('hq_athletes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_ATHLETES;
  });

  // Current Active User
  const [currentUser, setCurrentUser] = useState<AthleteUser | null>(() => {
    return athletes[0] || null;
  });

  // Selected Athlete for Profile Dossier View
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteUser>(() => {
    return athletes[0] || INITIAL_ATHLETES[0];
  });

  // Selected Athlete for Admin Editing
  const [adminSelectedAthleteId, setAdminSelectedAthleteId] = useState<string>(() => {
    return athletes[0]?.id || 'ath-1';
  });

  // Admin / Coach Mode Toggle
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'tactics' | 'admin'>('feed');

  // Community Posts Database State
  const [posts, setPosts] = useState<FeedPost[]>(() => {
    try {
      const saved = localStorage.getItem('hq_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_POSTS;
  });

  // Modal Dialogs
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeCommentsPost, setActiveCommentsPost] = useState<FeedPost | null>(null);

  // Sync Direction & HTML Attributes with current language
  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  }, [currentLang]);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('hq_athletes', JSON.stringify(athletes));
    } catch (e) {
      // ignore
    }
  }, [athletes]);

  useEffect(() => {
    try {
      localStorage.setItem('hq_posts', JSON.stringify(posts));
    } catch (e) {
      // ignore
    }
  }, [posts]);

  // Handlers
  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  const handleRegister = (newUser: AthleteUser) => {
    setAthletes((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setSelectedAthlete(newUser);
    setAdminSelectedAthleteId(newUser.id);
    if (newUser.isAdmin) {
      setIsAdmin(true);
    }
    setIsAuthModalOpen(false);
    setActiveTab('profile');
  };

  const handleSelectExisting = (ath: AthleteUser) => {
    setCurrentUser(ath);
    setSelectedAthlete(ath);
    setAdminSelectedAthleteId(ath.id);
    if (ath.isAdmin) {
      setIsAdmin(true);
    }
    setIsAuthModalOpen(false);
  };

  const handleSelectAthleteProfile = (ath: AthleteUser) => {
    setSelectedAthlete(ath);
  };

  const handleSelectAthleteByName = (name: string) => {
    const found = athletes.find((a) => a.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedAthlete(found);
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEditInAdmin = (ath: AthleteUser) => {
    setAdminSelectedAthleteId(ath.id);
    setIsAdmin(true);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAthleteStats = (athleteId: string, updatedStats: AthleteUser['stats']) => {
    setAthletes((prev) =>
      prev.map((a) => (a.id === athleteId ? { ...a, stats: updatedStats } : a))
    );

    // Update selected profile view if matched
    if (selectedAthlete.id === athleteId) {
      setSelectedAthlete((prev) => ({ ...prev, stats: updatedStats }));
    }

    // Update current user if matched
    if (currentUser?.id === athleteId) {
      setCurrentUser((prev) => (prev ? { ...prev, stats: updatedStats } : null));
    }
  };

  const handleAddMatchReport = (athleteId: string, report: Omit<MatchReport, 'id'>) => {
    const newReport: MatchReport = {
      ...report,
      id: `m-${Date.now()}`
    };

    setAthletes((prev) =>
      prev.map((a) =>
        a.id === athleteId ? { ...a, matchHistory: [newReport, ...a.matchHistory] } : a
      )
    );

    if (selectedAthlete.id === athleteId) {
      setSelectedAthlete((prev) => ({
        ...prev,
        matchHistory: [newReport, ...prev.matchHistory]
      }));
    }

    if (currentUser?.id === athleteId) {
      setCurrentUser((prev) =>
        prev ? { ...prev, matchHistory: [newReport, ...prev.matchHistory] } : null
      );
    }
  };

  const handleCreatePost = (
    newPostData: Omit<FeedPost, 'id' | 'timestamp' | 'reactions' | 'userReactions' | 'comments'>
  ) => {
    const newPost: FeedPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timestamp: currentLang === 'ar' ? 'الآن' : 'Just now',
      reactions: {
        soccer: 0,
        handball: 0,
        fire: 0,
        target: 0,
        glove: 0
      },
      userReactions: {},
      comments: []
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleReactPost = (
    postId: string,
    reactionType: 'soccer' | 'handball' | 'fire' | 'target' | 'glove'
  ) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const currentCount = post.reactions[reactionType] || 0;
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: currentCount + 1
          }
        };
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      userName: currentUser ? currentUser.name : (currentLang === 'ar' ? 'رياضي زائر' : 'Guest Athlete'),
      userClub: currentUser ? currentUser.club : undefined,
      text,
      timestamp: currentLang === 'ar' ? 'الآن' : 'Just now'
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      })
    );

    // Also update activeCommentsPost if open
    if (activeCommentsPost?.id === postId) {
      setActiveCommentsPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        athletes={athletes}
        onSelectAthlete={handleSelectExisting}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'feed' && (
          <CommunityFeed
            posts={posts}
            currentUser={currentUser}
            currentLang={currentLang}
            onCreatePost={handleCreatePost}
            onReactPost={handleReactPost}
            onOpenComments={(post) => setActiveCommentsPost(post)}
            onSelectAthleteByName={handleSelectAthleteByName}
          />
        )}

        {activeTab === 'profile' && (
          <PlayerProfile
            athlete={selectedAthlete}
            athletes={athletes}
            onSelectAthlete={handleSelectAthleteProfile}
            currentLang={currentLang}
            onEditInAdmin={handleEditInAdmin}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'tactics' && (
          <TacticalBoard currentLang={currentLang} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            athletes={athletes}
            selectedAthleteId={adminSelectedAthleteId}
            onSelectAthleteId={setAdminSelectedAthleteId}
            onUpdateAthleteStats={handleUpdateAthleteStats}
            onAddMatchReport={handleAddMatchReport}
            onBroadcastPost={handleCreatePost}
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Mobile Bottom Dock Navigation */}
      <BottomNav
        currentLang={currentLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isAdmin={isAdmin}
      />

      {/* Auth / Athlete Registration Modal */}
      {isAuthModalOpen && (
        <AuthScreen
          currentLang={currentLang}
          onRegister={handleRegister}
          onSelectExisting={handleSelectExisting}
          athletes={athletes}
          onClose={() => setIsAuthModalOpen(false)}
          isModal={true}
        />
      )}

      {/* In-App Comments Sheet / Modal */}
      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
          onAddComment={handleAddComment}
          currentUser={currentUser}
          currentLang={currentLang}
        />
      )}

    </div>
  );
}
