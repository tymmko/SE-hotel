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

type EditPriceHistoryProps = {
    onSaved?: () => void;  // optional callback to refresh history
};

const EditPriceHistory: React.FC<EditPriceHistoryProps> = ({ onSaved }) => {
    const room = useSelector((state: RootState) => state.RoomsReducer.room);

    const [startDate, setStartDate] = useState<Value>(new Date());
    const [startDateFormatted, setStartDateFormatted] = useState<string>('');
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
		const date = moment(`${startDate}`).format('YYYY-MM-DD');

		setStartDateFormatted(date)
		setNewPriceEntry({
			...newPriceEntry,
			start_date: date
		})
	}, [startDate])

	const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/rooms/${room.id}/price-history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: newPriceEntry.price,
                    start_date: newPriceEntry.start_date,
                    end_date: newPriceEntry.end_date || null,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save price: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Saved successfully:', result);

            if (onSaved) {
                onSaved();
            }

        } catch (error) {
            console.error('Error saving price history:', error);
            alert('Failed to update price.');
        }
    };

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
					<Calendar onChange={setStartDate} value={startDate} />
				</div>
				<button onClick={handleSave} className={styles['save-button']}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditPriceHistory;
