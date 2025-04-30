import React from 'react';
import classNames from 'classnames';
import unionIcon from '../../assets/icons/union.svg'; // adjust path if needed
import colors from '../../assets/colors.json';
// @ts-ignore
import * as styles from './styles.m.less';

type AddButtonProps = {
  color?: keyof typeof colors;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
};

const AddButton = ({ color, onClick, className }: AddButtonProps) => {
  const backgroundColor = color ? colors[color] : 'transparent';

  return (
    <div
      onClick={onClick}
      className={classNames(styles.addButton, className)}
      style={{ backgroundColor }}
    >
      <img src={unionIcon} alt="Add" className={styles.icon} />
    </div>
  );
};

export default AddButton;
