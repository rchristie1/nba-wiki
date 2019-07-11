import axios from 'axios';
import { API2 } from '../../config';

//#region Players
export const getAllPlayers = () => {
  const request = axios
    .get(`${API2}/commonallplayers`)
    .then(res => res.data.resultSets[0])
    .catch(err => console.log(err));

  return {
    type: 'GET_ALL_PLAYERS',
    payload: request,
  };
};

export const getPlayerID = () => {

  const PUID = 2544; //lbj default
  return {
    type: 'GET_PLAYER_ID',
    payload: PUID,
  };
};

export const updatePlayerID = (ID) => {
  const PUID = ID;
  return {
    type: 'GET_PLAYER_ID',
    payload: PUID,
  };
};
//#endregion

//#region Teams
export const getAllTeams = () => {
  const teams = [
    { teamName: 'Atlanta Hawks', teamID: 1610612737 },
    { teamName: 'Boston Celtics', teamID: 1610612738 },
    { teamName: 'Brooklyn Nets', teamID: 1610612751 },
    { teamName: 'Charlotte Hornets', teamID: 1610612766 },
    { teamName: 'Chicago Bulls', teamID: 1610612741 },
    { teamName: 'Cleveland Cavaliers', teamID: 1610612739 },
    { teamName: 'Dallas Mavericks', teamID: 1610612742 },
    { teamName: 'Denver Nuggets', teamID: 1610612743 },
    { teamName: 'Detroit Pistons', teamID: 1610612765 },
    { teamName: 'Golden State Warriors', teamID: 1610612744 },
    { teamName: 'Houston Rockets', teamID: 1610612745 },
    { teamName: 'Indiana Pacers', teamID: 1610612754 },
    { teamName: 'Los Angeles Clippers', teamID: 1610612746 },
    { teamName: 'Los Angeles Lakers', teamID: 1610612747 },
    { teamName: 'Memphis Grizzlies', teamID: 1610612763 },
    { teamName: 'Miami Heat', teamID: 1610612748 },
    { teamName: 'Milwaukee Bucks', teamID: 1610612749 },
    { teamName: 'Minnesota Timberwolves', teamID: 1610612750 },
    { teamName: 'New Orleans Pelicans', teamID: 1610612740 },
    { teamName: 'New York Knicks', teamID: 1610612752 },
    { teamName: 'Oklahoma City Thunder', teamID: 1610612760 },
    { teamName: 'Orlando Magic', teamID: 1610612753 },
    { teamName: 'Philadelphia 76ers', teamID: 1610612755 },
    { teamName: 'Phoenix Suns', teamID: 1610612756 },
    { teamName: 'Portland Trail Blazers', teamID: 1610612757 },
    { teamName: 'Sacramento Kings', teamID: 1610612758 },
    { teamName: 'San Antonio Spurs', teamID: 1610612759 },
    { teamName: 'Toronto Raptors', teamID: 1610612761 },
    { teamName: 'Utah Jazz', teamID: 1610612762 },
    { teamName: 'Washington Wizards', teamID: 1610612764 },
  ];  

  return {
      type: 'GET_ALL_TEAMS',
      payload: teams,
  };
};

export const getTeamID = () => {

  const TUID = 1610612761;
  
  return {
    type: 'GET_TEAM_ID',
    payload: TUID,
  };
};
//#endregion