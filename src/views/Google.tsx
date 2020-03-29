import React, { useState } from 'react';
import {
  LocaleProvider,
  NavTop,
  Logo,
  Search,
  NavBottom,
  useFavIcon,
} from '../components/Google';
import styles from './Google.module.css';

const Google = () => {
  useFavIcon();
  const [locale] = useState('en_us');
  return (
    <LocaleProvider value={locale}>
      <div className={styles.Google}>
        <div className={styles.NavTop}>
          <NavTop />
        </div>
        <div className={styles.Content}>
          <Logo />
          <Search />
        </div>
        <div className={styles.NavBottom}>
          <NavBottom />
        </div>
      </div>
    </LocaleProvider>
  );
};
export default Google;
