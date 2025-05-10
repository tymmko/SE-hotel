import React, { ReactNode } from 'react';
import { SideBar, TopBar } from '../partials/common';
import { MenuOption } from '../../types/pages';
import * as styles from './styles.m.less';
import classNames from 'classnames';

type PageProps = {
	active: MenuOption,
	children: ReactNode
}

export const Page = ({
	active,
	children
}: PageProps) => {
	return (
		<div className={styles.container}>
			<SideBar 
				active={active as MenuOption}
			/>
			<TopBar />
			<div className={classNames('ml-125 mt-30', styles.content)}>
				{children}
			</div>
		</div>
);
};
