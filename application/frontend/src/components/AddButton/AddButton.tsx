import React from 'react';
import classNames from 'classnames';
import colors from '../../assets/colors.json';
import { Icon } from '../Icon';
// @ts-ignore
import * as styles from './styles.m.less';

type AddButtonProps = {
	type?: 'add' | 'check';
	color?: keyof typeof colors;
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	className?: string;
	disabled?: boolean;
};

const AddButton = ({
	type = 'add',
	color,
	onClick,
	className,
	disabled
}: AddButtonProps) => {
	const backgroundColor = color ? colors[color] : 'transparent';

	return (
		<div
			onClick={onClick}
			className={classNames(disabled ? styles.disabled : '', styles.addButton, className)}
			style={{ backgroundColor }}
		>
			{type === 'add' &&
				<Icon name='add' size='extra-small' />
			}
			{type === 'check' &&
				<Icon name='check' size='extra-small' />
			}
		</div>
	);
};

export default AddButton;
