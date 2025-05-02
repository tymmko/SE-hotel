import React, { ReactNode } from 'react';

import * as styles from './styles.m.less';

type TableProps = {
	headers: string[],
	children: ReactNode,
}

const Table = ({
	headers,
	children
}: TableProps) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{headers.map((header, i) => (
						<th key={i}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{children}
			</tbody>
		</table>
	);
};

export default Table;
