const applicationState = {
  TeamID: '',
};

export default (state = applicationState, action) => {
    switch (action.type) {
      case 'GET_ALL_TEAMS':
        return { ...state, teamList: action.payload };
      case 'GET_TEAM_ID':
        return { ...state, teamID: action.payload };
      case 'ALL_TEAM_LOOKUP':
        return { ...state, allTeams: action.payload };
      default:
        return state;
    }
  };
  