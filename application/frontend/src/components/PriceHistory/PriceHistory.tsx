import React from 'react';
import classNames from 'classnames';
// Import the SVG icons
import  StarIcon  from '../../assets/icons/star.svg';
import  DollarIcon  from '../../assets/icons/dolarSing.svg';
// @ts-ignore
import * as styles from './styles.m.less';

type PriceEntry = {
  price: string;
  startDate: string;
  endDate: string;
};

type PriceHistoryProps = {
  currentPrice: string;
  validSince: string;
  history: PriceEntry[];
  className?: string;
};

const PriceHistory: React.FC<PriceHistoryProps> = ({
  currentPrice,
  validSince,
  history,
  className,
}) => {
  return (
    <div className={styles['price-wrapper']}>
      <div className={styles['price-icon']}>
        <img src={StarIcon} alt="Star" className={styles['star-icon']} />
        <img src={DollarIcon} alt="Dolar" className={styles['dollar-icon']} />
      </div>
      <div className={classNames(styles['price-container'], className)}>
        <div className={styles['price-header']}>
          <h3>Price Details</h3>
          <div className={styles['price-info']}>
            <div>
              <strong>Current price:</strong> ${currentPrice}
            </div>
            <div>
              <strong>Valid since:</strong> {validSince}
            </div>
          </div>
        </div>
        <div className={styles['price-history']}>
          <h3>Price History</h3>
          <table>
            <thead>
              <tr>
                <th>Price per night</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>${entry.price}</td>
                  <td>{entry.startDate}</td>
                  <td>{entry.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;