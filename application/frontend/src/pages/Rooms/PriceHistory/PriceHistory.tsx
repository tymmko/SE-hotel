import React, { useState } from 'react';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { Icon } from '../../../components';
import { PriceEntry } from '../../../types/rooms';
import EditPriceHistory from './EditPriceHistory';

type PriceHistoryProps = {
	currentPrice: number,
	history: PriceEntry[],
	className?: string,
};

const PriceHistory: React.FC<PriceHistoryProps> = ({
	currentPrice,
	history,
	className,
}) => {
	const [edit, setEdit] = useState<Boolean>(false);
	const validSince = history && history[0] ? history[0].start_date : '';

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
					<table>
						<thead>
							<tr>
								<th>price per night</th>
								<th>start date</th>
								<th>end date</th>
							</tr>
						</thead>
						<tbody>
							{history.map((entry, index) => (
								<tr key={index}>
									<td>${entry.price}</td>
									<td>{entry.start_date}</td>
									<td>{entry.end_date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PriceHistory;