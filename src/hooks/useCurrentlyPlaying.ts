import { SpotifyCurrentlyPlayingResponse } from '@/types';
import { useEffect, useState } from 'react';

function useCurrentlyPlaying() {
	const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyCurrentlyPlayingResponse>();

	useEffect(() => {
		async function fetchCurrentlyPlaying() {
			const currentlyPlayingResponse = await fetch('/api/currently-playing');
			const currentlyPlayingData: SpotifyCurrentlyPlayingResponse = await currentlyPlayingResponse.json();
			setCurrentlyPlaying(currentlyPlayingData);
		}

		const interval = setInterval(fetchCurrentlyPlaying, 1000);
		return () => clearInterval(interval);
	}, []);

	return currentlyPlaying;
}

export default useCurrentlyPlaying;
