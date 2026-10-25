import React, { useState } from 'react';
import { FeedPost, AthleteUser, Language } from '../types';
import { translations } from '../translations';
import { X, Send, MessageCircle } from 'lucide-react';

interface CommentsModalProps {
  post: FeedPost | null;
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
  currentUser: AthleteUser | null;
  currentLang: Language;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  onClose,
  onAddComment,
  currentUser,
  currentLang
}) => {
  const [commentText, setCommentText] = useState('');
  const t = translations[currentLang];

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="w-full sm:max-w-lg bg-[#141822] border border-[#232c3f] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#232d40] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">
              {t.commentsCount} ({post.comments.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1c2232] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post Brief Reference */}
        <div className="px-5 py-3 bg-[#0d1017] border-b border-[#1f2638] flex items-center gap-3">
          <img
            src={post.authorPhoto}
            alt={post.authorName}
            className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
            }}
          />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-xs text-white block truncate">{post.authorName}</span>
            <p className="text-[11px] text-slate-400 line-clamp-1">{post.content}</p>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {post.comments.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
              <p>{t.noCommentsYet}</p>
            </div>
          ) : (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded-xl bg-[#0e1219] border border-[#21293a] flex gap-3 text-xs"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shrink-0 flex items-center justify-center text-black font-bold text-[10px]">
                  {comment.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-amber-400 truncate">
                      {comment.userName}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed break-words">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleSubmit} className="p-3.5 bg-[#0f131c] border-t border-[#222a3a] flex gap-2">
          <input
            type="text"
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              currentUser
                ? `${t.commentPlaceholder}`
                : currentLang === 'ar'
                ? 'اكتب تعليقك كضيف أو سجل حسابك...'
                : 'Write your comment...'
            }
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#171d2b] border border-[#2b364c] text-white text-xs focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            <Send className="w-3.5 h-3.5 ltr:rotate-0 rtl:rotate-180" />
            <span className="hidden sm:inline">{t.submitComment}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
