import { combineReducers } from 'redux';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';

import tickets from './tickets';

export default combineReducers({
  auth,
  counter,
  form,
  info,
  widgets,
  tickets
});
