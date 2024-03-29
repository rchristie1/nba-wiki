import React, { useContext, useState } from 'react';
import styles from './index.module.scss';

import TeamRoster from '../TeamRoster';
import TeamGameLog from '../TeamGameLog';

import { TeamLogo } from '../../../config';
import TeamContext from '../../../context/TeamContext';

const TeamSummary = () => {
  const { teamDetails, seasonRankings, teamRoster, teamGameLog } = useContext(TeamContext);

  const td = teamDetails;
  const sr = seasonRankings;
  const [tab, setTab] = useState(false);

  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamSummary}>
        <div className={styles.left}>
          <div>
            <img src={`${TeamLogo}/${td[4]}_logo.png`} alt='team logo' />
          </div>

          <div className={styles.teamName}>
            <h1>{`${td[2]} ${td[3]}`}</h1>
            <div className={styles.keyStats}>
              <h2 className={td[5] === 'East' ? styles.east : styles.west}>{`${td[5]}ern Conference`}</h2>
              <h3>{`W:${td[8]} L:${td[9]}`}</h3>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.right}>
          <div className={styles.teamDetails}>
            <ul>
              <li>{`Win Rate: ${td[10] * 100}%`}</li>
              <li>{`Division: ${td[6]}`}</li>
              <li>{`Conference Ranking: ${td[11]}`}</li>
              <li>{`Division Ranking: ${td[12]}`}</li>
              <li>{`Points Rank: ${sr[3]}`}</li>
              <li>{`Points Against Ranking: ${sr[9]}`}</li>
            </ul>
          </div>

          <div className={styles.seasonRankings}>
            <ul>
              <li>{`APG: ${sr[8]}`}</li>
              <li>{`PPG: ${sr[4]}`}</li>
              <li>{`RPG: ${sr[6]}`}</li>
              <li>{`OPPG: ${sr[10]}`}</li>
              <li>{`Assists Rank: ${sr[7]}`}</li>
              <li>{`Rebounds Rank: ${sr[5]}`}</li>
              
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.tabs}>
          <div className={!tab ? styles.tabSelected : undefined} onClick={() => setTab(false)}>
            Roster/Coaching Staff
          </div>
          <div className={tab ? styles.tabSelected : undefined} onClick={() => setTab(true)}>
            Game Log
          </div>
        </div>
        {tab ? <TeamGameLog data={teamGameLog} /> : <TeamRoster data={teamRoster} />}
      </div>
    </div>
  );
};

export default TeamSummary;
