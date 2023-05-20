import { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { SpotifyTokenResponse, Tokens } from '@/types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;

	const authorizationCode = req.query.code as string;
	const state = req.query.state as string;

	if (state !== req.session.oauthState) {
		res.status(400).json({ error: 'Invalid state' });
		return;
	}

	try {
		const searchParams = new URLSearchParams();
		searchParams.append('grant_type', 'authorization_code');
		searchParams.append('code', authorizationCode);
		searchParams.append('redirect_uri', SPOTIFY_REDIRECT_URI as string);

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
		req.session.tokens = tokens;
		await req.session.save();

		res.redirect('/');
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
