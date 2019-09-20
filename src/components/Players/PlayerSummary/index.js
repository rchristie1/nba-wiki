import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';

import PlayerContext from '../../../context/PlayerContext';
import { TeamLogo } from '../../../config';

import { useDispatch } from 'react-redux';
import { updateTeamID } from '../../../store/actions';

import PlayerGameLog from '../PlayerGameLog';

import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const PlayerSummary = () => {
  const classes = useStyles();
  const { playerData, playerAverages, playerImage, DOB, stats } = useContext(PlayerContext);

  const [showSeason, setShowSeason] = useState(true);
  const [toggleStats, setToggleStats] = useState(true);
  const [toggleTotals, setToggleTotals] = useState(null);
  const [seasonStats, setSeasonStats] = useState(stats[0][0]);
  const [careerStats, setCareerStats] = useState(stats[1][0]);
  const [selectList, setSelectList] = useState();
  const [year, setYear] = useState('');

  const dispatch = useDispatch();

  const pd = playerData;
  const avg = playerAverages;
  const pi = playerImage;

  const clickToggleStats = type => {
    setShowSeason(true);
    setToggleTotals(null);
    if (type === 'Season') {
      setToggleStats(true);
      setSeasonStats(stats[0][0]);
    } else {
      setToggleStats(false);
      setSeasonStats(stats[0][1]);
    }
  };

  const clickToggleTotals = type => {
    setShowSeason(false);
    setToggleStats(null);
    if (type === 'Season') {
      setToggleTotals(true);
      setCareerStats(stats[1][0]);
    } else {
      setToggleTotals(false);
      setCareerStats(stats[1][1]);
    }
  };

  const handleChange = e => {
    // additional parse int was done fix material-UI bug, wasnt rendering a string
    setYear(parseInt(`${e.target.value}-${(parseInt(e.target.value) + 1).toString().substring(2)}`));
  };

  useEffect(() => {
    let listItems = [];

    if (careerStats && seasonStats) {
      const total = pd[23] - pd[22];

      for (let i = 0; i <= total; i++) {
        listItems.push(`${pd[22] + i}-${(pd[22] + 1 + i).toString().substring(2)}`);
      }

      setSelectList(listItems);
    }
  }, [careerStats, pd, seasonStats]);

  return selectList ? (
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
          <div
            className={toggleStats === false ? styles.tabSelected : null}
            onClick={() => clickToggleStats('Playoffs')}
          >
            Playoff Stats
          </div>
        </div>
        <div className={styles.tabGroup2}>
          <div className={toggleTotals ? styles.tabSelected : null} onClick={() => clickToggleTotals('Season')}>
            Season Totals
          </div>
          <div
            className={toggleTotals === false ? styles.tabSelected : null}
            onClick={() => clickToggleTotals('Career')}
          >
            Playoff Totals
          </div>
        </div>
      </section>

      <div className={styles.averages}>
        <div>PPG: {avg[3]}</div>
        <div>APG: {avg[4]}</div>
        <div>RPG: {avg[5]}</div>
      </div>

      <div className={styles.content}>{showSeason ? seasonStats : careerStats}</div>

      <h1 className={styles.gameLogTitle}>Game Log</h1>

      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='demo-controlled-open-select'>Year</InputLabel>
          <Select value={year} onChange={e => handleChange(e)}>
            {selectList.map((year, i) => (
              <MenuItem key={i} value={year.toString().substring(0, 4)}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <section className={styles.infoTabs}>
        <div className={styles.tabGroup1}>
          <div className={toggleStats ? styles.tabSelected : null} onClick={() => clickToggleStats('Season')}>
            Season
          </div>
          <div className={toggleStats ? styles.tabSelected : null} onClick={() => clickToggleStats('Season')}>
            Pre-Season
          </div>
        </div>
        <div className={styles.tabGroup2}>
          <div
            className={toggleTotals === false ? styles.tabSelected : null}
            onClick={() => clickToggleTotals('Career')}
          >
            Playoffs
          </div>
          <div
            className={toggleTotals === false ? styles.tabSelected : null}
            onClick={() => clickToggleTotals('Career')}
          >
            All-Star
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <PlayerGameLog id={pd[0]} year={year} />
      </div>
    </section>
  ) : null;
};

export default PlayerSummary;
