import React, { useEffect } from 'react';
import { colors, StatusDropdown, StatusOption} from '../../components';
import { Icon } from '../../components'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchGuestById } from '../../thunks/guests.thunks';
import { Bill } from '../../types/bills';

type SummaryProps = {
	bill: Bill,
	onStatusChange: (status: string) => void;
};

const statusOptions: StatusOption[] = [
	{ value: 'paid', label: 'Paid', color: colors.green },
    { value: 'unpaid', label: 'Unpaid', color: colors.pink},
];

const BillSummary: React.FC<SummaryProps> = ({
	bill,
	onStatusChange,
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const errorStatus = useSelector((state: RootState) => state.BillsReducer.error);
	

	return (
		<div className="bg-amber-50 p-6 rounded-xl w-fit text-sm font-medium">
			<h1>Summary</h1>

			<div className="mb-20">
				<div className='mb-15'>
					<span className="text-black/80">bill id:</span>
					<span className="ml-6 ft-14">{bill.id}</span>
				</div>

				<div className="d-flex mb-15">
					<span style={{ alignSelf: 'center' }}>stay id:</span>
					<div className='d-flex align-items-center'>
						<span className='ml-5 ft-14'>{bill.stay_id}</span>
					</div>
				</div>

				<div className="d-flex">
					<span className="mr-5" style={{ alignSelf: 'center' }}>status:</span>
					<StatusDropdown
						options={statusOptions}
						value={bill.status}
						onChange={onStatusChange}
					/>
				</div>
				{/* {errorStatus != null &&
					<div className='color-pink w-250'>ERROR: {errorStatus.message}</div>
				} */}
			</div>
		</div>
	);
};

export default BillSummary;