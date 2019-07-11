import React from 'react';
import styles from './index.module.scss';

const showGameLog = data => {
    // const exclusions = [0,1,5,6,7];
    const w = {color: 'green'}
    const l = {color: 'red'}
  const gameLog = data.map((d, i) => (
    <div key={i} className={styles.results}>
      <div>{d[2]}</div>
      <div>{d[3]}</div>
      <div style={d[4] === 'W' ? w:l}>{d[4]}</div>
      <div>{d[8]}</div>
      <div>{d[9]}/{d[10]}</div>
      <div>{d[11]}</div>
      <div>{d[12]}/{d[13]}</div>
      <div>{d[14]}</div>
      <div>{d[15]}/{d[16]}</div>
      <div>{d[17]}</div>
      <div>{d[18]}</div>
      <div>{d[19]}</div>
      <div>{d[20]}</div>
      <div>{d[21]}</div>
      <div>{d[22]}</div>
      <div>{d[23]}</div>
      <div>{d[24]}</div>
      <div>{d[25]}</div>
      <div>{d[26]}</div>
    </div>
  ));

  return gameLog;
};

const TeamGameLog = props => {  
  return (
    <div className={styles.teamGamelog}>
      <div className={styles.resultsHead}>
        <div>Date</div>
        <div>Matchup: </div>
        <div>W/L</div>
        <div>Min</div>
        <div>FGM/FGA</div>
        <div>FG%: </div>
        <div>3PM/3PA</div>
        <div>FG3%</div>
        <div>FTM/FTA</div>
        <div>FT%:</div>
        <div>OREB:</div>
        <div>DREB:</div>
        <div>TREB:</div>
        <div>AST:</div>
        <div>STL:</div>
        <div>BLK:</div>
        <div>TOV:</div>
        <div>PF:</div>
        <div>PTS:</div>
      </div>
      <div className={styles.resultContainer}>
      {/* {showGameLog(props.data.resultSets[0].rowSet)} */}
      {showGameLog(props.data.rowSet)}
      </div>
    </div>
  );
};

export default TeamGameLog;
