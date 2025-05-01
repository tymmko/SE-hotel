import React from 'react';
import classNames from 'classnames';
import unionIcon from '../../assets/icons/union.svg'; // adjust path if needed
import colors from '../../assets/colors.json';
// @ts-ignore
import * as styles from './styles.m.less';
import { Icon } from '../Icon';

type AddButtonProps = {
	type?: 'add' | 'check';
	color?: keyof typeof colors;
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	className?: string;
};

const AddButton = ({
	type = 'add',
	color,
	onClick,
	className
}: AddButtonProps) => {
	const backgroundColor = color ? colors[color] : 'transparent';

	return (
		<div
			onClick={onClick}
			className={classNames(styles.addButton, className)}
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
