'use client';

import { useState, useEffect } from 'react';
import { Hash, ChevronLeft, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

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

export default function HashtagsPage() {
  const router = useRouter();
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const hashtagsPerPage = 12;
  const totalPages = Math.ceil(hashtags.length / hashtagsPerPage);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#f059da15,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_400px,#f059da08,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0A0B_80%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 max-w-[100vw] overflow-x-hidden">
          {/* Header */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <Button
                  onClick={() => router.back()}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white transition-colors shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-2 min-w-0">
                  <Hash className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-[#f059da] shrink-0" />
                  <span className="truncate">Saved Hashtags</span>
                </h1>
              </div>
              <Button
                onClick={() => router.push('/hashtag-search')}
                size="sm"
                className="w-full sm:w-auto bg-[#f059da] hover:bg-[#f059da]/90 text-white shadow-lg shadow-[#f059da]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#f059da]/30 shrink-0"
              >
                <Search className="h-4 w-4 mr-1.5" />
                <span className="truncate">Search New</span>
              </Button>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#f059da]/20 animate-pulse" />
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#f059da] border-t-transparent relative" />
              </div>
            </div>
          ) : error ? (
            <div className={`text-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] p-4 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-red-500/10 text-red-500 px-3 py-2 rounded-lg border border-red-500/20 max-w-[calc(100vw-2rem)] w-full text-sm sm:text-base">
                <p className="truncate">{error}</p>
              </div>
            </div>
          ) : hashtags.length === 0 ? (
            <div className={`text-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] p-4 flex flex-col items-center justify-center gap-4 sm:gap-6 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#f059da]/10 flex items-center justify-center shrink-0">
                <Hash className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#f059da]" />
              </div>
              <div className="space-y-2 max-w-[calc(100vw-2rem)]">
                <p className="text-lg sm:text-xl font-medium text-white">No saved hashtags yet</p>
                <p className="text-sm text-white/50 mx-auto">Start by searching for hashtags to analyze their performance</p>
              </div>
              <Button
                onClick={() => router.push('/hashtag-search')}
                size="sm"
                className="bg-[#f059da] hover:bg-[#f059da]/90 text-white shadow-lg shadow-[#f059da]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#f059da]/30"
              >
                <Search className="h-4 w-4 mr-1.5" />
                <span>Start Searching</span>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
                {getCurrentPageHashtags().map((hashtag, index) => (
                  <div
                    key={hashtag.id}
                    className={`group relative rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:border-[#f059da]/20 hover:bg-white/[0.04] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative flex flex-col gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#f059da]/10 group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <Hash className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#f059da]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300 truncate">
                            #{hashtag.name}
                          </h3>
                          <p className="text-xs text-white/50 truncate">
                            {formatDistanceToNow(new Date(hashtag.searchedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="space-y-0.5 sm:space-y-1 text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                          <p className="text-xs sm:text-sm lg:text-base font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300">
                            {formatNumber(hashtag.postsCount)}
                          </p>
                          <p className="text-[10px] text-white/50">Posts</p>
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                          <p className="text-xs sm:text-sm lg:text-base font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300">
                            {formatNumber(hashtag.avgLikes)}
                          </p>
                          <p className="text-[10px] text-white/50">Likes</p>
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 text-center p-1.5 sm:p-2 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                          <p className="text-xs sm:text-sm lg:text-base font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300">
                            {formatNumber(hashtag.avgComments)}
                          </p>
                          <p className="text-[10px] text-white/50">Comments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={`flex flex-wrap justify-center items-center gap-1.5 mt-4 sm:mt-6 lg:mt-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <Button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white disabled:opacity-50 transition-colors h-6 w-6 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex flex-wrap items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        className={`
                          h-6 w-6 p-0
                          ${currentPage === page 
                            ? "bg-[#f059da] hover:bg-[#f059da]/90 text-white shadow-lg shadow-[#f059da]/20" 
                            : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                          }
                          transition-all duration-300 text-xs
                        `}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white disabled:opacity-50 transition-colors h-6 w-6 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
