import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AppConstants from '../constants/AppConstants';
import _isEmpty from 'lodash/isEmpty';

export default combineReducers({
    items,
    statusApp,
    routing: routerReducer,
    currentItem
});

function statusApp(state = {hasErrored: false, isLoading: false, isModalShow: false}, action) {
    switch (action.type) {
        case AppConstants.ITEMS_HAS_ERRORED:
            return Object.assign({}, state, {
                hasErrored: action.hasErrored
            });
        case AppConstants.ITEMS_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
        case AppConstants.MODAL_IS_SHOW:
            return Object.assign({}, state, {
                isModalShow: action.isModalShow
            });

        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case AppConstants.ITEMS_FETCH_DATA_SUCCESS:
            return action.items;
        case AppConstants.ITEM_DELETE:
            return state.filter(item => item.sha1 !== action.hash);

        default:
            return state;
    }
}
function currentItem(state = {}, action) {
    switch (action.type) {
        case AppConstants.ITEM_SET:
            return _isEmpty(action.currentItem) ? {} : action.currentItem[0];

        default:
            return state;
    }
}