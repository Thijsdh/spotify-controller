import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../../lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } = process.env;

	// Generate a secure random string to use as the state parameter using the crypto module.
	const oauthState = crypto.randomUUID();
	req.session.oauthState = oauthState;
	await req.session.save();

	// Split this redirect into multiple lines for readability.
	const params = new URLSearchParams({
		client_id: SPOTIFY_CLIENT_ID as string,
		response_type: 'code',
		redirect_uri: SPOTIFY_REDIRECT_URI as string,
		scope: SPOTIFY_SCOPES as string,
		state: oauthState,
	});
	res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
}

export default withIronSessionApiRoute(handler, sessionOptions);
