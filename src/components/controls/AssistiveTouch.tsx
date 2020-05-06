import React, { useState } from 'react';
import Point from './Point';
import styles from './AssistiveTouch.module.css';
import { useHistory } from 'react-router-dom';

export enum MODE {
  POINT = 1,
  NONE = -1,
}

const AssistiveTouch = () => {
  const [mode] = useState<MODE>(MODE.POINT);

  const history = useHistory();

  return (
    <div className={styles.AssistiveTouch}>
      {mode === MODE.POINT ? (
        <Point
          mode={mode}
          onClick={() => {
            history.push('/');
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default AssistiveTouch;
