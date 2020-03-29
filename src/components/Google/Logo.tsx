import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <span className={styles.letterG}>
        <i className="fab fa-google"></i>
      </span>
      <span className={styles.lettero1}>
        <i className="fas fa-genderless"></i>
      </span>
      <span className={styles.lettero2}>
        <i className="fas fa-genderless"></i>
      </span>
      <span className={styles.letterg}>g</span>
      <span className={styles.letterl} />
      <span className={styles.lettere}>e</span>
    </div>
  );
};

export default Logo;
