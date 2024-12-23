export interface HashtagPost {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  username: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface HashtagSearchResponse {
  data: HashtagPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}
