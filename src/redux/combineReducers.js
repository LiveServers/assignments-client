import {combineReducers} from 'redux';
import testReducer from './reducers/testReducer';
import backdropReducer from "./reducers/backdropReducer";
import responseStateReducer from "./reducers/responseStateReducer";
import setTokenReducer from "./reducers/setToken";
import chatgptReducer from "./reducers/chatgptReducer";

const combinedReducers = combineReducers({
  testReducer,
  backdropReducer,
  responseStateReducer,
  setTokenReducer,
  chatgptReducer
});

export default combinedReducers;