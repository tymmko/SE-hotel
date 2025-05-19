import React from 'react';
import { Icon } from '../../../../components';
import classNames from 'classnames';

import * as styles from './styles.m.less';

const filters = ['type', 'status'];

export const SearchBar = () => {
	return (
		<div className={classNames('d-flex align-items-center', styles['search-bar'])}>
			<Icon
				name="search"
				size="small"
				className={classNames(styles['search-icon'], 'mr-10')} 
			/>
			<div className={classNames('d-flex align-items-center br-2-30 p-15', styles['search-section'])}>
				<span>Search</span>
				<div className={classNames(styles['filters'], 'd-flex')}>
					{filters.map((tag) => (
						<span key={tag} className={styles['filter-tag']}>{tag}</span>
					))}
				</div>
			</div>
		</div>
);
};
