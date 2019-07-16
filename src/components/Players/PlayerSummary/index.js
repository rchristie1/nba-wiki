import React from 'react';
import styles from './index.module.scss';
import { TeamLogo } from '../../../config';
import { Link } from 'react-router-dom';

const PlayerSummary = props => {
  const pd = props.data.playerData;
  const avg = props.data.playerAverages;
  const pi = props.data.playerImage;
  const showTeamInfo = props.openTeamInfo;
  const toggleStats = props.data.statToggle;
  const toggleTotals = props.data.showSeason;

  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img className={styles.fullSize} src={pi} alt={`${pd[1]} ${pd[2]}`} />
        </div>
        <div className={styles.quickSummary}>
          <h1>{pd[3]}</h1>
          <h3>
            #{pd[13]} | {pd[14]} | <span onClick={() => {
            showTeamInfo(pd[16]);
          }}><Link to='/teams'>&nbsp;{`${pd[20]} - ${pd[17]}`}</Link></span>
          </h3>

          <div>Height: {pd[10]}</div>
          <div>Weight: {pd[11]}</div>
          <div>Drafted: {pd[22]}</div>
          <div>Experience: {pd[12]}</div>
          <div>DOB: {props.DOB.toLocaleDateString()}</div>
          <div>School: {pd[9]}</div>
        </div>

        <div
          className={styles.teamLogo}
          onClick={() => {
            showTeamInfo(pd[16]);
          }}
        >
          <Link to='/teams'>
            <img src={`${TeamLogo}/${pd[18]}_logo.png`} alt='team logo' />
          </Link>
        </div>
      </div>

      <section className={styles.infoTabs}>
        <div className={styles.tabGroup1}>
          <div className={toggleStats ? styles.tabSelected : null} onClick={() => props.clickToggle1('Season')}>
            Season Stats
          </div>
          <div className={!toggleStats ? styles.tabSelected : null} onClick={() => props.clickToggle1('Playoffs')}>
            Playoff Stats
          </div>
        </div>
        <div className={styles.tabGroup2}>
          <div className={toggleTotals ? styles.tabSelected : null} onClick={() => props.clickToggle2('Season')}>
            Season Totals
          </div>
          <div className={!toggleTotals ? styles.tabSelected : null} onClick={() => props.clickToggle2('Career')}>
            Career Totals
          </div>
        </div>
      </section>
      <div className={styles.averages}>
        <div>PPG: {avg[3]}</div>
        <div>APG: {avg[4]}</div>
        <div>RPG: {avg[5]}</div>
      </div>

      <div className={styles.content}>{props.data.showSeason ? props.stats[0] : props.stats[1]}</div>
    </section>
  );
};

export default PlayerSummary;
