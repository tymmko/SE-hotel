import React from 'react';
import colors from '../../assets/colors.json';
import classNames from 'classnames';
import { IconName } from '../types';
import icons from '../../assets/icons';
// @ts-ignore
import * as styles from './styles.m.less';

type IconSize = 'xxxs' | 'xxs' | 'extra-small' | 'small' | 'normal' | 'large' | 'extra-large' | 'xxl' | 'auto';
type IconColor = keyof typeof colors;

type IconProps = {
	name: IconName,
	color?: IconColor,
	hex?: string,
	size?: IconSize,
	className?: string,
	onClick?: React.MouseEventHandler<SVGSVGElement | HTMLImageElement | HTMLElement>;
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
	const col = hex || (color ? colors[color] : undefined);
	const IconComponent = icons[name];

	if (!IconComponent) return null;

	return (
		<IconComponent
			onClick={onClick}
			fill={col}
			className={classNames(
				styles['image-icon'],
				styles[`image-icon-${size}`],
				className,
				tooltip && 'tooltip-bottom',
			)}
			data-title={tooltip}
		/>
	);
};

export default Icon;
