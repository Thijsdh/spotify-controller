import Image from 'next/image';

import css from './index.module.css';

interface Props {
	src: string;
	width: number;
	height: number;
	alt: string;
}

function BlurredImage({ src, width, height, alt }: Props) {
	return (
		<div className={css.imageContainer}>
			<Image src={src} width={width} height={height} alt={alt} className={css.blurredImage} />
		</div>
	);
}

export default BlurredImage;
