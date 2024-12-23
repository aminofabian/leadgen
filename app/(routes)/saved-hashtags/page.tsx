"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Hash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { getHashtags } from "@/actions/get-hashtags";
import { Hashtag } from "@/types/hashtag";

export default function SavedHashtagsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [totalHashtags, setTotalHashtags] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchHashtags(currentPage);
  }, []);

  const fetchHashtags = async (page: number) => {
    try {
      setLoading(true);
      const response = await getHashtags(page);
      setHashtags(response.hashtags);
      setTotalHashtags(response.total);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load hashtags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchHashtags(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Saved Hashtags</h1>
              <p className="text-white/70">
                {totalHashtags} {totalHashtags === 1 ? 'hashtag' : 'hashtags'} saved
                {totalHashtags > 100 && ' (showing top 100)'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push('/hashtag-search')}
            className="bg-gradient-to-r from-[#f059da] to-[#f0a33d] text-white hover:opacity-90"
          >
            Search New Hashtags
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : hashtags.length === 0 ? (
          <div className="text-center py-12">
            <Hash className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No hashtags saved yet</h3>
            <p className="text-white/70 mb-4">Start by searching and saving some hashtags</p>
            <Button
              onClick={() => router.push('/hashtag-search')}
              className="bg-gradient-to-r from-[#f059da] to-[#f0a33d] text-white hover:opacity-90"
            >
              Search Hashtags
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hashtags.map((hashtag: Hashtag) => (
                <Card
                  key={hashtag.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 border-0 p-4 hover:from-white/15 hover:to-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">#{hashtag.name}</h3>
                      <p className="text-sm text-white/60">
                        Searched {format(new Date(hashtag.searchedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-sm text-white/60">Posts</p>
                      <p className="text-white font-medium">{formatNumber(hashtag.posts)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Avg. Likes</p>
                      <p className="text-white font-medium">{formatNumber(hashtag.avgLikes)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Avg. Comments</p>
                      <p className="text-white font-medium">{formatNumber(hashtag.avgComments)}</p>
                    </div>
                  </div>
                  {hashtag.relatedHashtags.length > 0 && (
                    <div>
                      <p className="text-sm text-white/60 mb-2">Related Hashtags</p>
                      <div className="flex flex-wrap gap-2">
                        {hashtag.relatedHashtags.map((related: { name: string }) => (
                          <span
                            key={related.name}
                            className="text-sm bg-white/10 text-white/80 px-2 py-1 rounded-full"
                          >
                            #{related.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center mt-8 gap-4">
                <p className="text-white/70">
                  Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalHashtags)} of{' '}
                  {totalHashtags > 100 ? '100' : totalHashtags} hashtags
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="text-white/70 hover:text-white disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Always show first and last page
                      if (page === 1 || page === totalPages) return true;
                      // Show pages around current page
                      return Math.abs(page - currentPage) <= 2;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      if (index > 0 && page - array[index - 1] > 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="text-white/50 px-2">...</span>
                        );
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-[#f059da] to-[#f0a33d] text-white"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  <Button
                    variant="ghost"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="text-white/70 hover:text-white disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
