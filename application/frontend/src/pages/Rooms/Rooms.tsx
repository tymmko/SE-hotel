import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import RoomsList from './RoomsList';
import RoomSummary from './RoomSummary';
import { Room } from '../../types/rooms';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import * as styles from './styles.m.less';
import { createRoom, fetchRooms } from '../../thunks/rooms.thunks';
import CreateRoom from './CreateRoom';

function Rooms() {
	const dispatch = useDispatch<AppDispatch>();
	const [selected, setSelected] = useState<Room>();
	const [roomCreate, setRoomCreate] = useState<boolean>(false);
	const rooms = useSelector((state: RootState) => state.RoomsReducer.rooms);
	const role = useSelector((state: RootState) => state.authReducer.role);

	useEffect(() => {
		dispatch(fetchRooms());
	}, []);

	useEffect(() => {
		if (rooms && !selected) {
			setSelected(rooms[0]);
		}
	}, [rooms]);

	const createNewRoom = (room: Omit<Room, 'id'>) => {
		dispatch(createRoom(room));
		setRoomCreate(false);
	};

	return (
		<Page active={'rooms'}>
			<div className={styles['rooms']}>
				<RoomsList
					selectRoom={setSelected}
					rooms={rooms}
					roomAdd={roomCreate}
					createRoom={setRoomCreate}
				/>
				{selected && !roomCreate && (
					<RoomSummary
						id={selected.id}
					/>
				)}
				{roomCreate && (
					<CreateRoom
						createRoom={createNewRoom}
					/>
				)}
			</div>
		</Page>
	);
}

export default Rooms;