import React from 'react';
import * as styles from './room-component.m.less';
import colors from '../../assets/colors.json';
import { RoomComponent } from '../types';


// mapping of colors depending on the room type
const intersectColors: Record<'single' | 'double' | 'suite', string> = {
    single: colors.blue,
    double: colors.green,
    suite: colors.yellow,
};

const roomNumberColors: Record<'single' | 'double' | 'suite', string> = {
    single: colors.blueMedium,
    double: colors.greenMedium,
    suite: colors.yellowMedium,
};

const RoomComponent = ({ type, isAvailable, price, roomNumber }: RoomComponent) => {
  const roomTypeClass = styles[`room-${type}`]; 
  const intersectColor = intersectColors[type];

  return (
    <div className={`${styles['room-component']} ${roomTypeClass}`} style={{ backgroundColor: colors.mainMedium }}>
      <div className={styles.rectangle}>
        <div className={styles.intersect} style={{ backgroundColor: intersectColor }}>
          <div className={styles['room-type']}>
            {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </div>
          <div className={styles['room-number']} style={{ color: roomNumberColors[type] }}>
            {`#${roomNumber}`}
          </div>
        </div>
        <div className={styles['room-info']}>
            <div className={styles.status}>
              Status : {isAvailable ? 'Available' : 'Occupied'}
            </div>
            <div className={styles.price}>
              Price : ${price} / night
            </div>
            <div className={styles.logo}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF6DD"/>
                <path d="M8 17L17 8M17 8H8.9M17 8V16.1" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;
