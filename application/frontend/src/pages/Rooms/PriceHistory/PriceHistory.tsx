import React, { useState } from 'react';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { Icon, Table } from '../../../components';
import { PriceEntry } from '../../../types/rooms';
import EditPriceHistory from './EditPriceHistory';

type PriceHistoryProps = {
	currentPrice: number,
	history?: PriceEntry[],
	className?: string,
};

const PriceHistory: React.FC<PriceHistoryProps> = ({
	currentPrice,
	history = [],
	className,
}) => {
	const [edit, setEdit] = useState<Boolean>(false);
	const validSince = history ? getCurrentStartDate(history) : '';

	function getCurrentStartDate(priceHistory: PriceEntry[]): string | null {
		const today = new Date();
	
		if (priceHistory.length === 0) return null;

		const current = priceHistory.find(entry => {
			const start = new Date(entry.start_date);
			const end = new Date(entry.end_date);
			return start <= today && today <= end;
		});
	
		return current ? current.start_date : null;
	}

	return (
		<div className={styles['price-wrapper']}>
			<div className={styles['price-icon']}>
				<Icon name='dollar-star' size='xxl'/>
			</div>
			{!edit &&
				<div className={styles['edit-icon']} onClick={() => setEdit(!edit)}>
					<Icon name='pencil' size='xxs'/>
				</div>
			}
			<div className={classNames(styles['price-container'], className)}>
				{edit ?
					<EditPriceHistory
						onSaved={() => {
							window.location.reload();
						}}
						onCancel={() => {
							setEdit(false);
						}}
					/>
				:
					<div className={styles['price-header']}>
						<h3>Price Details</h3>
						<div className={styles['price-info']}>
							<div>current price: ${currentPrice}</div>
							<div>valid since: {validSince}</div>
						</div>
					</div>
				}
				<div className={styles['price-history']}>
					<h3>Price History</h3>
					<Table
						headers={['price per night', 'start date', 'end date']}
					>
						{history.map((entry, index) => (
							<tr key={index}>
								<td>${entry.price}</td>
								<td>{entry.start_date}</td>
								<td>{entry.end_date}</td>
							</tr>
						))}
					</Table>
					
				</div>
			</div>
		</div>
	);
};

export default PriceHistory;