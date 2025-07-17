import { combineReducers } from 'redux';
import uploadReducer from '../features/uploads/redux/reducer';

const rootReducer = combineReducers({
  upload: uploadReducer,
});

export default rootReducer;


