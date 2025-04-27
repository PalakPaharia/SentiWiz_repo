export interface InstagramAuthResponse {
  code: string;
  state?: string;
}

export interface InstagramTokenResponse {
  access_token: string;
  user_id: string;
}

export interface InstagramUserProfile {
  id: string;
  username: string;
}

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username: string;
}

export interface InstagramComment {
  id: string;
  text: string;
  timestamp: string;
  username: string;
}

export interface InstagramMediaResponse {
  data: InstagramMedia[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface InstagramCommentsResponse {
  data: InstagramComment[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
} 