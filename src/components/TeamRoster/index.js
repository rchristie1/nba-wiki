import React from 'react';
import styles from './index.module.scss';

const showPlayers = players => {
  const allPlayers = players.map((d, i) => (
    <div key={i} className={styles.playerList}>
      <div>
        <span className={styles.number}>{d[4]}</span> <a href={`${d[12]}`}>{d[3]}</a>
      </div>
      <div>{d[5]}</div>
      <div>{d[6]}</div>
      <div>{d[11] !== ' ' ? d[11] : 'N/A'}</div>
    </div>
  ));
  return allPlayers;
};
const showCoaches = players => {
  const allCoaches = players.map((d, i) => (
    <div key={i} className={styles.playerList}>
      <div>{d[5]}</div>
      <div>{d[8]}</div>
    </div>
  ));
  return allCoaches;
};

const TeamRoster = props => {    
  return (
    <div className={styles.teamRoster}>
      <div>
        <div className={styles.headers}>
          <div><span className={styles.number}>#</span>Player</div>
          <div>Position</div>
          <div>Height</div>
          <div>School</div>
        </div>
        <div>{showPlayers(props.data[0])}</div>
      </div>
      <div>
        <h2>Coaching Staff</h2>
        <div>{showCoaches(props.data[1])}</div>
      </div>
    </div>
  );
};

export default TeamRoster;
