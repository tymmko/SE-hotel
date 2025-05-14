import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth.actions';
import { AppDispatch, RootState } from '../../app/store';
import { Icon, Input } from '../../components';
import { Intro } from '../../layouts';
import * as styles from './styles.m.less';

const SignUp: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const { error } = useSelector((state: RootState) => state.authReducer);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(register(username, email, password))
			.then(() => {
				navigate('/');
			});
	};

	return (
		<Intro>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles['form-group']}>
					<div className='mr-10'>username:</div>
					<Input
						type='text'
						className='input-field'
						value={username}
						onChange={setUsername}
					/>
				</div>
				<div className={styles['form-group']}>
					<div className='mr-40'>email:</div>
					<Input
						type='email'
						className='input-field'
						value={email}
						onChange={setEmail}
					/>
				</div>
				<div className={styles['form-group']}>
					<div className='mr-10'>password:</div>
					<div className='d-flex align-items-center position-relative'>
						<Input
							type={showPassword ? 'text' : 'password'}
							className='mr-10'
							value={password}
							onChange={setPassword}
						/>
						<Icon
							name='eye'
							className={styles['eye-icon']}
							size='extra-small'
							onClick={() => setShowPassword(!showPassword)}
						/>
					</div>
				</div>
				<button type='submit'>Sign Up</button>
				{error && <p className='d-grid justify-content-center color-pink'>{error}</p>}
			</form>
			<p>Already have an account? <Link to='/login'>Log In</Link></p>
		</Intro>
	);
};

export default SignUp;