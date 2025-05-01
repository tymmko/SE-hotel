import React, { useState } from 'react';

import { StatusTag } from '../StatusTag';
import * as styles from './styles.m.less';
import { Icon } from '../Icon';
import classNames from 'classnames';

export type StatusOption = {
  value: string;
  label: string;
  color: string;
};

type StatusDropdownProps = {
  options: StatusOption[];
  value: string;
  onChange: (value: string) => void;
}


export const StatusDropdown = ({
  options,
  value,
  onChange,
}: StatusDropdownProps) => {
	const [open, setOpen] = useState<Boolean>(false);

	const selected = options.find(o => o.value === value);

	const openDropdown = () => {
		setOpen(!open);
	}

	const select = (value: string) => {
		setOpen(false);
		onChange(value);
	}

	return (
		<div className={classNames(styles.dropdown, open ? styles['open'] : '')}>
			<div className={styles['dropdown-value']} onClick={openDropdown}>
				{selected ?
					<StatusTag
						className="color-black"
						text={selected.label}
						hex={selected.color}
					/>
					: '—'
				}
				<Icon name='arrow-down' size='xxxs' />
			</div>
			<div className={styles['dropdown-content']}>
				{options.map((option, i) => (
					<div key={i}>
						<StatusTag
							onClick={() => select(option.value)}
							className="color-black"
							text={option.label}
							hex={option.color}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default StatusDropdown;
