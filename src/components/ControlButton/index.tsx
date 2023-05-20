import Icon from '@mdi/react';
import css from './index.module.css';

interface Props {
	icon: string;
	onClick?: () => void;
}

function ControlButton({ icon, onClick }: Props) {
	return (
		<button className={css.controlButton} onClick={onClick} type="button">
			<Icon path={icon} size={2} />
		</button>
	);
}

export default ControlButton;
