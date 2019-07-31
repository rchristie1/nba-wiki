const applicationState = {
  pointLeaders: '',
  reboundLeaders: '',
  assistLeaders: '',
  stealLeaders: '',
  blockLeaders: '',
  fgpctLeaders: '',
  made3ptLeaders: '',
  pct3Leaders: '',
};

export default (state = applicationState, action) => {
  switch (action.type) {
    case 'GET_POINT_LEADERS':
      return { ...state, pointLeaders: action.payload };
    case 'GET_REBOUND_LEADERS':
      return { ...state, reboundLeaders: action.payload };
    case 'GET_ASSIST_LEADERS':
      return { ...state, assistLeaders: action.payload };
    case 'GET_STEAL_LEADERS':
      return { ...state, stealLeaders: action.payload };
    case 'GET_BLOCK_LEADERS':
      return { ...state, blockLeaders: action.payload };
    case 'GET_FGPCT_LEADERS':
      return { ...state, fgpctLeaders: action.payload };
    case 'GET_MADE3PT_LEADERS':
      return { ...state, made3ptLeaders: action.payload };
    case 'GET_PCT3PT_LEADERS':
      return { ...state, pct3Leaders: action.payload };
    default:
      return state;
  }
};
