import React, { ChangeEvent } from 'react';
// @ts-ignore
import * as styles from './styles.m.less';
import classNames from 'classnames';

type InputProps = {
	value: string | number,
	type?: 'text' | 'number' | 'date',
	required?: boolean,
	placeHolder?: string,
	className?: string,
	min?: string | number,
	max?: string | number,
	pattern?: string,
	onChange: (value: string) => void,
}

const Input = ({
	value,
	type = 'text',
	required,
	placeHolder,
	className,
	min,
	max,
	pattern,
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
			placeholder={placeHolder}
			step={type === 'number' ? 0.50 : ''}
			min={min}
			max={max}
			pattern={pattern}
		/>
	);
};

export default Input;
