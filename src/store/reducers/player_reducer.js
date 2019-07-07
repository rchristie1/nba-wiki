const applicationState = {
  playerID: '',
};

export default (state = applicationState, action) => {
  switch (action.type) {
    case 'GET_ALL_PLAYERS':
      return { ...state, playerList: action.payload };
    case 'GET_PLAYER_ID':
      return { ...state, playerID: action.payload };
    case 'UPDATE_PLAYER_ID':
      return { ...state, playerID: action.payload };
    default:
      return state;
  }
};
