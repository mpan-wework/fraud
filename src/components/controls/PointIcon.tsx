import React from 'react';
import styles from './PointIcon.module.css';

interface Props {
  moving: boolean;
  style: Object;
}

const PointIcon = (props: Props) => (
  <div
    className={[props.moving ? styles.moving : '', styles.point].join(' ')}
    style={props.style}
  >
    <div className={styles.circle1} />
    <div className={styles.circle2} />
    <div className={styles.circle3} />
  </div>
);

export default PointIcon;
