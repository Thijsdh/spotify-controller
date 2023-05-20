export type SpotifyTokenResponse = {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

export type Tokens = {
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export interface SpotifyUserResponse {
	display_name: string;
}

export interface SpotifyCurrentlyPlayingResponse {
	timestamp: number;
	context: {
		external_urls: {
			spotify: string;
		};
		href: string;
		type: string;
		uri: string;
	};
	progress_ms: number;
	item: {
		album: {
			album_type: string;
			artists: {
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				name: string;
				type: string;
				uri: string;
			}[];
			available_markets: string[];
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			images: {
				height: number;
				url: string;
				width: number;
			}[];
			name: string;
			release_date: string;
			release_date_precision: string;
			total_tracks: number;
			type: string;
			uri: string;
		};
		artists: {
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			name: string;
			type: string;
			uri: string;
		}[];
		available_markets: string[];
		disc_number: number;
		duration_ms: number;
		explicit: boolean;
		external_ids: {
			isrc: string;
		};
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		is_local: boolean;
		name: string;
		popularity: number;
		preview_url: string;
		track_number: number;
		type: string;
		uri: string;
	};
	currently_playing_type: string;
	actions: {
		disallows: {
			resuming: boolean;
			skipping_prev: boolean;
		};
	};
	is_playing: boolean;
}
