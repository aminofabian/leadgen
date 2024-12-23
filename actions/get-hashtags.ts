'use server';

import db from "@/lib/db";
import { auth } from "@/auth";
import { Hashtag, RelatedHashtag } from "@/types/hashtag";

type HashtagWithRelations = {
  id: string;
  name: string;
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  searchedAt: Date;
  hashtagSearchId: string | null;
  relatedToHashtags: {
    id: string;
    createdAt: Date;
    hashtagId: string;
    relatedHashtagId: string;
    relatedHashtag: {
      name: string;
      postsCount: number;
    };
  }[];
};

export async function getHashtags(page: number = 1, pageSize: number = 10): Promise<{ hashtags: Hashtag[]; total: number }> {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      throw new Error('Authentication required');
    }

    // Get user from database using email
    const user = await db.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const skip = (page - 1) * pageSize;
    const maxResults = 100;

    const [hashtags, total] = await Promise.all([
      db.hashtag.findMany({
        where: {
          userId: user.id,
          name: {
            not: '',
            contains: ''  // This ensures the field is not null
          }
        },
        skip,
        take: Math.min(pageSize, maxResults - skip),
        orderBy: [
          {
            searchedAt: 'desc'
          }
        ],
        include: {
          relatedToHashtags: {
            include: {
              relatedHashtag: {
                select: {
                  name: true,
                  postsCount: true
                }
              }
            }
          }
        }
      }),
      db.hashtag.count({
        where: {
          userId: user.id,
          name: {
            not: '',
            contains: ''  // This ensures the field is not null
          }
        }
      })
    ]);

    const formattedHashtags: Hashtag[] = hashtags.map((hashtag: HashtagWithRelations) => ({
      id: hashtag.id,
      name: hashtag.name,
      posts: hashtag.postsCount,
      avgLikes: hashtag.avgLikes,
      avgComments: hashtag.avgComments,
      searchedAt: hashtag.searchedAt,
      relatedHashtags: hashtag.relatedToHashtags.map((relation): RelatedHashtag => ({
        name: relation.relatedHashtag.name,
        posts: relation.relatedHashtag.postsCount
      }))
    }));

    return {
      hashtags: formattedHashtags,
      total: Math.min(total, maxResults)
    };
  } catch (error) {
    console.error('Error in getHashtags:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch hashtags');
  }
}
