export interface RelatedHashtag {
  name: string;
  posts: number;
}

export interface Hashtag {
  id: string;
  name: string;
  posts: number;
  avgLikes: number;
  avgComments: number;
  searchedAt: Date;
  relatedHashtags: RelatedHashtag[];
}
