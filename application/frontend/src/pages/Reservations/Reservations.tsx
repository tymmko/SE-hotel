import React, { useState } from 'react';
import { RoomStatusDropdown, StatusOption } from '../../components/RoomStatusDropdown';
import { Page } from '../../layouts';
import classNames from 'classnames';
import { Icon } from '../../components';
import { SideBar } from '../../layouts/partials/common';
import { TopBar } from '../../layouts/partials/common';
import { Summary } from './summary';

const statusOptions: StatusOption[] = [
  { value: 'Paid', label: 'Paid', tagColor: '#FFF6DD' },
  { value: 'checked-in', label: 'Checked In', tagColor: '#99AD65' },
  { value: 'checked-out', label: 'Checked Out', tagColor: '#FBCD6A' },
];

const Reservations: React.FC = () => {
  const [status, setStatus] = useState<string>('checked-in');

  return (
    <Page active={'reservations'}>
    <div style={{ padding: 24 }}>
    <Summary
      id="1234"
      roomNumber="362"
      guestName="Random Name"
      status={status}
      onStatusChange={setStatus}
      statusOptions={statusOptions}
      startDate="11/04/2023"
      endDate="11/04/2023"
      totalPrice="$300"
    />
    </div>
    </Page>
  );
};

export default Reservations;
