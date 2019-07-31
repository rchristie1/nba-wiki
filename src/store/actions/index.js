import {getLeaders, getPlayers} from './requests';

//#region Players
const getPlayerAll = (data) => {
  return {
    type: 'GET_ALL_PLAYERS',
    payload: data,
  };
}

export const getAllPlayers = () => {
  return dispatch => {
    getPlayers(dispatch, getPlayerAll);
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
export const updateTeamID = (ID) => {
  const TUID = ID;
  return {
    type: 'GET_TEAM_ID',
    payload: TUID,
  };
};

export const getDefaultTeamID = () => {

  const TUID = 1610612761;
  
  return {
    type: 'GET_TEAM_ID',
    payload: TUID,
  };
};

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

//#endregion

//#region League Leaders 
export const getPoints = (data) => {
  return {
    type: 'GET_POINT_LEADERS',
    payload: data
  }
}
export const getSteals = (data) => {
  return {
    type: 'GET_STEAL_LEADERS',
    payload: data
  }
}
export const getAssists = (data) => {
  return {
    type: 'GET_ASSIST_LEADERS',
    payload: data
  }
}
export const getRebounds = (data) => {
  return {
    type: 'GET_REBOUND_LEADERS',
    payload: data
  }
}
export const getBlocks = (data) => {  
  return {
    type: 'GET_BLOCK_LEADERS',
    payload: data
  }
}

export const getPointLeaders = () => {
  return dispatch => {
    getLeaders(dispatch, getPoints, 'PTS');
  };
}
export const getStealLeaders = () => {
  return dispatch => {
    getLeaders(dispatch, getSteals, 'STL');
  };
}
export const getAssistLeaders = () => {
  return dispatch => {
    getLeaders(dispatch, getAssists, 'AST');
  };
}
export const getReboundLeaders = () => {
  return dispatch => {
    getLeaders(dispatch, getRebounds, 'REB');
  };
}
export const getBlockLeaders = () => {
  return dispatch => {
    getLeaders(dispatch, getBlocks, 'BLK');
  };
}