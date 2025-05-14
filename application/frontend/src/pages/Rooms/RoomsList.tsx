import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Room } from '../../types/rooms';
import { AddButton, Card, colors, Icon, StatusTag } from '../../components';
import * as styles from './styles.m.less';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '../../services/utils';

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
	rooms: Room[];
	roomAdd: boolean;
	selectRoom: (room: Room) => void;
	createRoom: (value: boolean) => void;
};

const RoomsList = ({ rooms, roomAdd, selectRoom, createRoom }: RoomsListProps) => {
	const { role } = useSelector((state: RootState) => state.authReducer);

	const getClass = (type: Room['type']) => {
		return styles[`room-${type}`];
	};

	return (
		<div className={styles['room-list']}>
			{rooms.length &&
				rooms.map((room, i) => (
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
									{`#${room.id}`}
								</div>
							</>
						}
					>
						<div className={styles.status}>
							Status:
							<StatusTag
								text={capitalizeFirstLetter(room.status)}
								hex={room.status === 'available' ? colors.green : colors.pink}
								className={classNames('ml-10', styles.tag)}
							/>
						</div>
						<div className={styles.price}>
							Price : ${room.price_per_night} / night
						</div>
						<div className={styles.logo}>
							<Icon name="arrow-diagonal" size="xxs" />
						</div>
					</Card>
				))}
			{!roomAdd && role === 'admin' && (
				<div className={styles.add} onClick={() => createRoom(true)}>
					<AddButton color="orange" />
				</div>
			)}
		</div>
	);
};

export default RoomsList;