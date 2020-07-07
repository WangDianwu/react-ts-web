import { configuration } from './models/core';
import global from './models/global';
import auth from './models/auth';

function createStore(initialState = {}) {
  return configuration([global, auth], initialState);
}
const store = createStore();

export default store;
