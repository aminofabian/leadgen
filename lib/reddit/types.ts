// lib/reddit/types.ts
export interface RedditListing<T> {
  kind: string;
  data: {
    after: string | null;
    before: string | null;
    children: Array<{
      kind: string;
      data: T;
    }>;
  };
}

export interface RedditUser {
  name: string;
  total_karma: number;
  link_karma: number;
  comment_karma: number;
  created_utc: number;
}

export interface RedditKarma {
  sr: string;  // subreddit name
  link_karma: number;
  comment_karma: number;
}

export interface RedditPrefs {
  enable_notifications: boolean;
  threaded_messages: boolean;
  hide_ups: boolean;
  hide_downs: boolean;
  over_18: boolean;
  // Add other preferences as needed
}

// lib/reddit/client.ts
export class RedditClient {
  private accessToken: string;
  private baseUrl = 'https://oauth.reddit.com';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch<T>(
    endpoint: string, 
    options: RequestInit = {},
    params: Record<string, string> = {}
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add raw_json=1 to avoid HTML entity encoding
    url.searchParams.append('raw_json', '1');
    
    // Add any additional query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'User-Agent': 'YourApp/1.0',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getMe(): Promise<RedditUser> {
    return this.fetch<RedditUser>('/api/v1/me');
  }

  async getKarmaBreakdown(): Promise<RedditKarma[]> {
    return this.fetch<RedditKarma[]>('/api/v1/me/karma');
  }

  async getPreferences(): Promise<RedditPrefs> {
    return this.fetch<RedditPrefs>('/api/v1/me/prefs');
  }

  async getSubreddits(params: {
    limit?: number;
    after?: string;
    before?: string;
    count?: number;
    show?: 'all';
  } = {}) {
    return this.fetch<RedditListing<any>>('/subreddits/mine/subscriber', {}, {
      limit: params.limit?.toString() || '25',
      after: params.after || '',
      before: params.before || '',
      count: params.count?.toString() || '0',
      show: params.show || '',
    });
  }
}