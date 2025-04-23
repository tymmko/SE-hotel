import React from 'react';
import { Icon } from '../../../../components';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { MenuOption } from '../../../../types/pages';

type SideBarProps = {
	active: MenuOption;
}

const icons = (active: MenuOption) => [
	{
		name: active === 'rooms' ? 'couch-filled' : 'couch',
		onClick: () => console.log('Couch clicked')
	},
	{
		name: active === 'reservations' ? 'book-filled' : 'book',
		onClick: () => console.log('Book clicked')
	},
	{
		name: active === 'guests' ? 'user-filled' : 'user',
		onClick: () => console.log('User clicked')
	},
	{
		name: active === 'bills' ? 'bill-filled' : 'bill',
		onClick: () => console.log('Bill clicked')
	},
  ];

export const SideBar = ({
	active
}: SideBarProps) => {
	return <div className={classNames('d-grid br-2-15 w-85', styles['side-bar'])}>
		<Icon
			name='logo'
			className='mt-10'
			size='large'
		/>
		<div className='mt-20 d-grid justify-content-center'>
			{icons(active).map((icon) => (
				<Icon
					key={icon.name}
					name={icon.name as any}
					onClick={icon.onClick}
					size='small'
					className='mt-35'
				/>
			))}
		</div>
	</div>
}