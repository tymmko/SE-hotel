import React from 'react';
import { AddButton, StatusTag, Table } from '../../components';
import { Reservation } from '../../types/reservation';
import * as styles from './styles.m.less';
import classNames from 'classnames';

type ReservationsListProps = {
	reservations: Reservation[],
	reservation: Reservation,
	create: boolean,
	chooseReservation: (id: number) => void,
	setCreate: (value: boolean) => void,
}

const ReservationsList = ({
	reservations,
	reservation,
	create,
	chooseReservation,
	setCreate,
}: ReservationsListProps) => {
	return (
		<div className={classNames(styles.table, (reservation.id === 0 && !create) ? styles.width : '')}>
			<Table
				headers={['id', 'room', 'guest id', 'start date', 'end date', 'status']}
			>
				{reservations.map((reservation, i) => (
					<tr key={i} onClick={() => chooseReservation(reservation.id)}>
						<td>{reservation.id}</td>
						<td>#{reservation.room_id}</td>
						<td>{reservation.guest_id}</td>
						<td>{reservation.check_in_date}</td>
						<td>{reservation.check_out_date}</td>
						<td>
							<StatusTag
								text={reservation.status}
								color={reservation.status === 'canceled' ? 'orange' : 'blue'}
							/>
						</td>
					</tr>
				))}
			</Table>
			{!create &&
				<div className={styles.add} onClick={() => setCreate(true)}>
					<AddButton color='blue' />
				</div>
			}
		</div>
	);
};

export default ReservationsList;
