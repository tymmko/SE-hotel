import React, { ChangeEvent } from 'react';
// @ts-ignore
import * as styles from './styles.m.less';
import classNames from 'classnames';

type InputProps = {
	value: string,
	required?: boolean,
	className?: string,
	onChange: (value: string) => void,
}

const Input = ({
	value,
	required,
	className,
	onChange
}: InputProps) => {
	const getChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}

	return (
		<input
			className={classNames(styles.input, className)}
			type="text"
			value={value}
			onChange={getChange}
			required={required}
		/>
	);
};

export default Input;
