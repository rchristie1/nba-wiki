import React from 'react';
import styles from './App.module.scss';
import PlayerProfile from './containers/player-profile';
import Header from './components/Header';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <div className={styles.profile}>
      <PlayerProfile />
      </div>

      <footer> this app was created for fun - without the express written consent of the NBA</footer>
    </>
  );
}

export default App;
