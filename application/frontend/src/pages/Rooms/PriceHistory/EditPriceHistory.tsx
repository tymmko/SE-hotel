import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { PriceEntry } from '../../../types/rooms';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers/root.reducer';
import { Icon, Input } from '../../../components';
// @ts-ignore
import * as styles from './styles.m.less';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EditPriceHistory = () => {
	const room = useSelector((state: RootState) => state.RoomsReducer.room);

	const [startDate, onChange] = useState<Value>(new Date());
	const [startDateFormatted, setStartDate] = useState<string>('');

	const [newPriceEntry, setNewPriceEntry] = useState<PriceEntry>({
		start_date: '',
		end_date: '',
		price: 0,
		room_id: room.id,
	});

	const changePrice = (price: number | string) => {
		setNewPriceEntry({
			...newPriceEntry,
			price: Number(price),
		});
	}

	useEffect(() => {
		const date = moment(`${startDate}`).format('DD-MM-YYYY');

		setStartDate(date)
		setNewPriceEntry({
			...newPriceEntry,
			start_date: date
		})
	}, [startDate])

	return (
		<div className={styles['price-header']}>
			<h3>Edit Price Details</h3>
			<div className={styles['price-info']}>
				<div>
					<div>price</div>
					$ <Input
						type='number'
						value={newPriceEntry.price}
						onChange={changePrice}
					/>
				</div>
				<div>
					<div>valid from:</div>
					<div className={styles['change-date']}>
						<div className={styles.date}>{`${startDateFormatted}`}</div>
						<div className={styles['calendar-icon']} onClick={() => {}}>
							<Icon name='calendar' size='xxs'/>
						</div>
					</div>
					<Calendar onChange={onChange} value={startDate}/>
				</div>

			</div>
		</div>
	);
};

export default EditPriceHistory;
