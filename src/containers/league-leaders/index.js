import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaders } from '../../components/functions/leaders';
import ShowLeaders from '../../components/leaders/showLeaders';
import * as actions from '../../store/actions';

const LeagueLeaders = () => {
  const dispatch = useDispatch();

  const [leadersPTS, setleadersPTS] = useState();
  const [leadersREB, setleadersREB] = useState();
  const [leadersAST, setleadersAST] = useState();
  const [leadersSTL, setleadersSTL] = useState();
  const [leadersBLK, setleadersBLK] = useState();
  const [loaded, setLoaded] = useState(false);

  const pts = useSelector(state => state.leaders.pointLeaders);
  const reb = useSelector(state => state.leaders.reboundLeaders);
  const ast = useSelector(state => state.leaders.assistLeaders);
  const stl = useSelector(state => state.leaders.stealLeaders);
  const blk = useSelector(state => state.leaders.blockLeaders);

  useEffect(() => {
    // only dispatch the actions if the state wasn't previously populated
    if (!pts) {
      dispatch(actions.getPointLeaders());
      setTimeout(() => {
        dispatch(actions.getReboundLeaders());
      }, 1);
      setTimeout(() => {
        dispatch(actions.getAssistLeaders());
      }, 2);
      setTimeout(() => {
        dispatch(actions.getStealLeaders());
      }, 3);
      setTimeout(() => {
        dispatch(actions.getBlockLeaders());
      }, 4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* when all the data gets loaded from the store begin mapping
    over each item to create this shortlist to be shown */
    if (pts && reb && ast && stl && blk) {
      // organized into arrays to simplify looping
      const categories = [
        [pts, setleadersPTS],
        [reb, setleadersREB],
        [ast, setleadersAST],
        [stl, setleadersSTL],
        [blk, setleadersBLK],
      ];

      // load the top 5 for each category
      getLeaders(categories);
      setLoaded(true);
    }

  }, [pts, reb, ast, stl, blk]);

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1366px',
    margin: '0 auto',
  }

  return (    
    <div style={styles}>
      {loaded ? (
        <>
          <div style={{width: '100%'}}>
            <h1>Point Leaders</h1>
            <ShowLeaders leaders={leadersPTS} />
          </div>

          <div style={{width: '100%'}}>
            <h1>Assist Leaders</h1>
            <ShowLeaders leaders={leadersAST} />
          </div>

          <div style={{width: '100%'}}>
            <h1>Rebounding Leaders</h1>
            <ShowLeaders leaders={leadersREB} />
          </div>

          <div style={{width: '100%'}}>
            <h1>Steal Leaders</h1>
            <ShowLeaders leaders={leadersSTL} />
          </div>

          <div style={{width: '100%'}}>
            <h1>Block Leaders</h1>
            <ShowLeaders leaders={leadersBLK} />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LeagueLeaders;
