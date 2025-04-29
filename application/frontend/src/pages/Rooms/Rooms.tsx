import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import RoomsList from './RoomsList';
import RoomSummary from './RoomSummary';

import * as styles from './styles.m.less';
import { Room } from '../../types/rooms';

function Rooms() {
	const [selected, setSelected] = useState<Room>();

	return (
		<Page active={'rooms'}>
			<div className={styles['rooms']}>
				<RoomsList
					selectRoom={setSelected}
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
