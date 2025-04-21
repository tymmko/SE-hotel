import React from 'react';
import colors from '../../assets/colors.json'

type RoomStatusProps = {
  isAvailable: boolean;
};

const RoomStatus = ({ isAvailable }: RoomStatusProps) => {
  const statusText = isAvailable ? 'Free' : 'Occupied';

  const statusStyle = {
    position: 'absolute' as 'absolute',
    width: '67px',
    height: '22px',
    top: '20px',
    left: '20px',
    borderRadius: '8px',
    textAlign: 'center' as 'center',
    lineHeight: '22px',
    FontFamily: 'Karrik',
    fontSize: '12px',
    backgroundColor: isAvailable ? colors.blue : colors.pink, 
    color: colors.black,
  };

  return (
    <div style={statusStyle}>
      {statusText}
    </div>
  );
};

export default RoomStatus;