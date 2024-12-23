export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, postsCount, avgLikes, avgComments, relatedHashtags, posts } = body;

    // Create the main hashtag first
    const hashtag = await db.hashtag.create({
      data: {
        userId: session.user.id,
        name,
        postsCount,
        avgLikes,
        avgComments,
        posts: {
          create: posts.map((post: any) => ({
            postId: post.postId,
            caption: post.caption,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            postedAt: post.postedAt,
          })),
        },
      },
    });

    // Create related hashtags and relationships
    const relatedHashtagRecords = relatedHashtags && relatedHashtags.length > 0
      ? await Promise.all(
          relatedHashtags.map(async (tag: string) => {
            return await db.hashtag.create({
              data: {
                userId: session.user.id,
                name: tag,
              },
            });
          })
        )
      : [];

    // Create relationships between main hashtag and related hashtags
    if (relatedHashtagRecords.length > 0) {
      await Promise.all(
        relatedHashtagRecords.map(async (relatedHashtag) => {
          return await db.hashtagRelation.create({
            data: {
              hashtagId: hashtag.id,
              relatedHashtagId: relatedHashtag.id,
            },
          });
        })
      );
    }

    // Create the HashtagSearch record and link it to all hashtags
    const hashtagSearch = await db.hashtagSearch.create({
      data: {
        userId: session.user.id,
        query: name,
      }
    });

    // Update all hashtags with the search ID
    await db.hashtag.update({
      where: { id: hashtag.id },
      data: { hashtagSearchId: hashtagSearch.id }
    });

    if (relatedHashtagRecords.length > 0) {
      await Promise.all(
        relatedHashtagRecords.map(async (relatedHashtag) => {
          return await db.hashtag.update({
            where: { id: relatedHashtag.id },
            data: { hashtagSearchId: hashtagSearch.id }
          });
        })
      );
    }

    return NextResponse.json(hashtag);
  } catch (error) {
    console.error("[HASHTAG_SAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
