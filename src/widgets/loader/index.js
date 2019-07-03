import React from 'react';
import styles from './index.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
        <div className={styles.loader}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
  );
};

export default Loader;
