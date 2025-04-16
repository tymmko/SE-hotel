import React from 'react';
import { Icon } from '../../../../components';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';

const filters = ['type', 'status'];

export const TopBar = () => {
	return (
		<div className={classNames(styles['top-bar'], 'd-flex align-items-center justify-content-between')}>
			<div className={classNames(styles['search-section'], 'd-flex align-items-center')}>
				<Icon
					name="search"
					size="small"
					className={classNames(styles['search-icon'], 'mr-10')} 
				/>

				<div className={classNames(styles['search-bar'], 'd-flex flex-column')}>
					<span className={styles['search-text']}>Search</span>
					<div className={classNames(styles['filters'], 'd-flex mt-5')}>
						{filters.map((tag) => (
							<span key={tag} className={styles['filter-tag']}>{tag}</span>
						))}
					</div>
				</div>
			</div>

			<Icon
				name="user"
				size="small"
				className={styles['profile-icon']}
			/>
		</div>
	);
};
