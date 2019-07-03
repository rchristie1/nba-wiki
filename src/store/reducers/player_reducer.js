export default (state = {}, action) => {
    switch (action.type) {
      case 'GET_ALL_PLAYERS':
        return { ...state, playerList: action.payload };
      case 'GET_ALL_TEAMS':
        return { ...state, teamList: action.payload };
      default:
        return state;
    }
  };
  