import React from 'react';
import colors from '../../assets/colors.json';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';

type TagSize = 'extra-small' | 'small' | 'normal' | 'large' | 'extra-large' | 'auto';
type TagColor = keyof typeof colors;

type TagProps = {
	text: string;
	color?: TagColor;
	hex?: string;
	size?: TagSize;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const StatusTag = ({
	text,
	color,
	hex,
	size = 'normal',
	className,
	onClick,
}: TagProps) => {
	const bgColor = hex || colors[color!];
	const style = bgColor ? { backgroundColor: bgColor } : undefined;

	return (
	<span
		onClick={onClick}
		className={classNames(
			'statusTag',
			styles['statusTag'],
			styles[`statusTag-${size}`],
			className
		)}
		style={style}
	>
		{text}
	</span>
	);
};

export default StatusTag;
