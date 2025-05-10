import React from 'react';
import { Icon } from '../../../../components';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { SearchBar } from '../SearchBar';

const filters = ['type', 'status'];

export const TopBar = () => {
	return (
		<div className={classNames(styles['top-bar'], 'd-flex align-items-center justify-content-between')}>
			<SearchBar />
			<div className={classNames('w-40', styles['profile-icon'])}>
				<Icon
					name="user"
					size="extra-small"
				/>
			</div>
		</div>
	);
};
