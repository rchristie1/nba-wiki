import React, { Component } from 'react';
import styles from './index.module.scss';
import Loader from '../../widgets/loader';

import axios from 'axios';
import { API2 } from '../../config';

export default class index extends Component {
  state = {
    playerData: null,
    playerAverages: null,
  };

  componentDidMount() {
    axios
      .get(`${API2}/russ`)
      .then(res => {
        this.setState({
          playerData: res.data.resultSets[0].rowSet[0],
          playerAverages: res.data.resultSets[1].rowSet[0],
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    //if loaded then log the player data
    let loaded = this.state.playerAverages ? true : false;
    let avg = this.state.playerAverages;
    let pd = this.state.playerData;

    return (
      !loaded ?
      <div className={styles.container}>
        <div className={styles.profile}>
          <h1>{pd[3]}</h1>
          <h3>Number: {pd[13]} | Position: {pd[14]} | Team: {`${pd[20]} - ${pd[17]}`} </h3>

          <div>Height: {pd[10]}</div>
          <div>Weight: {pd[11]}</div>
          <div>DOB: {pd[6]}</div>
          <div>Drafted: {pd[22]}</div>
          <div>Experience: {pd[12]}</div>
          <div>School: {pd[9]}</div>
          <div>Born: {pd[7]}</div>
        </div>

        <div className={styles.averages}>
          <div>PPG: {avg[3]}</div>
          <div>APG: {avg[4]}</div>
          <div>RPG: {avg[5]}</div>
        </div>

        <div className={styles.content}>
          <div>
            player Image here
            {/* <img /> */}
          </div>

          <div>
            {/* All stats can be put here in a table like format */}
            {/* should be able to change this view per year, per game, if unsure check NBA.com */}
            Player Stats
          </div>
        </div>
      </div> : <Loader />
    );
  }
}
