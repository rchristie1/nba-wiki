import React, { useContext, useState } from 'react';
import styles from './index.module.scss';

import PlayerContext from '../../../context/PlayerContext';
import { TeamLogo } from '../../../config';

import { useDispatch } from 'react-redux';
import { updateTeamID } from '../../../store/actions';

import PlayerGameLog from '../PlayerGameLog';

import { Link } from 'react-router-dom';

const PlayerSummary = () => {
  const { playerData, playerAverages, playerImage, DOB, stats } = useContext(PlayerContext);

  const [showSeason, setShowSeason] = useState(true);
  const [toggleStats, setToggleStats] = useState(true);
  const [toggleTotals, setToggleTotals] = useState(null);
  const [seasonStats, setSeasonStats] = useState(stats[0][0]);
  const [careerStats, setCareerStats] = useState(stats[1][0]);
  
  const dispatch = useDispatch();

  const pd = playerData;
  const avg = playerAverages;
  const pi = playerImage;

  const clickToggleStats = type => {
    setShowSeason(true);
    setToggleTotals(null);
    if(type === 'Season') {
      setToggleStats(true);
      setSeasonStats(stats[0][0])
    }else {
      setToggleStats(false);
      setSeasonStats(stats[0][1])
    }
  };

  const clickToggleTotals = type => {
    setShowSeason(false);
    setToggleStats(null);
    if(type === 'Season'){
      setToggleTotals(true)
      setCareerStats(stats[1][0]);
    } else {
      setToggleTotals(false);
      setCareerStats(stats[1][1]);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img className={styles.fullSize} src={pi} alt={`${pd[1]} ${pd[2]}`} />
        </div>
        <div className={styles.quickSummary}>
          <h1>{pd[3]}</h1>
          <h3>
            #{pd[13]} | {pd[14]} |{' '}
            <span
              onClick={() => {
                dispatch(updateTeamID(pd[16]));
              }}
            >
              <Link to='/teams'>&nbsp;{`${pd[20]} - ${pd[17]}`}</Link>
            </span>
          </h3>

          <div>Height: {pd[10]}</div>
          <div>Weight: {pd[11]}</div>
          <div>Drafted: {pd[22]}</div>
          <div>Experience: {pd[12]}</div>
          <div>DOB: {DOB}</div>
          <div>School: {pd[9]}</div>
        </div>

        <div
          className={styles.teamLogo}
          onClick={() => {
            dispatch(updateTeamID(pd[16]));
          }}
        >
          <Link to='/teams'>
            <img src={`${TeamLogo}/${pd[18]}_logo.png`} alt='team logo' />
          </Link>
        </div>
      </div>

      <section className={styles.infoTabs}>
        <div className={styles.tabGroup1}>
          <div className={toggleStats ? styles.tabSelected : null} onClick={() => clickToggleStats('Season')}>
            Season Stats
          </div>
          <div className={toggleStats === false ? styles.tabSelected : null} onClick={() => clickToggleStats('Playoffs')}>
            Playoff Stats
          </div>
        </div>
        <div className={styles.tabGroup2}>
          <div className={toggleTotals ? styles.tabSelected : null} onClick={() => clickToggleTotals('Season')}>
            Season Totals
          </div>
          <div className={toggleTotals === false ? styles.tabSelected : null} onClick={() => clickToggleTotals('Career')}>
          Playoff Totals
          </div>
        </div>
      </section>

      <div className={styles.averages}>
        <div>PPG: {avg[3]}</div>
        <div>APG: {avg[4]}</div>
        <div>RPG: {avg[5]}</div>
      </div>

      <div className={styles.content}>
        {showSeason ? seasonStats : careerStats}
        {/* <PlayerGameLog id={pd[0]} /> */}
      </div>
         
    </section>
  );
};

export default PlayerSummary;
