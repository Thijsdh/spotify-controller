import { SpotifyTokenResponse, Tokens } from '@/types';
import type { IronSession, IronSessionOptions } from 'iron-session';
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

export const sessionOptions: IronSessionOptions = {
	password: process.env.COOKIE_PASSWORD as string,
	cookieName: 'session',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
};

export const getAccessToken = async (session: IronSession) => {
	if (!session.tokens) return null;
	if (session.tokens.expires_at < Date.now()) {
		// refresh token
		const searchParams = new URLSearchParams();
		searchParams.append('grant_type', 'refresh_token');
		searchParams.append('refresh_token', session.tokens.refresh_token);

		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
					'base64'
				)}`,
			},
			body: searchParams.toString(),
		});

		const data: SpotifyTokenResponse = await response.json();

		const tokens: Tokens = {
			access_token: data.access_token,
			refresh_token: data.refresh_token,
			expires_at: Date.now() + data.expires_in * 1000,
		};
		session.tokens = tokens;
		await session.save();
	}

	return session.tokens.access_token;
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
	interface IronSessionData {
		oauthState?: string;
		tokens?: Tokens;
	}
}
