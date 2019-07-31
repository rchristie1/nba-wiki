import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const LeagueLeaders = () => {
  const dispatch = useDispatch();

  const [leadersPTS, setleadersPTS] = useState();
  const [leadersREB, setleadersREB] = useState();

  const pts = useSelector(state => state.leaders.pointLeaders);
  const reb = useSelector(state => state.leaders.reboundLeaders);
  // const assists = useSelector(state => state.leaders.pointLeaders);
  // const steals = useSelector(state => state.leaders.pointLeaders);
  // const blocks = useSelector(state => state.leaders.pointLeaders);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pts) {
      let tmp = [];
      pts.map((d, i) => {
        if (i < 5) {
          tmp = [...tmp, d];
        }
        return setleadersPTS(tmp);
      });
    }
  }, [pts]);

  useEffect(() => {
    if (reb) {
      let tmp = [];
      reb.map((d, i) => {
        if (i < 5) {
          tmp = [...tmp, d];
        }
        return setleadersREB(tmp);
      });
    }
  }, [reb]);

  console.log(leadersPTS, leadersREB);

  return (
    <div>
      stuff herer
      <br />
      sdafasdfdsf <br />
      sdafasdfdsf <br />
      sdafasdfdsf <br />
      sdafasdfdsf <br />
      sdafasdfdsf <br />
    </div>
  );
};

export default LeagueLeaders;
