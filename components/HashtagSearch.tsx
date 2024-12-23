'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Search, Loader2, Hash, Heart, MessageCircle, BookmarkPlus } from 'lucide-react';

interface HashtagData {
  additional_data?: {
    formatted_media_count?: string;
    media_count?: number;
    name?: string;
    subtitle?: string;
  };
  items?: Array<{
    id: string;
    code?: string;
    taken_at?: number;
    pk?: string;
    media_type?: number;
    caption_text?: string;
    like_count?: number;
    comment_count?: number;
    display_url?: string;
    video_url?: string;
    thumbnail_url?: string;
    user?: {
      pk?: string;
      username?: string;
      full_name?: string;
      profile_pic_url?: string;
    };
  }>;
  total?: number;
}

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const extractHashtags = (text: string | undefined): string[] => {
  if (!text) return [];
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  return text.match(hashtagRegex) || [];
};

const formatCaption = (text: string | undefined): JSX.Element => {
  if (!text) return <></>;
  const words = text.split(/(\s+)/);
  return (
    <>
      {words.map((word, index) => {
        if (word.startsWith('#')) {
          return (
            <span key={index} className="text-blue-600 hover:underline cursor-pointer">
              {word}
            </span>
          );
        }
        return <span key={index}>{word}</span>;
      })}
    </>
  );
};

