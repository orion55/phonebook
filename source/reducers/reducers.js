import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AppConstants from '../constants/AppConstants';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    // statusApp,
    routing: routerReducer
});

const initialState = {
    hasErrored: false,
    isLoading: false
};

function statusApp(state = initialState, action) {
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

function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case AppConstants.ITEMS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case AppConstants.ITEMS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case AppConstants.ITEMS_FETCH_DATA_SUCCESS:
            return action.items;

        default:
            return state;
    }
}
