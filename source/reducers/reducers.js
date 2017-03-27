import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AppConstants from '../constants/AppConstants';
import _isEmpty from 'lodash/isEmpty';
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    items,
    statusApp,
    routing: routerReducer,
    currentItem,
    form: formReducer
});

function statusApp(state = {
    hasErrored: false,
    isLoading: false,
    isModalShow: false,
    isDataLoading: false,
    hasDataErrored: false
}, action) {
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
        case AppConstants.DATA_IS_LOADING:
            return Object.assign({}, state, {
                isDataLoading: action.isDataLoading
            });
        case AppConstants.DATA_HAS_ERRORED:
            return Object.assign({}, state, {
                hasDataErrored: action.hasDataErrored
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
        case AppConstants.ITEM_UPDATE:
            return state.map(item => {
                if (item.sha1 === action.item.sha1) {
                    item = action.item;
                }
                return item;
            });
        case AppConstants.ITEM_INSERT:
            let newState = [...state, action.item];
            newState.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);
            return newState;
        default:
            return state;
    }
}
function currentItem(state = {}, action) {
    switch (action.type) {
        case AppConstants.DATA_FETCH_SUCCESS:
            return action.item;
        case AppConstants.ITEM_SET:
            return _isEmpty(action.currentItem) ? {} : action.currentItem[0];

        default:
            return state;
    }
}