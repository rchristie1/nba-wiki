import { combineReducers } from 'redux';
import players from './player_reducer';


const rootReducer = combineReducers({
  players,
});

export default rootReducer;
