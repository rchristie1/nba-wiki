// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import TeamSummary from '../../components/Teams/TeamSummary';
import TeamContext from '../../context/TeamContext';
import Loader from '../../widgets/loader';

import axios from 'axios';
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

import { commonteamroster, teaminfocommon, teamgamelog } from '../../config';

// class TeamProfile extends Component {
const TeamProfile = () => {
  const dispatch = useDispatch();
  const TID = useSelector(state => state.teams.teamID);
  // const PID = useSelector(state => state.players.playerID);

  const [teamDetails, setTeamDetails] = useState();
  const [teamGameLog, setTeamGameLog] = useState();
  const [teamRoster, setTeamRoster] = useState();
  const [seasonRankings, setSeasonRankinks] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!TID) {
      dispatch(actions.updateTeamID(1610612761));
      getTeam(1610612761);
    } else {
      getTeam(TID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTeam(TID);
  }, [TID]);

  useEffect(() => {
    if (teamGameLog && teamDetails && teamRoster && seasonRankings) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [teamGameLog, teamDetails, teamRoster, seasonRankings]);

  const getTeam = id => {
    const TID = id;

    teaminfocommon.TeamID = TID;
    commonteamroster.TeamID = TID;
    teamgamelog.TeamID = TID;

    axios
      .post('/teaminfocommon', teaminfocommon)
      // .get(`${API2}/teaminfocommon`)
      .then(res => {
        setTeamDetails(res.data.resultSets[0].rowSet[0]);
        setSeasonRankinks(res.data.resultSets[1].rowSet[0]);
      })
      .catch(err => console.log(err));

    axios
      .post('/commonteamroster', commonteamroster)
      // .get(`${API2}/commonteamroster`)
      .then(res => {
        setTeamRoster([res.data.resultSets[0].rowSet, res.data.resultSets[1].rowSet]);
      })
      .catch(err => console.log(err));

    axios
      .post('/teamgamelog', teamgamelog)
      // .get(`${API2}/teamgamelog`)
      .then(res => {
        setTeamGameLog(res.data.resultSets[0]);
      })
      .catch(err => console.log(err));
  };

  return loaded ? (
    <TeamContext.Provider value={{ teamDetails, teamRoster, teamGameLog, seasonRankings }}>
      <TeamSummary />
    </TeamContext.Provider>
  ) : (
    <Loader />
  );
};

export default TeamProfile;
