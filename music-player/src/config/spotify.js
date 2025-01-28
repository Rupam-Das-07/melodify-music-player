export const SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID';
export const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
export const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'streaming'
].join(' ');
