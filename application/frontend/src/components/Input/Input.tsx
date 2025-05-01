import React, { ChangeEvent } from 'react';
// @ts-ignore
import * as styles from './styles.m.less';
import classNames from 'classnames';

type InputProps = {
	value: string | number,
	type?: 'text' | 'number',
	required?: boolean,
	className?: string,
	onChange: (value: string) => void,
}

const Input = ({
	value,
	type = 'text',
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
			type={type}
			value={value}
			onChange={getChange}
			required={required}
			step={type === 'number' ? 0.01 : ''}
		/>
	);
};

export default Input;
