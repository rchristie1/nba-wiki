import { combineReducers } from 'redux';
import players from './player_reducer';
import teams from './team_reducer';
import leaders from './leaders_reducer';

const rootReducer = combineReducers({
  players,
  teams,
  leaders,
});

export default rootReducer;
