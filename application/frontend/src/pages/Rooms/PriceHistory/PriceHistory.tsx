import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import * as styles from './styles.m.less';
import { Icon } from '../../../components';

type PriceEntry = {
	price: string;
	startDate: string;
	endDate: string;
};

type PriceHistoryProps = {
	currentPrice: string;
	validSince: string;
	history: PriceEntry[];
	className?: string;
};

const PriceHistory: React.FC<PriceHistoryProps> = ({
	currentPrice,
	validSince,
	history,
	className,
}) => {
	return (
		<div className={styles['price-wrapper']}>
			<div className={styles['price-icon']}>
				<Icon name='dollar-star' size='xxl'/>
			</div>
			<div className={styles['edit-icon']}>
				<Icon name='pencil' size='xxs'/>
			</div>
			<div className={classNames(styles['price-container'], className)}>
				<div className={styles['price-header']}>
					<h3>Price Details</h3>
					<div className={styles['price-info']}>
						<div>current price: ${currentPrice}</div>
						<div>valid since: {validSince}</div>
					</div>
				</div>
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
									<td>{entry.startDate}</td>
									<td>{entry.endDate}</td>
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