import React from 'react';
import Navigation from '../Navigation';
import styles from './AppBar.module.scss';

const AppBar = () => (
  <header className={styles.container}>
    <Navigation />
  </header>
);

export default AppBar;
