import React, { useEffect, useState } from 'react';
import roomImg from '../../assets/pictures/room.png'
import * as styles from './styles.m.less';
import { Room } from '../../types/rooms';
import { colors, Icon, StatusTag } from '../../components';
import classNames from 'classnames';
import { PriceHistory } from './PriceHistory';

type RoomSumaryProps = {
	room: Room;
}

const RoomSummary = ({
	room
}: RoomSumaryProps) => {
	const [amenities, setAmenities] = useState<string[]>();

	useEffect(() => {
		setAmenities(['tv', 'kitchen']);
	}, []);

	return (
		<div className={styles['summary']}>
			<h1>Room Summary</h1>
			<div className='d-flex'>
				<img src={roomImg} alt="" />
				<div className={classNames('ml-30 d-flex', styles.info)}>
					<div className='d-flex'>
						<div className={styles['info-label']}>Type: </div>
						<div className='mt-0'>{room.type}</div>
					</div>
					<div className='d-flex mt-25'>
						<div className={classNames('align-content-center', styles['info-label'])}>Status:</div>
						<StatusTag
							text={room.isAvailable ? 'Available' : 'Occupied'}
							hex={room.isAvailable ? colors.green : colors.pink}
							className={classNames(styles.tag)}
						/>
					</div>
					<div className='d-flex mt-15 align-items-center'>
						<div className={styles['info-label']}>Guest:</div>
						<div className='d-flex mt-0 align-items-center'>
							<Icon name='guest-badge' size='extra-small' className='ml-5 h-25 w-25' />
							<span className='ml-5 h-15 mt-1'>Guest Name</span>
						</div>
					</div>
					<div className={styles.amenities}>
					<div>amenities:</div>
						<div>
							{amenities && amenities.map((a, i) => 
								<StatusTag
									text={a}
									key={i}
									hex={colors.mainMedium}
									className={styles['amenities-tag']}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<PriceHistory
				currentPrice={''}
				validSince={''}
				history={[]}			
			/>
		</div>
	);
}

export default RoomSummary;
