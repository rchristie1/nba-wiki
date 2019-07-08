import { combineReducers } from 'redux';
import players from './player_reducer';
import teams from './team_reducer';

const rootReducer = combineReducers({
  players,
  teams
});

export default rootReducer;
