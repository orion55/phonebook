import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';
import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

export default history;
