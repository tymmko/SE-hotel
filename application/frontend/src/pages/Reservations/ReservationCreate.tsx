import React, { useEffect, useState } from 'react';
import { Dropdown, StatusOption, Input, AddButton } from '../../components';
import { Reservation } from '../../types/reservation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchGuests } from '../../thunks/guests.thunks';
import { fetchRooms } from '../../thunks/rooms.thunks';
import moment from 'moment';
import { createReservation } from '../../thunks/reservations.thunks';
import  * as styles from './styles.m.less';

type CreateProps = {
	reservation: Reservation,
	setCreate: (value: boolean) => void,
};

const statusOptions: StatusOption[] = [
	{ value: 'Paid', label: 'Paid', color: '#FFF6DD' },
	{ value: 'checked-in', label: 'Checked In', color: '#99AD65' },
	{ value: 'checked-out', label: 'Checked Out', color: '#FBCD6A' },
];

export const Create: React.FC<CreateProps> = ({
	reservation,
	setCreate
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const rooms = useSelector((state: RootState) => state.RoomsReducer.rooms);
	const guests = useSelector((state: RootState) => state.GuestReducer.guests);

	const [roomSelected, setRoomSelected] = useState<string>('');
	const [guestSelected, setGuestSelected] = useState<string>('');
	const [startDateSelected, setStartDateSelected] = useState<string>('');
	const [endDateSelected, setEndDateSelected] = useState<string>('');

	const room_options = rooms.map(({ id, type }) => ({ value: `${id}`, label: type as string}));
	const guest_options = guests.map(({ id, first_name, last_name }) => (
		{ value: `${id}`, label: `${first_name} ${last_name}`}
	));

	const today = moment(new Date()).format('YYYY-MM-DD');

	useEffect(() => {
		dispatch(fetchGuests());
		dispatch(fetchRooms());
	}, [reservation.id])

	const createNewReservation = () => {
		if (!checker()) {
			return;
		}

		dispatch(createReservation({
			room_id: Number(roomSelected),
			guest_id: Number(guestSelected),
			check_in_date: startDateSelected,
			check_out_date: endDateSelected,
			status: 'confirmed'
		})).then(() => {
			setCreate(false);
		});
	}

	const checker = (): boolean => {
		if (roomSelected === '') {
			return false;
		} else if (guestSelected === '') {
			return false;
		} else if (startDateSelected === '') {
			return false;
		} else if (endDateSelected === '') {
			return false;
		}

		return true;
	}

	return (
		<div className="bg-amber-50 p-6 rounded-xl w-fit text-sm font-medium">
			<h1>New reservation</h1>

			<div className="mb-20">
				<div className="d-flex mb-15">
					<span style={{ alignSelf: 'center' }}>room:</span>
					<div className='ml-10'>
						<Dropdown
							options={room_options}
							value={roomSelected}
							onChange={setRoomSelected}
							renderSelected={(selection) => (
								<div className='ft-14'>
									{selection ? selection.label : 'select room'}
								</div>
							)}
							renderOption={(option, isSelected, select) => (
								<div
									key={option.value}
									onClick={select}
									className='d-flex align-items-center justify-content-space-between'
								>
									<div className='m-0 ft-14'>{option.label}</div>
									<div className='ft-12 color-dark-light'># {option.value}</div>
								</div>
							)}
						/>
					</div>
				</div>

				{guests &&
					<div className="d-flex mb-15">
						<span style={{ alignSelf: 'center' }}>guest:</span>
						<div className='ml-10'>
							<Dropdown
								options={guest_options}
								value={guestSelected}
								onChange={setGuestSelected}
								renderSelected={(selection) => (
									<div className='ft-14'>
										{selection ? selection.label : 'select guest'}
									</div>
								)}
								renderOption={(option, isSelected, select) => (
									<div
										key={option.value}
										onClick={select}
										className='m-15 ft-14'
									>
										{option.label}
									</div>
								)}
							/>
						</div>
					</div>
				}

				<div className='d-flex align-items-center mb-15'>
					<div className='mr-10'>start date:</div>
					<Input
						required={true}
						type='date'
						value={startDateSelected}
						min={today}
						onChange={setStartDateSelected}						
					/>
				</div>
				<div className='d-flex align-items-center mb-15'>
					<div className='mr-10'>end date:</div>
					<Input
						required={true}
						type='date'
						value={endDateSelected}
						min={startDateSelected}
						onChange={setEndDateSelected}
					/>
				</div>
			</div>

			<div className={styles.save}>
				<AddButton
					type='check'
					onClick={createNewReservation}
					color={checker() ? 'green' : 'main'}
					disabled={!checker()}
				/>
			</div>
		</div>
	);
};
