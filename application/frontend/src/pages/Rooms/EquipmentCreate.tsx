import React, { useEffect, useRef, useState } from 'react';
import * as styles from './styles.m.less';
import { Icon, Input } from '../../components';
import * as API from '../../thunks/equipments.thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
type EquipmentCreateProps = {
	room_id: number,
	selected: (value: boolean) => void,
}

const EquipmentCreate = ({
	room_id,
	selected
}: EquipmentCreateProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const [name, setName] = useState<string>('');
	const [price, setPrice] = useState<string>('');

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				selected(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const createEquipment = () => {
		dispatch(API.createEquipment(room_id, {
			name,
			price: Number(price)
		}));
		selected(false);
	}

	return (
		<div className={styles['equipment-summary']} ref={containerRef}>
			<div className={styles['edit-icon']} onClick={createEquipment}>
				<Icon name='save' size='xxs'/>
			</div>

			<div>New equipment</div>

			<div className='d-flex mt-20'>
				<div className='mr-10'>name:</div>
				<Input
					value={name}
					onChange={setName}
					className='w-100'
				/>
			</div>
			<div className='d-flex align-items-center mt-10'>
				<div className='mr-10'>price:</div>
				$ 
				<Input
					value={price}
					type='number'
					onChange={setPrice}
					className='w-90 ml-5'
				/>
			</div>
		</div>
	);
}

export default EquipmentCreate;
