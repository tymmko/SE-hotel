import React, { useEffect } from 'react';
import { StatusDropdown, StatusOption} from '../../components';
import { Icon } from '../../components';
import { Reservation } from '../../types/reservation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchGuestById } from '../../thunks/guests.thunks';

type SummaryProps = {
	reservation: Reservation,
	status: string;
	onStatusChange: (status: string) => void;
	totalPrice: string;
};

const statusOptions: StatusOption[] = [
	{ value: 'Paid', label: 'Paid', color: '#FFF6DD' },
	{ value: 'checked-in', label: 'Checked In', color: '#99AD65' },
	{ value: 'checked-out', label: 'Checked Out', color: '#FBCD6A' },
];

export const Summary: React.FC<SummaryProps> = ({
	reservation,
	status,
	onStatusChange,
	totalPrice,
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const guest = useSelector((state: RootState) => state.GuestReducer.guest);
	
	useEffect(() => {
		dispatch(fetchGuestById(reservation.id));
	}, [reservation.id])

	return (
		<div className="bg-amber-50 p-6 rounded-xl w-fit text-sm font-medium">
			<h1>Summary</h1>

			<div className="mb-20">
				<div className='mb-15'>
					<span className="text-black/80">id:</span>
					<span className="ml-6 ft-14">{reservation.id}</span>
				</div>

				<div className="d-flex mb-15">
					<span style={{ alignSelf: 'center' }}>room:</span>
					<div className='d-flex align-items-center'>
						<Icon name="room-number-badge" size="extra-small" className="ml-5" />
						<span className='ml-5 ft-14'>{reservation.room_id}</span>
					</div>
				</div>

				{guest &&
					<div className="d-flex mb-15">
						<span style={{ alignSelf: 'center' }}>guest:</span>
						<div className='d-flex align-items-center'>
							<Icon name="guest-badge" size="extra-small" className="ml-5" />
							<span className='ml-5 ft-14'>{guest.first_name} {guest.last_name}</span>
						</div>
					</div>
				}

				<div className="d-flex">
					<span className="mr-5" style={{ alignSelf: 'center' }}>status:</span>
					<StatusDropdown
						options={statusOptions}
						value={status}
						onChange={onStatusChange}
					/>
				</div>
			</div>

			<div className='mt-90'>
				<div className='mb-15'>
					<span className="">start date:</span>
					<span className="ml-6 ft-14">{reservation.check_in_date}</span>
				</div>
				<div className='mb-15'>
					<span className="">end date:</span>
					<span className="ml-6 ft-14">{reservation.check_out_date}</span>
				</div>
				<div className='mb-15'>
					<span className="">total price:</span>
					<span className="ml-6 ft-14">{totalPrice}</span>
				</div>
			</div>
		</div>
	);
};
