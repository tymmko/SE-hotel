import React, { ReactElement } from 'react';
import { SideBar, TopBar } from '../partials/common';
import { MenuOption } from '../../types/pages';

type PageProps = {
	active: MenuOption,
	children: ReactElement
}

export const Page = ({
	active,
	children
}: PageProps) => {
	return (
		<div>
			<SideBar 
				active={active as MenuOption}
			/>
			<TopBar />
			<div className='ml-125 mt-30'>
				{children}
			</div>
		</div>
);
};
