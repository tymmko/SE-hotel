import React from 'react';
import colors from '../../assets/colors.json';
import classNames from 'classnames';
import { IconName } from '../types';
import icons from '../../assets/icons';
// @ts-ignore
import * as styles from './styles.m.less';

type IconSize = 'extra-small' | 'small' | 'normal' | 'large' | 'extra-large' | 'auto';
type IconColor = keyof typeof colors;

type IconProps = {
	name: IconName,
	color?: IconColor,
	hex?: string,
	size?: IconSize,
	className?: string,
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	tooltip?: string,
};

const Icon = ({
	color,
	hex,
	size = 'normal',
	className,
	name,
	onClick,
	tooltip,
}: IconProps) => {
	const col = hex || colors[color!];
	const style = col ? {color: col} : undefined;
	const IconSrc = icons[name] ?? '';

	return <img
		src={IconSrc}
		alt={name}
		onClick={onClick}
		className={classNames(
			'icon',
			styles['image-icon'],
			styles[`image-icon-${size}`],
			className,
			tooltip && 'tooltip-bottom',
		)}
		style={style}
		data-title={tooltip}
	/>
};

export default Icon;
