import React from 'react';
import { AddButton, colors, StatusTag, Table } from '../../components';
import { Bill } from '../../types/bills';
import * as styles from './styles.m.less';
import classNames from 'classnames';

type BillsListProps = {
	bills: Bill[],
	bill: Bill,
	create: boolean,
	chooseBill: (id: string) => void,
	// setCreate: (value: boolean) => void,
}

const statusOptions = {
	'paid': 'green',
	'unpaid': 'pink'
};

const BillsList = ({
	bills,
    bill,
    create,
	chooseBill,
}: BillsListProps) => {
	return (
		<div className={classNames(styles.table, (bill.id === '0' && !create) ? styles.width : '')}>
			<Table
				headers={['id', 'stay id', 'total', 'status']}
			>
				{bills.map((bill, i) => (
					<tr key={i} onClick={() => chooseBill(bill.id)}>
						<td>{bill.id}</td>
						<td>#{bill.stay_id}</td>
						<td>$ {bill.total_amount}</td>
						<td>
							<StatusTag
								text={bill.status}
								color={statusOptions[bill.status] as keyof typeof colors}
							/>
						</td>
					</tr>
				))}
			</Table>
			{/* {!create &&
				<div className={styles.add} onClick={() => setCreate(true)}>
					<AddButton color='blue' />
				</div>
			} */}
		</div>
	);
};

export default BillsList;
