import React from 'react';
import { Room } from '../../types/rooms';
import { Card, colors, Icon, StatusTag } from '../../components';

import * as styles from './styles.m.less';
import classNames from 'classnames';

const rooms: Room[] = [
	{
		type: 'single',
		isAvailable: true,
		price: 100,
		roomNumber: 12
	},
	{
		type: 'double',
		isAvailable: false,
		price: 200,
		roomNumber: 13
	},
	{
		type: 'suite',
		isAvailable: true,
		price: 300,
		roomNumber: 15
	},
	{
		type: 'suite',
		isAvailable: true,
		price: 300,
		roomNumber: 15
	}
]

const intersectColors: Record<'single' | 'double' | 'suite', string> = {
	single: colors.blue,
	double: colors.green,
	suite: colors.yellow,
};

const roomTypeColorsText: Record<'single' | 'double' | 'suite', string> = {
	single: colors.blueMedium,
	double: colors.greenMedium,
	suite: colors.yellowMedium,
};

type RoomsListProps = {
	selectRoom: (room: Room) => void
}

const RoomsList = ({
	selectRoom,
}: RoomsListProps) => {
	const getClass = (type: Room['type']) => {
		return styles[`room-${type}`]; 
	}


	return (
		<div className={styles['room-list']}>
			{rooms.map((room, i) => 
				<Card
					key={i}
					color={intersectColors[room.type]}
					classHeader={getClass(room.type)}
					onClick={() => selectRoom(room)}
					header={
						<>
							<div className={styles['room-type']}>
								{`${room.type.charAt(0).toUpperCase() + room.type.slice(1)}`}
							</div>
							<div className={styles['room-number']} style={{ color: roomTypeColorsText[room.type] }}>
								{`#${room.roomNumber}`}
							</div>
						</>
					}
				>
					<div className={styles.status}>
						Status:
						<StatusTag
							text={room.isAvailable ? 'Available' : 'Occupied'}
							hex={room.isAvailable ? colors.green : colors.pink}
							className={classNames('ml-10', styles.tag)}
						/>
					</div>
					<div className={styles.price}>
						Price : ${room.price} / night
					</div>
					<div className={styles.logo}>
						<Icon name='arrow-diagonal' size='extra-small' />
					</div>
				</Card>
			)}
		</div>
	);
}

export default RoomsList;
