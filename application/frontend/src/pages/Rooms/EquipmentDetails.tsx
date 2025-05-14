import React, { useEffect, useRef, useState } from 'react';
import * as styles from './styles.m.less';
import { Icon, Input } from '../../components';
import * as API from '../../thunks/equipments.thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Equipment } from '../../types/equipments';

type EquipmentDetailsProps = {
	equipment: Equipment,
	selected: (e: Equipment | null) => void,
}

const EquipmentDetails = ({
	equipment,
	selected
}: EquipmentDetailsProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const [edit, setEdit] = useState<boolean>(false);
	const [name, setName] = useState<string>(equipment.name);
	const [price, setPrice] = useState<string>(`${equipment.price}`);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				selected(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const updateEquipment = () => {
		dispatch(API.updateEquipment(equipment.id, {
			name,
			price: Number(price),
			room_id: equipment.room_id
		}));
		setEdit(false);
		selected(null);
	}

	return (
		<div className={styles['equipment-summary']} ref={containerRef}>
			{edit ?
				<div className={styles['edit-icon']} onClick={updateEquipment}>
					<Icon name='save' size='xxs'/>
				</div>
				:
				<div className={styles['edit-icon']} onClick={() => setEdit(!edit)}>
					<Icon name='pencil' size='xxs'/>
				</div>
			}

			<div className='d-flex'>
				<div className='mr-10'>id:</div>
				<div>{equipment.id}</div>
			</div>
			<div className='d-flex'>
				<div className='mr-10'>name:</div>
				{edit ?
					<Input
						value={name}
						onChange={setName}
						className='w-100'
					/>
					:
					<div>{equipment.name}</div>
				}
			</div>
			<div className='d-flex'>
				<div className='mr-10'>price:</div>
				$ 
				{edit ?
					<Input
						value={price}
						type='number'
						onChange={setPrice}
						className='w-90 ml-5'
					/>
					:
					<div>{equipment.price}</div>
				}
			</div>
		</div>
	);
}

export default EquipmentDetails;
