import React from 'react';
import { Page } from '../../layouts';
import RoomsList from './RoomsList';
import RoomSummary from './RoomSummary';

import * as styles from './styles.m.less';

function Rooms() {
	return (
		<Page active={'rooms'}>
			<div className={styles['rooms']}>
				<RoomsList />
				<RoomSummary />
			</div>
		</Page>
	);
}

export default Rooms;
