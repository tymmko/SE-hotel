import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import { ReactComponent as GroupShapes } from '../../assets/icons/group-shapes.svg';
import { Summary } from './ReservationSummary';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchReservationById, fetchReservations, updateReservationStatus } from '../../thunks/reservations.thunks';
import ReservationsList from './ReservationsList';
import * as styles from './styles.m.less';
import classNames from 'classnames';
import { Create } from './ReservationCreate';
import { ReservationStatus } from '../../types/reservation';

const Reservations = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [create, setCreate] = useState<boolean>(false);
	
	const reservations = useSelector((state: RootState) => state.ReservationReducer.reservations);
	const reservation = useSelector((state: RootState) => state.ReservationReducer.reservation);

	useEffect(() => {
		dispatch(fetchReservations());
	}, []);

	const chooseReservation = (id: number) => {
		dispatch(fetchReservationById(id));
	}

	const changeStatus = (status: string) => {
		dispatch(updateReservationStatus(reservation.id, status as ReservationStatus));
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
						onStatusChange={changeStatus}
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
