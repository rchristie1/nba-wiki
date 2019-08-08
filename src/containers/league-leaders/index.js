import React, { useEffect, useState } from 'react';
import { getLeaders } from '../../components/functions/leaders';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

import CreateExpansionPanel from '../../components/UI/MaterialUI/expansionPanels';
import Loader from '../../widgets/loader';


const LeagueLeaders = () => {
  const dispatch = useDispatch();

  const [leadersPTS, setleadersPTS] = useState();
  const [leadersREB, setleadersREB] = useState();
  const [leadersAST, setleadersAST] = useState();
  const [leadersSTL, setleadersSTL] = useState();
  const [leadersBLK, setleadersBLK] = useState();

  const [toggle1, setToggle1] = useState(true);
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
    paddingTop: '40px'
  };

  const togglePanel1 = () => {
    let toggleValue = toggle1;

    setToggle1((toggleValue = !toggleValue));
  };

  return (
    <div style={styles}>
      <h1>League Leaders</h1>
      {loaded ? (
        CreateExpansionPanel([
          ['Point', leadersPTS],
          ['Assist', leadersAST],
          ['Rebouding', leadersREB],
          ['Steal', leadersSTL],
          ['Block', leadersBLK],
        ], [toggle1, togglePanel1])
      ) : (
       <Loader />
      )}
    </div>
  );
};

export default LeagueLeaders;
