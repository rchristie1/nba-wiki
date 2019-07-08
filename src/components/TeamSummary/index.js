import React from 'react';
import styles from './index.module.scss';

import TeamRoster from '../TeamRoster';
import TeamGameLog from '../TeamGameLog';

import { TeamLogo } from '../../config';

const TeamSummary = props => {
  const td = props.data.teamDetails;
  const sr = props.data.seasonRankings;
  const displayTab = props.data.showGamelog;

  const tabActive = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginLeft: '0.2%',
    transform: 'scale(1.2)',
  };

  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamSummary}>
        <div className={styles.left}>
          <div>
            <img src={`${TeamLogo}/${td[4]}_logo.png`} alt='team logo' />
          </div>

          <div className={styles.teamName}>
            <h1>{`${td[2]} ${td[3]}`}</h1>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.teamDetails}>
            <ul>
              <li>{`Conference: ${td[5]}ern`}</li>
              <li>{`Division: ${td[6]}`}</li>
              <li>{`Season Record: W:${td[8]} L:${td[9]}`}</li>
              <li>{`Win %${td[10]}`}</li>
              <li>{`Conference Ranking: ${td[11]}`}</li>
              <li>{`Division Ranking: ${td[12]}`}</li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.seasonRankings}>
            <ul>
              <li>{`Points Rank: ${sr[3]}`}</li>
              <li>{`PPG: ${sr[4]}`}</li>
              <li>{`Rebounds Ran: ${sr[5]}`}</li>
              <li>{`RPG: ${sr[6]}`}</li>
              <li>{`Assists Rank: ${sr[7]}`}</li>
              <li>{`APG: ${sr[8]}`}</li>
              <li>{`Opponent Points Ranking: ${sr[9]}`}</li>
              <li>{`OPPG: ${sr[10]}`}</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.tabs}>
          <div className={!displayTab ? styles.active : undefined} onClick={() => props.showComponent(false)}>Roster/Coaching Staff</div>
          <div className={displayTab ? styles.active : undefined} onClick={() => props.showComponent(true)}>Game Log</div>
        </div>
        {displayTab ? <TeamGameLog data={props.data.teamGameLog} /> : <TeamRoster data={props.data.teamRoster} />}
      </div>
    </div>
  );
};

export default TeamSummary;
