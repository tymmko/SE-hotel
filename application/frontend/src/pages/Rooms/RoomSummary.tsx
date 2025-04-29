import React from 'react';
import roomImg from '../../assets/pictures/room.png'
import * as styles from './styles.m.less';
import { Room } from '../../types/rooms';
import { colors, StatusTag } from '../../components';
import classNames from 'classnames';

type RoomSumaryProps = {
    room: Room;
}

const RoomSummary = ({
    room
}: RoomSumaryProps) => {
	return (
		<div className={styles['summary']}>
            <h1>Summary</h1>
            <div className='d-flex'>
                <img src={roomImg} alt="" />
                <div className={classNames('ml-30 d-flex', styles.info)}>
                    <div>Type: {room.type}</div>
                    <div>Status:
                        <StatusTag
							text={room.isAvailable ? 'Available' : 'Occupied'}
							hex={room.isAvailable ? colors.green : colors.pink}
							className={classNames('ml-10', styles.tag)}
						/>
                    </div>
                    <div>Guest:
                        
                    </div>
                </div>
            </div>
        </div>
	);
}

export default RoomSummary;
