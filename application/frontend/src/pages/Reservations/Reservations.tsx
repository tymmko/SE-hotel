import React, { useState } from 'react';
import { StatusOption } from '../../components/StatusDropdown';
import { Page } from '../../layouts';
import { Summary } from './ReservationSummary';

const statusOptions: StatusOption[] = [
	{ value: 'Paid', label: 'Paid', color: '#FFF6DD' },
	{ value: 'checked-in', label: 'Checked In', color: '#99AD65' },
	{ value: 'checked-out', label: 'Checked Out', color: '#FBCD6A' },
];

const Reservations: React.FC = () => {
	const [status, setStatus] = useState<string>('checked-in');

	return (
		<Page active={'reservations'}>
			<div style={{ padding: 24 }}>
			<Summary
				id="1234"
				roomNumber="362"
				guestName="Random Name"
				status={status}
				onStatusChange={setStatus}
				statusOptions={statusOptions}
				startDate="11/04/2023"
				endDate="11/04/2023"
				totalPrice="$300"
			/>
			</div>
		</Page>
	);
};

export default Reservations;
