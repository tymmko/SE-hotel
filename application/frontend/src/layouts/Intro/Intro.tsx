import React, { ReactNode } from 'react';
import { ReactComponent as Visual } from '../../assets/icons/loginvisual.svg';
import * as styles from './styles.m.less';

type IntroProps = {
	children: ReactNode
}

export const Intro = ({
	children
}: IntroProps) => {
	return (
		<div className={styles['intro-page']}>
			<Visual className={styles['intro-visual']} />
		 
			<div className={styles['form-section']}>
				{children}
			</div>
		</div>
	);
};
