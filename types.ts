export interface RedditAuthResponse {
  url: string;
  error?: never;
}

export interface RedditAuthError {
  error: string;
  url?: never;
}

export type RedditAuthResult = RedditAuthResponse | RedditAuthError;
