import React, { ReactElement, ReactNode } from 'react';
import colors from '../../assets/colors.json';

import * as styles from './styles.m.less';

type CardProps = {
	color: string,
	classHeader: string,
	header: ReactNode,
	children: ReactNode,
}

const Card = ({
	color,
	classHeader,
	header,
	children,
}: CardProps) => {
	return (
		<div className={`${styles['component']} ${classHeader}`} style={{ backgroundColor: colors.mainMedium }}>
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
