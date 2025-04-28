import React from 'react';
import room from '../../assets/pictures/room.png'
import * as styles from './styles.m.less';

function RoomSummary () {
	return (
		<div className={styles['summary']}>
            <h1>Summary</h1>
            <div>
                <img src={room} alt="" />
            </div>
        </div>
	);
}

export default RoomSummary;
