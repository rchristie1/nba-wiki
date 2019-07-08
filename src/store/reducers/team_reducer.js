export default (state = {}, action) => {
    switch (action.type) {
      case 'GET_ALL_TEAMS':
        return { ...state, teamList: action.payload };
      case 'GET_TEAM_ID':
        return { ...state, teamID: action.payload };
      case 'UPDATE_TEAM_ID':
        return { ...state, teamID: action.payload };
      default:
        return state;
    }
  };
  