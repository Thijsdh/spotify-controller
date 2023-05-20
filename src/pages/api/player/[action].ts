import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, sessionOptions } from '../../../../lib/session';

export const Actions = ['play', 'pause', 'next', 'previous'] as const;

const methods = {
	play: 'PUT',
	pause: 'PUT',
	next: 'POST',
	previous: 'POST',
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PUT') return res.status(405).end();

	const access_token = await getAccessToken(req.session);
	if (!access_token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const action = req.query.action as (typeof Actions)[number];

	if (!Actions.includes(action)) {
		return res.status(400).json({ error: 'Invalid action' });
	}

	try {
		await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
			method: methods[action],
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
