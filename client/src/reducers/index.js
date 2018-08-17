import { combineReducers } from 'redux';
import staffReducer from './staffReducer';

const rootReducer = combineReducers({
  staffData: staffReducer,
});

export default rootReducer;
