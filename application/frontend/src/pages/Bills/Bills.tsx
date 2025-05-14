import React, { useEffect, useState } from 'react';
import { Page } from '../../layouts';
import BillsList from './BillsList';
import BillSummary from './BillSummary';
import { RootState } from '../../reducers/root.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchBillById, fetchBills } from '../../thunks/bills.thunks';
import { ReactComponent as GroupShapes } from '../../assets/icons/group-shapes.svg';
import * as styles from './styles.m.less';
import classNames from 'classnames';

function Bills () {
	const dispatch = useDispatch<AppDispatch>();

	const [status, setStatus] = useState<string>('checked-in');
	const [create, setCreate] = useState<boolean>(false);
	
	const bills = useSelector((state: RootState) => state.BillsReducer.bills);
	const bill = useSelector((state: RootState) => state.BillsReducer.bill);

	useEffect(() => {
		dispatch(fetchBills());
	}, []);

	const chooseBill = (id: string) => {
		dispatch(fetchBillById(id));
	}

	const changeStatus = (status: string) => {
		// dispatch(updateBillStatus(bill.id, status as BillStatus));
	}

	return (
		<Page active={'bills'}>
			<div className={classNames('d-flex', styles.bills)}>
				<BillsList
					bills={bills}
					bill={bill}
					create={create}
					chooseBill={chooseBill} 
				/>

				{bill.id !== '0' && !create &&
					<BillSummary
						bill={bill}
						onStatusChange={changeStatus}
					/>
				}
			</div>
			{(bill.id !== '0' || create) &&
				<GroupShapes className={styles.shapes}/>
			}
		</Page>
	);
}

export default Bills;
