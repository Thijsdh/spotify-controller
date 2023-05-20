import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, sessionOptions } from '../../../lib/session';
import { SpotifyCurrentlyPlayingResponse } from '@/types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const access_token = await getAccessToken(req.session);
	if (!access_token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		const currentlyPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		const currentlyPlayingData: SpotifyCurrentlyPlayingResponse = await currentlyPlayingResponse.json();

		res.status(200).json(currentlyPlayingData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
