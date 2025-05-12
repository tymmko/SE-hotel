import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../reducers/auth.reducer'; // Correct import path
import { Icon } from '../../../../components';
import classNames from 'classnames';
import * as styles from './styles.m.less';
import { SearchBar } from '../SearchBar';

const filters = ['type', 'status'];

export const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <div className={classNames(styles['top-bar'], 'd-flex align-items-center justify-content-between')}>
      <SearchBar />
      <div className={classNames('w-40', styles['profile-icon'])}>
        <Icon
          name="user"
          size="extra-small"
          onClick={handleLogout}
          className={styles['clickable-icon']}
        />
      </div>
    </div>
  );
};