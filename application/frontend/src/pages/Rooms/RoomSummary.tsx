import React, { useEffect, useRef, useState } from 'react';
import roomImg from '../../assets/pictures/room.png'
import * as styles from './styles.m.less';
import { colors, Icon, StatusTag } from '../../components';
import classNames from 'classnames';
import { PriceHistory } from './PriceHistory';
import { fetchOccupancy, fetchPriceHistory, fetchRoomById } from '../../thunks/rooms.thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { capitalizeFirstLetter } from '../../services/utils';
import { emptyGuest } from '../../types/guest';
import EquipmentDetails from './EquipmentDetails';
import { Equipment } from '../../types/equipments';
import { fetchEquiment } from '../../thunks/equipments.thunks';
import EquipmentCreate from './EquipmentCreate';

type RoomSumaryProps = {
	id: number;
}

const RoomSummary = ({
	id
}: RoomSumaryProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const room = useSelector((state: RootState) => state.RoomsReducer.room);
	const priceHistory = useSelector((state: RootState) => state.RoomsReducer.priceHistory);
	const equipments = useSelector((state: RootState) => state.EquipmentsReducer.roomEquipments);
	const guest = useSelector((state: RootState) => state.RoomsReducer.guest);
	
	const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>();
	const [createEquipment, setCreateEquipment] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchRoomById(id));
		dispatch(fetchPriceHistory(id));
		dispatch(fetchEquiment(id));
		dispatch(fetchOccupancy(id));
	}, [id])

	return (
		<div className={styles['summary']}>
			<h1>Room Summary #{room.id}	</h1>
			<div className='d-flex'>
				<img src={roomImg} alt="" />
				<div className={classNames('ml-30 d-flex', selectedEquipment || createEquipment ? 'h-320' : '', styles.info)}>
					<div className='d-flex'>
						<div className={styles['info-label']}>Type: </div>
						<div className='mt-0 ft-14'>{room.type}</div>
					</div>
					<div className='d-flex mt-20'>
						<div className={classNames('align-content-center', styles['info-label'])}>Status:</div>
						<StatusTag
							text={capitalizeFirstLetter(room.status)}
							hex={room.status === 'available' ? colors.green : colors.pink}
							className={classNames(styles.tag)}
						/>
					</div>
					{guest !== emptyGuest &&
						<div className='d-flex mt-15 align-items-center'>
							<div className={styles['info-label']}>Guest:</div>
							<div className='d-flex mt-0 align-items-center'>
								<Icon name='guest-badge' size='extra-small' className='ml-5 h-25 w-25' />
								<span className='ml-5 h-15 ft-14'>{guest.first_name} {guest.last_name}</span>
							</div>
						</div>
					}
					<div className={styles.amenities}>
							<div>amenities:</div>
							<div className='d-flex align-items-center'>
								{equipments.map((equipment, i) => 
									<StatusTag
										text={equipment.name}
										key={i}
										hex={colors.mainMedium}
										className={styles['amenities-tag']}
										onClick={() => setSelectedEquipment(equipment)}
									/>
								)}
								{!createEquipment &&
									<div className={classNames('mt-0', styles['add-icon'])} onClick={() => setCreateEquipment(true)}>
										<Icon name='add-filled' size='xxs' className='color-main'/>
									</div>
								}
							</div>

							{selectedEquipment &&
								<EquipmentDetails
									equipment={selectedEquipment}
									selected={setSelectedEquipment}
								/>
							}

							{createEquipment &&
								<EquipmentCreate
									room_id={room.id}
									selected={setCreateEquipment}
								/>
							}
					</div>
				</div>
			</div>
			<PriceHistory
				currentPrice={room.price_per_night ?? 0.00}
				history={priceHistory}
			/>
		</div>
	);
}

export default RoomSummary;
