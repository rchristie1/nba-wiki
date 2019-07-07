import React from 'react';
import styles from './index.module.scss';
import { HeadShotsNBA, TeamLogo } from '../../config';
// import noImage from '../../assets/images/noImage.jpg';

const PlayerSummary = props => {
  const pd = props.data.playerData;
  const avg = props.data.playerAverages;
  
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div>
          {/* {showDefaultImage ? (
            <img src={noImage} alt={`${pd[1]} ${pd[2]}`} />
          ) : ( */}
            {/* <img src={`${HeadShots}/${pd[2]}/${pd[1]}`} alt={`${pd[1]} ${pd[2]}`} /> */}
            <img src={`${HeadShotsNBA}/${pd[0]}.png`} alt={`${pd[1]} ${pd[2]}`}/>
          {/* )} */}
        </div>
        <div className={styles.quickSummary}>
          <h1>{pd[3]}</h1>
          <h3>
            Number: {pd[13]} | Position: {pd[14]} | {`${pd[20]} - ${pd[17]}`}{' '}
          </h3>

          <div>Height: {pd[10]}</div>
          <div>Weight: {pd[11]}</div>
          <div>DOB: {props.DOB.toLocaleDateString()}</div>
          <div>Drafted: {pd[22]}</div>
          <div>Experience: {pd[12]}</div>
          <div>School: {pd[9]}</div>
          {/* <div>Born: {pd[7]}</div> */}
        </div>

        <div className={styles.teamLogo}>
          <img src={`${TeamLogo}/${pd[18]}_logo.png`} alt="team logo" />
        </div>
      </div>

      <div className={styles.averages}>
        <div>PPG: {avg[3]}</div>
        <div>APG: {avg[4]}</div>
        <div>RPG: {avg[5]}</div>
        <button onClick={props.clickToggle1}>{props.data.btn1Text}</button>
        <button onClick={props.clickToggle2}>{props.data.btn2Text}</button>
      </div>

      <div className={styles.content}>{props.data.showSeason ? props.stats[0] : props.stats[1]}</div>
    </div>
  );
};

export default PlayerSummary;
