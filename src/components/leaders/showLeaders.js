import React from 'react';
import styles from './showleaders.module.scss';
import { ActionShots } from '../../config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePlayerID } from '../../store/actions';

const ShowLeaders = props => {
  const dispatch = useDispatch();

  const leaders = props.leaders.map((d, i) => (
    <div className={styles.LeaderContent} key={i}>
      <div className={styles.pad} />
      <div>{d[1]}</div>
      <div>
        <img src={`${ActionShots}/${props.leaders[i][0]}.png`} alt={`${d[2]} action shot`} />
      </div>
      <div className={styles.PlayerName}>
        <Link to='/' onClick={() => dispatch(updatePlayerID(d[0]))}>
          {d[2]}
        </Link>
        <div>{d[3]}</div>
      </div>
      {/* <div>{d[3]}</div> */}
      <div className={styles.rightSideTile}>
        <div>GP: {d[4]}</div>
        <div>Points: {d[22]}</div>
        <div>Rebounds: {d[17]}</div>
        <div>Assists: {d[18]}</div>
        <div>Steals: {d[19]}</div>
        <div>Blocks: {d[20]}</div>
      </div>
    </div>
  ));

  return leaders;
};

export default ShowLeaders;
