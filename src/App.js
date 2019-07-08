import React from 'react';
import styles from './App.module.scss';
import PlayerProfile from './containers/player-profile';
import TeamProfile from './containers/team-profile';
import Header from './components/Header';

import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <div className={styles.profile}>
        <Switch>
          <Route path="/" exact component={PlayerProfile} />
          <Route path="/teams" exact component={TeamProfile} />
        </Switch>
      {/* <PlayerProfile /> */}
      {/* <TeamProfile /> */}
      </div>

      <footer> this app was created for fun - without the express written consent of the NBA</footer>
    </>
  );
}

export default App;
