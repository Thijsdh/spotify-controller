import Image from 'next/image';
import { mdiPause, mdiPlay, mdiSkipNext, mdiSkipPrevious } from '@mdi/js';

import useCurrentlyPlaying from '@/hooks/useCurrentlyPlaying';
import BlurredImage from '@/components/BlurredImage';
import ControlButton from '@/components/ControlButton';
import { Actions } from '@/pages/api/player/[action]';

import css from './index.module.css';

export default function Home() {
	const currentlyPlaying = useCurrentlyPlaying();
	const isPlaying = currentlyPlaying?.is_playing;

	const image = currentlyPlaying?.item.album.images[0];

	const doAction = async (action: (typeof Actions)[number]) => {
		await fetch(`/api/player/${action}`, {
			method: 'PUT',
		});
	};

	return (
		<div className={css.container}>
			{image && (
				<BlurredImage
					src={image.url}
					width={image.width}
					height={image.height}
					alt={currentlyPlaying?.item.album.name}
				/>
			)}
			<main className={css.main}>
				<div className={css.imageWrapper}>
					{image && (
						<Image
							className={css.albumArt}
							src={image.url}
							width={image.width}
							height={image.height}
							alt={currentlyPlaying?.item.album.name}
						/>
					)}
				</div>
				<div className={css.meta}>
					<h1 className={css.name}>{currentlyPlaying?.item.name}</h1>
					<h2 className={css.artists}>{currentlyPlaying?.item.artists.map((a) => a.name).join(', ')}</h2>
					<div className={css.controls}>
						<ControlButton icon={mdiSkipPrevious} onClick={() => doAction('previous')} />
						<ControlButton
							icon={isPlaying ? mdiPause : mdiPlay}
							onClick={() => doAction(isPlaying ? 'pause' : 'play')}
						/>
						<ControlButton icon={mdiSkipNext} onClick={() => doAction('next')} />
					</div>
				</div>
			</main>
		</div>
	);
}
