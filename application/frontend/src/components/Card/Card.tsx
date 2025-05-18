import React, { ReactNode } from 'react';
import colors from '../../assets/colors.json';

import * as styles from './styles.m.less';

type CardProps = {
	color: string,
	classHeader: string,
	header: ReactNode,
	children: ReactNode,
	onClick: () => void,
}

const Card = ({
	color,
	classHeader,
	header,
	children,
	onClick
}: CardProps) => {
	return (
		<div 
			className={`${styles['component']} ${classHeader}`}
			style={{ backgroundColor: colors.mainMedium }}
			onClick={() => onClick()}
		>
			<div className={styles.intersect} style={{ backgroundColor: color }}>
				{header}
			</div>

			<div className={styles['content']}>
				{children}
			</div>
		</div>
	);
};

export default Card;
