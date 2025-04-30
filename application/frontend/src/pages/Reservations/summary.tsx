import React from 'react';
import { RoomStatusDropdown, StatusOption } from '../../components/RoomStatusDropdown';
import { Icon } from '../../components/Icon';

type SummaryProps = {
  id: string;
  roomNumber: string;
  guestName: string;
  status: string;
  onStatusChange: (status: string) => void;
  statusOptions: StatusOption[];
  startDate: string;
  endDate: string;
  totalPrice: string;
};

export const Summary: React.FC<SummaryProps> = ({
  id,
  roomNumber,
  guestName,
  status,
  onStatusChange,
  statusOptions,
  startDate,
  endDate,
  totalPrice,
}) => {
  return (
    <div className="bg-amber-50 p-6 rounded-xl w-fit text-sm font-medium">
      <h3 className="text-lg font-bold mb-4">Summary</h3>

      <div className="mb-20">
        <p className='mb-7'>
          <span className="text-black/80">id:</span>
          <span className="ml-2 text-black">{id}</span>
        </p>

        <p className="d-flex mb-7">
          <span style={{ alignSelf: 'center' }}>room:</span>
          <Icon name="roomNumberBadge" size="extra-small" className="ml-5" />
          <span className='ml-5'>{roomNumber}</span>
        </p>

        <p className="d-flex mb-7">
          <span style={{ alignSelf: 'center' }}>guest:</span>
          <Icon name="guestBadge" size="extra-small" className="ml-5" />
          <span className='ml-5'>{guestName}</span>
        </p>

        <div className="d-flex">
          <span className="mr-5" style={{ alignSelf: 'center' }}>status:</span>
          <RoomStatusDropdown
            options={statusOptions}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      </div>

      <div>
        <p className='mb-7'>
          <span className="text-black/80">start date:</span>
          <span className="ml-2 text-black">{startDate}</span>
        </p>
        <p className='mb-7'>
          <span className="text-black/80">end date:</span>
          <span className="ml-2 text-black">{endDate}</span>
        </p>
        <p className='mb-7'>
          <span className="text-black/80">total price:</span>
          <span className="ml-2 text-black">{totalPrice}</span>
        </p>
      </div>
    </div>
  );
};
