import React from 'react';
import { Icon } from '../../../../components';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';

const icons = [
	{
		name: 'couch',
		onClick: () => console.log('Couch clicked')
	},
	{
		name: 'book',
		onClick: () => console.log('Book clicked')
	},
	{
		name: 'user',
		onClick: () => console.log('User clicked')
	},
	{
		name: 'bill',
		onClick: () => console.log('Bill clicked')
	},
  ];

export const SideBar = () => {
	return <div className={classNames('d-grid br-2-15 w-85', styles['side-bar'])}>
		<Icon
			name='logo'
			className='mt-10'
			size='large'
		/>
		<div className='mt-20 d-grid justify-content-center'>
			{icons.map((icon) => (
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