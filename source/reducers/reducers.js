import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AppConstants from '../constants/AppConstants';

export default combineReducers({
    items,
    statusApp,
    routing: routerReducer
});

function statusApp(state = {hasErrored: false, isLoading: false}, action) {
    switch (action.type) {
        case AppConstants.ITEMS_HAS_ERRORED:
            return Object.assign({}, state, {
                hasErrored: action.hasErrored
            });
        case AppConstants.ITEMS_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
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
