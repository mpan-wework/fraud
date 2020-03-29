import React, { useState, useCallback, ChangeEvent } from 'react';
import styles from './Search.module.css';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const onKeyWordChange = useCallback((event: ChangeEvent) => {
    setKeyword((event.target as HTMLInputElement).value);
  }, []);

  const onSearch = useCallback(() => {
    keyword &&
      window.open(`https://www.google.com/search?q=${keyword}`, '_blank');
  }, [keyword]);

  return (
    <div className={styles.Search}>
      <div className={styles.SearchBoxWrapper}>
        <div className={styles.SearchBox}>
          <input
            className={styles.input}
            type="text"
            onChange={onKeyWordChange}
          />
          <span className={styles.search}>
            <i className="fas fa-search"></i>
          </span>
          <span className={styles.microphone}>
            <i className="fas fa-microphone"></i>
          </span>
        </div>
      </div>
      <div className={styles.SearchButtons}>
        <div onClick={onSearch}>Google Search</div>
        <div onClick={onSearch}>I'm Feeling Lucky</div>
      </div>
    </div>
  );
};

export default SearchBox;
