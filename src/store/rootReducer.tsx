import { combineReducers } from 'redux';
import userItems from './userItems/reducer';

const reducer = combineReducers({
  userItems,
});

export default reducer;
