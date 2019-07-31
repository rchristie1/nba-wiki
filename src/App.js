import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header';

import { Switch, Route } from "react-router-dom";
import PlayerProfile from './containers/player-profile';
import TeamProfile from './containers/team-profile';
import LeagueLeaders from './containers/league-leaders';


function App() {
  return (
    <>
      <header>
        <Route path="*" component={Header} />
      </header>

      <div className={styles.profile}>
        <Switch>
          <Route path="/" exact component={PlayerProfile} />
          <Route path="/teams" exact component={TeamProfile} />
          <Route path="/leaders" exact component={LeagueLeaders} />
        </Switch>
      </div>

      <footer> this app was created for fun - without the express written consent of the NBA</footer>
    </>
  );
}

export default App;
