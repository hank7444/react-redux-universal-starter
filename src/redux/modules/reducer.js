import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import tickets from './tickets';

export default combineReducers({
  router: routerStateReducer,
  auth,
  counter,
  form,
  info,
  widgets,
  tickets
});
