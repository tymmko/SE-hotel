import React, { ReactNode, useState } from 'react';
import { Icon } from '../Icon';
import classNames from 'classnames';

import * as styles from './styles.m.less';

type DropdownProps<T> = {
	options: T[];
	value: string;
	onChange: (value: string) => void;
	renderOption: (option: T, isSelected: boolean, select: () => void) => ReactNode;
	renderSelected: (select: T | undefined) => ReactNode;
}

export const Dropdown = <T extends {
	label: string; value: string 
}> ({
	options,
	value,
	onChange,
	renderOption,
	renderSelected,
}: DropdownProps<T>) => {
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
				{renderSelected(selected)}
				<Icon name='arrow-down' size='xxxs' />
			</div>
			<div className={styles['dropdown-content']}>
				{options.map((option) => 
					renderOption(option, option.value === value, () => select(option.value)))}
			</div>
		</div>
	);
}

export default Dropdown;
