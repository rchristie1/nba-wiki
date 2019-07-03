import React, { Component } from 'react';
import styles from './index.module.scss';
import Loader from '../../widgets/loader';

import axios from 'axios';
import { HeadShots, playercareerstats, commonplayerinfo, API2 } from '../../config';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class index extends Component {
  state = {
    playerData: null,
    playerAverages: null,
    careerStats: null,
    loading: true,
    totals: [],
    statToggle: true,
    showSeason: true,
    btn1Text: 'Season Stats',
    btn2Text: 'Career Totals',
  };

  //#region Material UI
  useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  }));

  StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    root: {
      width: 100,
      padding: 8,
    },
  }))(TableCell);

  StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  //#endregion

  componentDidMount() {
    //the id of the player we want to search
    const PID = 201566;

    //Apply the current PlayerID to the config options
    commonplayerinfo.PlayerID = PID;
    playercareerstats.PlayerID = PID;

    // post to the url with the Query params
    axios
      //   .post('/commonplayerinfo', commonplayerinfo)
      .get(`${API2}/commonplayerinfo`)
      .then(res => {
        this.setState({
          playerData: res.data.resultSets[0].rowSet[0],
          playerAverages: res.data.resultSets[1].rowSet[0],
        });

        axios
          //   .post('/playercareerstats', playercareerstats)
          .get(`${API2}/playercareerstats`)
          .then(resp => {
            this.setState({ careerStats: resp.data.resultSets });
            this.getAllStats(resp.data.resultSets);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  getAllStats = playerStats => {
    const classes = this.useStyles;
    let parent = null;
    let totals = [];

    //loop only the first 4 sections inside the results set
    for (let i = 0; i < 4; i++) {
      let exlusions = i === 0 || i === 2 ? [0, 2, 3, 5] : [0, 1, 2];

      //create the table head for teh categories
      const tableHead = this.createStatElement(playerStats[i].headers, exlusions, 'head');

      //next generate all the child elements
      const childElements = playerStats[i].rowSet.map(data => {
        for (let j = 0; j < data.length; j++) {
          return this.createStatElement(data, exlusions, 'row');
        }
        return data;
      });

      // put together the entire table to output
      parent = (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>{tableHead}</TableHead>
            <TableBody>{childElements}</TableBody>
          </Table>
        </Paper>
      );
      totals = [...totals, parent];
    }

    //return the season totals for the player
    return this.setState({ totals });
  };

  // generates the elements for the table
  createStatElement = (data, exclusions, type) => {
    let filterData = [];

    data.map((d, i) => {
      if (!exclusions.includes(i)) {
        // only run if doing work for the head elements
        if (type === 'head') {
          if (d.includes('_PCT')) d = d.replace('_PCT', ' %');
          if (d === 'TEAM_ABBREVIATION') d = 'TEAM';
          if (d === 'SEASON_ID') d = 'SEASON';

          return (filterData = [
            ...filterData,
            <this.StyledTableCell align='right' key={i}>
              {d}
            </this.StyledTableCell>,
          ]);
        }
        filterData = [
          ...filterData,
          <this.StyledTableCell align='right' key={i}>
            {d}
          </this.StyledTableCell>,
        ];
      }
      return filterData;
    });
    return type === 'head' ? (
      <TableRow hover>{filterData}</TableRow>
    ) : (
      <this.StyledTableRow key={`${data[0]}${data[26]}`}>{filterData}</this.StyledTableRow>
    );
  };

  toggleStats = () => {
    let toggle = this.state.statToggle;

    toggle = !toggle;

    const btn1Text = toggle ? 'Season Stats' : 'Career Stats';

    this.setState({ statToggle: toggle, btn1Text});
  };

  toggleStatType = () => {
      let showSeason = this.state.showSeason;

      showSeason = !showSeason;

      const btn2Text = showSeason ? 'Career Totals' : 'Season Totals';

      this.setState({ showSeason, btn2Text })
  }

  render() {
    //if loaded then log the player data
    let loaded = this.state.careerStats && this.state.totals.length > 0 ? true : false;
    const avg = this.state.playerAverages;
    const pd = this.state.playerData;
    let DOB = '';
    let showSeasonStats = '';
    let showCareerStats = '';
    let showSeason = this.state.showSeason;

    if (loaded) {
      DOB = new Date(pd[6]);
      DOB.toLocaleDateString();
      showSeasonStats = this.state.statToggle ? this.state.totals[0] : this.state.totals[2];
      showCareerStats = this.state.statToggle ? this.state.totals[1] : this.state.totals[3];
    }

    return loaded ? (
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profileDetails}>
            <img src={`${HeadShots}/${pd[2]}/${pd[1]}`} alt='player' />
          </div>
          <div>
            <h1>{pd[3]}</h1>
            <h3>
              Number: {pd[13]} | Position: {pd[14]} | {`${pd[20]} - ${pd[17]}`}{' '}
            </h3>

            <div>Height: {pd[10]}</div>
            <div>Weight: {pd[11]}</div>
            <div>DOB: {DOB.toLocaleDateString()}</div>
            <div>Drafted: {pd[22]}</div>
            <div>Experience: {pd[12]}</div>
            <div>School: {pd[9]}</div>
            <div>Born: {pd[7]}</div>
          </div>
        </div>

        <div className={styles.averages}>
          <div>PPG: {avg[3]}</div>
          <div>APG: {avg[4]}</div>
          <div>RPG: {avg[5]}</div>
          <button onClick={() => this.toggleStats()}>{this.state.btn1Text}</button>
          <button onClick={() => this.toggleStatType()}>{this.state.btn2Text}</button>
        </div>

        <div className={styles.content}>{showSeason ? showSeasonStats : showCareerStats}</div>
      </div>
    ) : (
      <Loader />
    );
  }
}
