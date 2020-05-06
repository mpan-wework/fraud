import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import RouterView from './router/RouterView';
import AssistiveTouch from './components/controls/AssistiveTouch';
import 'normalize.css/normalize.css';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <RouterView />
        <AssistiveTouch />
      </div>
    </Router>
  );
}

export default App;
