
export type UserRole = 'ARTIST' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  stage_name: string;
  role: UserRole;
}

export enum ReleaseStatus {
  PENDING = 'PENDING',
  DISTRIBUTED = 'DISTRIBUTED',
  REJECTED = 'REJECTED'
}

export interface Track {
  id: string;
  song_title: string;
  isrc: string;
  audio_url: string;
  artist_name: string;
}

export interface Release {
  id: string;
  title: string;
  upc: string;
  genre: string;
  release_date: string;
  cover_url: string;
  status: ReleaseStatus;
  artistId: string;
  tracks: Track[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
