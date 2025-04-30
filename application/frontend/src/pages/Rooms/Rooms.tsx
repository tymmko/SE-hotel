import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import RoomsList from './RoomsList';
import RoomSummary from './RoomSummary';

import * as styles from './styles.m.less';
import { Room } from '../../types/rooms';

const rooms: Room[] = [
	{
		type: 'single',
		isAvailable: true,
		price: 100,
		roomNumber: 12,
		guestId: 1
	},
	{
		type: 'double',
		isAvailable: false,
		price: 200,
		roomNumber: 13,
		guestId: 1
	},
	{
		type: 'suite',
		isAvailable: true,
		price: 300,
		roomNumber: 15,
		guestId: 1
	},
	{
		type: 'suite',
		isAvailable: true,
		price: 300,
		roomNumber: 15,
		guestId: 1
	}
]


function Rooms() {
	const [selected, setSelected] = useState<Room>();

	useEffect(() => {
		if (rooms) {
			setSelected(rooms[0]);
		}

	}, [rooms]);

	return (
		<Page active={'rooms'}>
			<div className={styles['rooms']}>
				<RoomsList
					selectRoom={setSelected}
					rooms={rooms}
				/>
				{selected &&
					<RoomSummary
						room={selected}
					/>
				}
			</div>
		</Page>
	);
}

export default Rooms;
