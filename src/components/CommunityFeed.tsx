import React, { useState } from 'react';
import { FeedPost, AthleteUser, Language, SportType } from '../types';
import { translations } from '../translations';
import { 
  Send, 
  MessageSquare, 
  Sparkles, 
  Flame, 
  Target, 
  ShieldCheck, 
  PlusCircle, 
  Trophy,
  Filter
} from 'lucide-react';

interface CommunityFeedProps {
  posts: FeedPost[];
  currentUser: AthleteUser | null;
  currentLang: Language;
  onCreatePost: (newPost: Omit<FeedPost, 'id' | 'timestamp' | 'reactions' | 'userReactions' | 'comments'>) => void;
  onReactPost: (postId: string, reactionType: 'soccer' | 'handball' | 'fire' | 'target' | 'glove') => void;
  onOpenComments: (post: FeedPost) => void;
  onSelectAthleteByName?: (name: string) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  currentUser,
  currentLang,
  onCreatePost,
  onReactPost,
  onOpenComments,
  onSelectAthleteByName
}) => {
  const t = translations[currentLang];

  const [postContent, setPostContent] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'general'>('soccer');
  const [matchTag, setMatchTag] = useState('');
  const [filterSport, setFilterSport] = useState<'all' | 'soccer' | 'handball' | 'official'>('all');
  const [isExpandingNewPost, setIsExpandingNewPost] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    onCreatePost({
      authorId: currentUser ? currentUser.id : 'guest-user',
      authorName: currentUser ? currentUser.name : (currentLang === 'ar' ? 'رياضي HQ' : 'HQ Athlete'),
      authorClub: currentUser ? currentUser.club : (currentLang === 'ar' ? 'أكاديمية HQ الرياضية' : 'HQ Sports Academy'),
      authorPhoto: currentUser
        ? currentUser.photo
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
      sport: selectedSport,
      isOfficialHQ: currentUser?.isAdmin || false,
      content: postContent.trim(),
      matchTag: matchTag.trim() || undefined
    });

    setPostContent('');
    setMatchTag('');
    setIsExpandingNewPost(false);
  };

  const filteredPosts = posts.filter((p) => {
    if (filterSport === 'soccer') return p.sport === 'soccer';
    if (filterSport === 'handball') return p.sport === 'handball';
    if (filterSport === 'official') return p.isOfficialHQ;
    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#141824] via-[#1a2130] to-[#141824] border border-[#232c3f] rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 ltr:right-0 rtl:left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t.feedTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              {t.feedSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
            <Trophy className="w-4 h-4 shrink-0" />
            <span>HQ Match & Drill Net</span>
          </div>
        </div>
      </div>

      {/* Create Post Box */}
      <div className="bg-[#131722] border border-[#222a3a] rounded-2xl p-4 sm:p-5 shadow-xl transition-all">
        <form onSubmit={handlePublish}>
          <div className="flex items-start gap-3">
            <img
              src={currentUser?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
              }}
            />
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onFocus={() => setIsExpandingNewPost(true)}
                rows={isExpandingNewPost ? 3 : 2}
                placeholder={t.postPlaceholder}
                className="w-full bg-[#0c0e14] border border-[#232b3c] rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 resize-none transition-all placeholder:text-slate-500"
              />

              {isExpandingNewPost && (
                <div className="mt-3 pt-3 border-t border-[#1e2535] flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value as SportType | 'general')}
                      className="bg-[#171d2b] border border-[#283244] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                    >
                      <option value="soccer">⚽ كرة قدم / Soccer</option>
                      <option value="handball">🤾 كرة يد / Handball</option>
                      <option value="general">📋 عام / Fitness</option>
                    </select>

                    <input
                      type="text"
                      value={matchTag}
                      onChange={(e) => setMatchTag(e.target.value)}
                      placeholder={
                        currentLang === 'ar'
                          ? 'وسم المباراة (مثال: الأهلي ضد الزمالك)'
                          : 'Match tag (e.g. Finals Game)'
                      }
                      className="bg-[#171d2b] border border-[#283244] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400 placeholder:text-slate-500 w-44"
                    />
                  </div>

                  <div className="flex items-center gap-2 ltr:ml-auto rtl:mr-auto">
                    <button
                      type="button"
                      onClick={() => setIsExpandingNewPost(false)}
                      className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5"
                    >
                      {t.btnCancel}
                    </button>
                    <button
                      type="submit"
                      disabled={!postContent.trim()}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-50 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 ltr:rotate-0 rtl:rotate-180" />
                      <span>{t.publishBtn}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Filter Tabs (Functional segmented buttons per design spec) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#121620] border border-[#202737] rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setFilterSport('all')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            filterSport === 'all'
              ? 'bg-amber-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{t.filterAll}</span>
        </button>

        <button
          onClick={() => setFilterSport('soccer')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            filterSport === 'soccer'
              ? 'bg-emerald-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>{t.filterSoccer}</span>
        </button>

        <button
          onClick={() => setFilterSport('handball')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            filterSport === 'handball'
              ? 'bg-sky-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>{t.filterHandball}</span>
        </button>

        <button
          onClick={() => setFilterSport('official')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            filterSport === 'official'
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.filterOfficial}</span>
        </button>
      </div>

      {/* Posts Feed List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const totalReactions =
            post.reactions.soccer +
            post.reactions.handball +
            post.reactions.fire +
            post.reactions.target +
            post.reactions.glove;

          return (
            <article
              key={post.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                post.isOfficialHQ
                  ? 'bg-[#151a24] border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-[#131722] border-[#202737] shadow-md'
              }`}
            >
              {/* Post Header */}
              <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectAthleteByName?.(post.authorName)}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img
                      src={post.authorPhoto}
                      alt={post.authorName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40 hover:border-amber-400 transition-colors"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
                      }}
                    />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onSelectAthleteByName?.(post.authorName)}
                        className="font-bold text-white text-sm hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {post.authorName}
                      </h3>
                      {post.isOfficialHQ && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{t.officialHqBadge}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span>{post.authorClub}</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                      {post.sport !== 'general' && (
                        <>
                          <span>·</span>
                          <span className="text-amber-400/90 font-medium">
                            {post.sport === 'soccer' ? '⚽ كرة قدم' : '🤾 كرة يد'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {post.matchTag && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#1c2333] border border-[#2b354c] text-amber-300/90 max-w-[150px] truncate">
                    {post.matchTag}
                  </span>
                )}
              </div>

              {/* Post Body */}
              <div className="px-4 sm:px-5 pb-4">
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Reaction & Comment Count Bar */}
              <div className="px-4 sm:px-5 py-2.5 border-t border-[#1d2331] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1 rtl:space-x-reverse text-sm">
                    {post.reactions.fire > 0 && <span>🔥</span>}
                    {post.reactions.soccer > 0 && <span>⚽</span>}
                    {post.reactions.handball > 0 && <span>🤾</span>}
                    {post.reactions.target > 0 && <span>🎯</span>}
                    {post.reactions.glove > 0 && <span>🧤</span>}
                  </div>
                  <span className="tabular-nums font-semibold text-slate-300">
                    {totalReactions}
                  </span>
                </div>
                <button
                  onClick={() => onOpenComments(post)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="tabular-nums font-semibold">{post.comments.length}</span>{' '}
                  {t.commentsCount}
                </button>
              </div>

              {/* Action Buttons: 5 Sports Reactions + Comment Button */}
              <div className="grid grid-cols-6 border-t border-[#1d2331] bg-[#0f131c]">
                <button
                  onClick={() => onReactPost(post.id, 'soccer')}
                  className="py-2.5 flex items-center justify-center gap-1 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold"
                  title={t.reactions.soccer}
                >
                  <span className="text-sm">⚽</span>
                  <span className="hidden sm:inline text-[11px] tabular-nums font-bold">
                    {post.reactions.soccer > 0 && post.reactions.soccer}
                  </span>
                </button>

                <button
                  onClick={() => onReactPost(post.id, 'handball')}
                  className="py-2.5 flex items-center justify-center gap-1 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold"
                  title={t.reactions.handball}
                >
                  <span className="text-sm">🤾</span>
                  <span className="hidden sm:inline text-[11px] tabular-nums font-bold">
                    {post.reactions.handball > 0 && post.reactions.handball}
                  </span>
                </button>

                <button
                  onClick={() => onReactPost(post.id, 'fire')}
                  className="py-2.5 flex items-center justify-center gap-1 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold"
                  title={t.reactions.fire}
                >
                  <span className="text-sm">🔥</span>
                  <span className="hidden sm:inline text-[11px] tabular-nums font-bold">
                    {post.reactions.fire > 0 && post.reactions.fire}
                  </span>
                </button>

                <button
                  onClick={() => onReactPost(post.id, 'target')}
                  className="py-2.5 flex items-center justify-center gap-1 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold"
                  title={t.reactions.target}
                >
                  <span className="text-sm">🎯</span>
                  <span className="hidden sm:inline text-[11px] tabular-nums font-bold">
                    {post.reactions.target > 0 && post.reactions.target}
                  </span>
                </button>

                <button
                  onClick={() => onReactPost(post.id, 'glove')}
                  className="py-2.5 flex items-center justify-center gap-1 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold"
                  title={t.reactions.glove}
                >
                  <span className="text-sm">🧤</span>
                  <span className="hidden sm:inline text-[11px] tabular-nums font-bold">
                    {post.reactions.glove > 0 && post.reactions.glove}
                  </span>
                </button>

                <button
                  onClick={() => onOpenComments(post)}
                  className="py-2.5 flex items-center justify-center gap-1.5 text-slate-300 hover:text-amber-400 hover:bg-[#151b27] transition-all cursor-pointer text-xs font-semibold border-s border-[#1d2331]"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{t.addCommentBtn}</span>
                </button>
              </div>

              {/* Preview Recent Comment if exists */}
              {post.comments.length > 0 && (
                <div className="p-3 bg-[#0d1017] border-t border-[#1a202c] text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">
                      {post.comments[post.comments.length - 1].userName}:
                    </span>
                    <p className="text-slate-300 line-clamp-1 flex-1">
                      {post.comments[post.comments.length - 1].text}
                    </p>
                    {post.comments.length > 1 && (
                      <button
                        onClick={() => onOpenComments(post)}
                        className="text-[11px] text-slate-500 hover:text-amber-400 shrink-0 cursor-pointer"
                      >
                        +{post.comments.length - 1}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

    </div>
  );
};
