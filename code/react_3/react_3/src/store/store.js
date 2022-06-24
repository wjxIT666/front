import { createStore } from 'redux';

import { getToken } from './reducer.js';

export default createStore(getToken);