export default function HashtagSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hashtagData, setHashtagData] = useState<HashtagData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [isSaving, setIsSaving] = useState(false);

  const getCurrentPagePosts = () => {
    if (!hashtagData?.items) {
      console.log('No items in hashtagData:', hashtagData);
      return [];
    }
    console.log('Total items:', hashtagData.items.length);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const posts = hashtagData.items.slice(startIndex, endIndex);
    console.log(`Getting posts for page ${currentPage}:`, {
      startIndex,
      endIndex,
      postsLength: posts.length,
      firstPost: posts[0]
    });
    return posts;
  };

  const totalPages = hashtagData?.items ? Math.ceil(hashtagData.items.length / postsPerPage) : 0;
  console.log('Pagination info:', {
    currentPage,
    totalPages,
    totalItems: hashtagData?.items?.length || 0,
    postsPerPage
  });

  const handlePageChange = (pageNumber: number) => {
    console.log('Changing to page:', pageNumber);
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchHashtag = async (term: string) => {
    if (!term) {
      toast.error("Please enter a hashtag to search");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      console.log('Searching for hashtag:', term);
      const response = await fetch(`/api/instagram/hashtag?hashtag=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const result = await response.json();
      console.log('Raw API response:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Check the structure of the response
      console.log('Response data structure:', {
        hasData: !!result.data,
        hasItems: !!result.data?.items,
        itemsLength: result.data?.items?.length,
        firstItem: result.data?.items?.[0]
      });

      setHashtagData(result.data);
      setSearchQuery(term);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error('Failed to fetch hashtag data');
    } finally {
      setLoading(false);
    }
  };

  const getProxiedImageUrl = (originalUrl: string | undefined) => {
    if (!originalUrl) {
      return '/default-profile.png';
    }
    return `/api/instagram/proxy-image?url=${encodeURIComponent(originalUrl)}`;
  };

  const calculateAverages = () => {
    if (!hashtagData?.items?.length) return { avgLikes: 0, avgComments: 0 };
    
    const totals = hashtagData.items.reduce((acc, item) => ({
      likes: acc.likes + (item.like_count || 0),
      comments: acc.comments + (item.comment_count || 0)
    }), { likes: 0, comments: 0 });

    return {
      avgLikes: Math.round(totals.likes / hashtagData.items.length),
      avgComments: Math.round(totals.comments / hashtagData.items.length)
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHashtag(searchTerm);
    }
  };

  const saveHashtag = async () => {
    if (!hashtagData?.additional_data?.name) {
      toast.error("No hashtag data available to save");
      return;
    }
    
    setIsSaving(true);
    try {
      const { avgLikes, avgComments } = calculateAverages();
      const response = await fetch('/api/hashtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: hashtagData.additional_data.name,
          mediaCount: hashtagData.additional_data.media_count || 0,
          avgLikes: Math.round(avgLikes) || 0,
          avgComments: Math.round(avgComments) || 0,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save hashtag');
      }

      const savedHashtag = await response.json();
      toast.success(`Hashtag #${savedHashtag.name} saved successfully!`);
    } catch (error) {
      console.error('Error saving hashtag:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save hashtag');
    } finally {
      setIsSaving(false);
    }
  };

  const { avgLikes, avgComments } = calculateAverages();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter hashtag to search..."
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border border-white/10 rounded-lg bg-black/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#f059da]/50"
          />
          <button
            onClick={() => searchHashtag(searchTerm)}
            disabled={loading || !searchTerm.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-[#ee46c7] text-white rounded-lg hover:bg-[#f059da] disabled:opacity-50 disabled:hover:bg-[#ee46c7] transition-colors duration-200 md:w-auto w-12"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-white" />
            )}
            <span className="md:inline hidden">
              {loading ? 'Searching...' : 'Search'}
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Searching hashtags...</p>
          </div>
        )}

        {hashtagData && (
          <div className="space-y-8">
            {/* Hashtag Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-6 mb-6">
                {hashtagData.items?.[0]?.user?.profile_pic_url && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100">
                    <img
                      src={getProxiedImageUrl(hashtagData.items[0].user.profile_pic_url)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">
                      #{hashtagData.additional_data?.name || searchQuery}
                    </h2>
                    {hashtagData.additional_data?.formatted_media_count && (
                      <p className="text-lg text-blue-600 font-semibold">
                        {hashtagData.additional_data.formatted_media_count} posts
                      </p>
                    )}
                  </div>
                  <button
                    onClick={saveHashtag}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ee46c7] text-white rounded-lg hover:bg-[#f059da] disabled:opacity-50 disabled:hover:bg-[#ee46c7] transition-colors duration-200"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <BookmarkPlus className="w-5 h-5" />
                    )}
                    <span>{isSaving ? 'Saving...' : 'Save'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                <div className="bg-black/20 p-3 md:p-4 rounded-lg flex items-center sm:flex-col sm:items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10">
                    <Hash className="w-5 h-5 text-[#f059da]" />
                  </div>
                  <div className="flex sm:flex-col sm:items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-white/70 hidden sm:block sm:mb-2">Total Posts</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {formatCount(hashtagData.additional_data?.media_count || 0)}
                    </p>
                  </div>
                </div>
                <div className="bg-black/20 p-3 md:p-4 rounded-lg flex items-center sm:flex-col sm:items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10">
                    <Heart className="w-5 h-5 text-[#f059da]" />
                  </div>
                  <div className="flex sm:flex-col sm:items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-white/70 hidden sm:block sm:mb-2">Average Likes</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {formatCount(avgLikes)}
                    </p>
                  </div>
                </div>
                <div className="bg-black/20 p-3 md:p-4 rounded-lg flex items-center sm:flex-col sm:items-center gap-3 sm:col-span-2 md:col-span-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10">
                    <MessageCircle className="w-5 h-5 text-[#f059da]" />
                  </div>
                  <div className="flex sm:flex-col sm:items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-white/70 hidden sm:block sm:mb-2">Average Comments</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {formatCount(avgComments)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {getCurrentPagePosts().map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative pb-[100%]">
                      {item.thumbnail_url && (
                        <img
                          src={getProxiedImageUrl(item.thumbnail_url)}
                          alt={item.caption_text || 'Instagram post'}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      {item.video_url && (
                        <video
                          src={item.video_url}
                          poster={item.thumbnail_url ? getProxiedImageUrl(item.thumbnail_url) : undefined}
                          controls
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        {item.user && (
                          <div className="flex items-center gap-3">
                            {item.user.profile_pic_url && (
                              <img
                                src={getProxiedImageUrl(item.user.profile_pic_url)}
                                alt={item.user.username || 'User'}
                                className="w-10 h-10 rounded-full"
                              />
                            )}
                            <span className="font-medium text-gray-900">{item.user.username}</span>
                          </div>
                        )}
                        {item.taken_at && (
                          <span className="text-sm text-gray-500 hidden md:block">{formatDate(item.taken_at)}</span>
                        )}
                      </div>

                      {/* Caption and Hashtags */}
                      {item.caption_text && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            {formatCaption(item.caption_text)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {extractHashtags(item.caption_text).map((hashtag, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  const tag = hashtag.slice(1);
                                  setSearchTerm(tag);
                                  searchHashtag(tag);
                                }}
                                className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                              >
                                {hashtag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                          {formatCount(item.like_count || 0)}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                          </svg>
                          {formatCount(item.comment_count || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">How to Use This Data</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Engagement Insights</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>
                      <strong>Average Likes ({formatCount(avgLikes)}):</strong> Posts with likes above this number are performing well for this hashtag
                    </li>
                    <li>
                      <strong>Average Comments ({formatCount(avgComments)}):</strong> Higher comment counts often indicate more engaging content
                    </li>
                    <li>
                      <strong>Post Timing:</strong> Note the posting times of high-performing content to optimize your posting schedule
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Content Strategy</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>
                      <strong>Related Hashtags:</strong> Click on hashtags in posts to discover related communities and expand your reach
                    </li>
                    <li>
                      <strong>Content Type:</strong> Look for patterns in successful posts (images vs. videos, caption length, etc.)
                    </li>
                    <li>
                      <strong>Total Posts ({formatCount(hashtagData.additional_data?.media_count || 0)}):</strong> Higher numbers indicate more active hashtags, but also more competition
                    </li>
                  </ul>
                </div>

                <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Pro Tips</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>
                      Mix popular hashtags ({hashtagData.additional_data?.media_count || 0 > 500000 ? 'like this one' : 'larger than this'}) with niche ones for better visibility
                    </li>
                    <li>
                      Analyze captions of high-performing posts to understand what messaging resonates with this audience
                    </li>
                    <li>
                      Save posts with {avgLikes * 1.5}+ likes as references for content that works well in this niche
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {!searchTerm && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">Enter a hashtag to start searching</p>
          </div>
        )}

        {hashtagData === null && !loading && searchTerm && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No results found for #{searchTerm}</p>
          </div>
        )}
      </div>
    </div>
  );
}