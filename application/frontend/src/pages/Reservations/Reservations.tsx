import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import { ReactComponent as GroupShapes } from '../../assets/icons/group-shapes.svg';
import { Summary } from './ReservationSummary';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchReservationById, fetchReservations } from '../../thunks/reservations.thunks';
import ReservationsList from './ReservationsList';
import * as styles from './styles.m.less';
import classNames from 'classnames';
import { Create } from './ReservationCreate';

const Reservations = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [status, setStatus] = useState<string>('checked-in');
	const [create, setCreate] = useState<boolean>(false);
	
	const reservations = useSelector((state: RootState) => state.ReservationReducer.reservations);
	const reservation = useSelector((state: RootState) => state.ReservationReducer.reservation);

	useEffect(() => {
		dispatch(fetchReservations());
	}, []);

	const chooseReservation = (id: number) => {
		dispatch(fetchReservationById(id));
	}

	return (
		<Page active={'reservations'}>
			<div className={classNames('d-flex', styles.reservations)}>
				<ReservationsList
					reservations={reservations}
					reservation={reservation}
					chooseReservation={chooseReservation}
					create={create}
					setCreate={setCreate}
				/>

				{reservation.id !== 0 && !create &&
					<Summary
						reservation={reservation}
						status={status}
						onStatusChange={setStatus}
						totalPrice="$300"
					/>
				}

				{create &&
					<Create
						reservation={reservation}
						setCreate={setCreate}
					/>
				}

			</div>
			{(reservation.id !== 0 || create) &&
				<GroupShapes className={styles.shapes}/>
			}
		</Page>
	);
};

export default Reservations;
