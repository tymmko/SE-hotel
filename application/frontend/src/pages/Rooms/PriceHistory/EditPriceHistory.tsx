import React, { useState } from 'react';
import { PriceEntry } from '../../../types/rooms';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducers/root.reducer';
import { Input } from '../../../components';
// @ts-ignore
import * as styles from './styles.m.less';
import { AppDispatch } from '../../../app/store';
import { createPriceEntry } from '../../../thunks/rooms.thunks';

type EditPriceHistoryProps = {
	onCancel?: () => void;  
};

const EditPriceHistory: React.FC<EditPriceHistoryProps> = ({ onCancel }) => {
	const dispatch = useDispatch<AppDispatch>();
	const room = useSelector((state: RootState) => state.RoomsReducer.room);
	const errorPriceHistory = useSelector((state: RootState) => state.RoomsReducer.errorPriceHistory);

	const [newPriceEntry, setNewPriceEntry] = useState<Omit<PriceEntry, 'room_id'>>({
		start_date: '',
		end_date: '',
		price: 0,
	});

	const changePrice = (price: number | string) => {
		setNewPriceEntry({
			...newPriceEntry,
			price: Number(price),
		});
	}

	const handleSave = async () => {
		dispatch(createPriceEntry(room.id, newPriceEntry))
	};

	return (
		<div className={styles['price-header']}>
			<div style={{display: 'flex',alignItems: 'center', justifyContent: 'space-between'}}>
				<h3>Edit Price Details</h3>
				<button onClick= {onCancel} aria-label="Close" title="Close">
					&times;
				</button>
			</div>
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
					<Input
						required={true}
						type="date"
						value={newPriceEntry.start_date}
						min={ new Date().toISOString().split('T')[0]}
						onChange={(value) => {
							setNewPriceEntry((prev) => ({
								...prev,
								start_date: value,
							}));
						}}
					/>
				</div>
				<div>
					<div>valid until:</div>
					<Input
						type="date"
						value={newPriceEntry.end_date || ''}
						min={newPriceEntry.start_date || new Date().toISOString().split('T')[0]}
						onChange={(value) => {
							setNewPriceEntry((prev) => ({
								...prev,
								end_date: value,
							}));
						}}
					/>
				</div>

				<button onClick={handleSave}>
					Save
				</button>

				{errorPriceHistory !== undefined && (
					<div className='color-pink'>
						{typeof errorPriceHistory === 'object' && errorPriceHistory !== null && 'message' in errorPriceHistory
						? (errorPriceHistory as { message: string }).message
						: 'Something went wrong. Please try again.'}
					</div>
				)}
			</div>
		</div>
	);
};

export default EditPriceHistory;
