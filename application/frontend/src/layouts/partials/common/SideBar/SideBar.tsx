import React from 'react';
import { Icon } from '../../../../components';
import { MenuOption } from '../../../../types/pages';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { navigate } from '../../../../services/utils';

type SideBarProps = {
	active: MenuOption;
}

export const SideBar = ({
	active
}: SideBarProps) => {
	const icons = (active: MenuOption) => [
		{
			name: active === 'rooms' ? 'couch-filled' : 'couch',
			onClick: () => navigate('/rooms')
		},
		{
			name: active === 'reservations' ? 'book-filled' : 'book',
			onClick: () => navigate('/reservations')
		},
		{
			name: active === 'guests' ? 'user-filled' : 'user',
			onClick: () => navigate('/guests')
		},
		{
			name: active === 'bills' ? 'bill-filled' : 'bill',
			onClick: () => navigate('/bills')
		},
	];

	
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