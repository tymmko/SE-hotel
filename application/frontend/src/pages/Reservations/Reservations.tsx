import React, { useState } from 'react';
import { RoomStatusDropdown, StatusOption } from '../../components/RoomStatusDropdown';
import { Page } from '../../layouts';

const statusOptions: StatusOption[] = [
  { value: 'reserved', label: 'Reserved', tagColor: '#FFA500' },
  { value: 'checked-in', label: 'Checked In', tagColor: '#4CAF50' },
  { value: 'checked-out', label: 'Checked Out', tagColor: '#F44336' },
];

const Reservations: React.FC = () => {
  const [status, setStatus] = useState<string>('checked-in');

  return (
    <Page active={'reservations'}>
    <div style={{ padding: 24 }}>
      <h4>Reservation #1234</h4>

      <div style={{ display: 'flex', gap: 16, margin: '16px 0' }}>
        <div>
          <h4> Room</h4>
          <h4>#362</h4>
        </div>
        <div>
          <h4>Guest</h4>
          <h4>Random Name</h4>
        </div>
        <div>
          <h4>Status</h4>
          <RoomStatusDropdown
            options={statusOptions}
            value={status}
            onChange={setStatus}
            size="small"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', rowGap: 8, columnGap: 16 }}>
        <h4>Start date:</h4>
        <h4>11/04/2023</h4>
        <h4>End date:</h4>
        <h4>11/04/2023</h4>
        <h4>Total price:</h4>
        <h4>$300</h4>
      </div>
    </div>
    </Page>
  );
};

export default Reservations;
