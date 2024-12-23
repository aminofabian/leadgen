'use client';

import { useState, useEffect } from 'react';
import { Hash, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Hashtag {
  id: string;
  name: string;
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  searchedAt: string;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export default function SavedHashtags() {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hashtagsPerPage = 10;
  const totalPages = Math.ceil(hashtags.length / hashtagsPerPage);

  const fetchHashtags = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hashtags');
      if (!response.ok) {
        throw new Error('Failed to fetch hashtags');
      }
      const data = await response.json();
      setHashtags(data);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch hashtags');
      toast.error('Failed to load saved hashtags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHashtags();
  }, []);

  const getCurrentPageHashtags = () => {
    const startIndex = (currentPage - 1) * hashtagsPerPage;
    const endIndex = startIndex + hashtagsPerPage;
    return hashtags.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <div className="w-full p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f059da]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (hashtags.length === 0) {
    return (
      <div className="w-full p-8 text-center text-white/70">
        No saved hashtags yet. Search and save some hashtags to see them here!
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getCurrentPageHashtags().map((hashtag) => (
          <div
            key={hashtag.id}
            className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-black/50 via-black/30 to-black/10 p-4 hover:border-[#f059da]/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10">
                  <Hash className="w-5 h-5 text-[#f059da]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">#{hashtag.name}</h3>
                  <p className="text-sm text-white/50">
                    {formatDistanceToNow(new Date(hashtag.searchedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">{formatNumber(hashtag.postsCount)}</p>
                <p className="text-xs text-white/50">Posts</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">{formatNumber(hashtag.avgLikes)}</p>
                <p className="text-xs text-white/50">Avg Likes</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">{formatNumber(hashtag.avgComments)}</p>
                <p className="text-xs text-white/50">Avg Comments</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center px-4 text-white/70">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
