import React, { useState, useEffect } from 'react';

import PlayerSummary from '../../components/Players/PlayerSummary';
import PlayerContext from '../../context/PlayerContext';

import {getPlayer} from '../../components/functions/players/getPlayer';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../widgets/loader';
import * as actions from '../../store/actions';

// class PlayerProfile extends Component {
const PlayerProfile = () => {
  const dispatch = useDispatch();
  const PID = useSelector(state => state.players.playerID);

  const [playerData, setPlayerData] = useState();
  const [playerAverages, setPlayerAverages] = useState();
  const [careerStats, setCareerStats] = useState();
  const [totals, setTotals] = useState();
  const [playerImage, setPlayerImage] = useState();
  const [DOB, setDOB] = useState();
  const [stats, setStats] = useState();
  const [totalsLoaded, setTotalsLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState();

  const playerArguments = [setPlayerData, setPlayerAverages, setCareerStats, setTotals, setPlayerImage, dispatch]

  useEffect(() => {
    if (!PID) {
      dispatch(actions.updatePlayerID(2544));
      getPlayer(2544, playerArguments);
    } else {
      getPlayer(PID, playerArguments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(playerImage && totals && playerAverages && playerData && careerStats){
      return setTotalsLoaded(true)
    }
    
    setTotalsLoaded(false);
     
  }, [playerImage, totals, playerData, playerAverages, careerStats]);

  useEffect(() => {
    getPlayer(PID, playerArguments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PID]);

  useEffect(() => {
    if (totalsLoaded) {
      const birthday = new Date(playerData[6]);
      
      setDOB(birthday.toLocaleDateString());
      setStats([[totals[0],[totals[2]]], [totals[1], totals[3]]]);
      setAllLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals, totalsLoaded]);

  return allLoaded ? (
    <PlayerContext.Provider value={{ playerData, playerAverages, playerImage, DOB, stats }}>
      <PlayerSummary />
    </PlayerContext.Provider>
  ) : (
    <Loader />
  );
};

export default PlayerProfile;
