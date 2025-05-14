import React, { useEffect, useState } from 'react';
import * as styles from './styles.m.less';
import { Room } from '../../types/rooms';
import { AddButton, colors, Input, StatusDropdown } from '../../components';
import classNames from 'classnames';

type RoomSumaryProps = {
	createRoom: (room: Omit<Room, 'id'>) => void;
}

const roomType = [
	{
		value: 'single',
		label: 'single',
		color: colors.blue,
	},
	{
		value: 'double',
		label: 'double',
		color: colors.green,
	},
	{
		value: 'suite',
		label: 'suite',
		color: colors.yellow,
	},
]

const CreateRoom = ({
	createRoom
}: RoomSumaryProps) => {
	const [room, setRoom] = useState<Omit<Room, 'id'>>({
		type:'single',
		status: 'available',
		capacity: 1,
	});

	const selectType = (value: string) => {
		if (value as Room['type']) {
			setRoom({
				...room,
				type: value as Room['type']
			});
		}
	};

	const changeCapacity = (value: string) => {
		setRoom({
			...room,
			capacity: Number(value)
		})
	}

	return (
		<div className={styles['add-room']}>
			<h1>Add Room</h1>
			<div className={classNames('d-flex', styles['add-info'])}>
				<div className='d-flex align-items-center'>
					<div className={styles['info-label']}>Type: </div>
					<StatusDropdown
						options={roomType}
						value={room.type}
						onChange={selectType}
					/>
				</div>
				<div className='d-flex mt-15 align-items-center'>
					<div className={styles['info-label']}>Capacity:</div>
					<div className={classNames('d-flex mt-0 align-items-center', styles.input)}>
						<Input
							value={room.capacity ?? 0}
							onChange={changeCapacity}
							className='ml-5'
						/>
					</div>
				</div>
				
			</div>
			<AddButton
				type='check'
				color='green'
				className={styles['add-button']}
				onClick={() => createRoom(room)}
			/>
		</div>
	);
}

export default CreateRoom;
