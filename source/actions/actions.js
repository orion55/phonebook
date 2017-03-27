import AppConstants from '../constants/AppConstants';
import axios from 'axios';

const userUrl = 'https://randomuser.me/api/?nat=us';
const userUrlResult = 'https://randomuser.me/api/?nat=us&results=';

export function itemsHasErrored(bool) {
    return {
        type: AppConstants.ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: AppConstants.ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: AppConstants.ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchAll() {
    return (dispatch) => {
        const maxItems = 10;
        let arrayQuery = [];

        dispatch(itemsIsLoading(true));

        for (let i = 0; i < maxItems; i++) {
            arrayQuery.push(axios.get(userUrl));
        }

        axios.all(arrayQuery)
            .then(axios.spread(function (...param) {
                let items = [];

                const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

                for (let i = 0; i < maxItems; i++) {
                    let {
                        name: {first: first, last: last},
                        login: {sha1: sha1},
                        phone,
                        cell,
                        email,
                        picture:{large: pictureLarge, thumbnail: pictureThumb},
                        dob
                    } = param[i].data.results[0];

                    let fullName = capitalizeFirstLetter(last) + ' ' + capitalizeFirstLetter(first);
                    items.push({sha1, fullName, pictureThumb, pictureLarge, phone, cell, email, dob});
                }

                items.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);

                dispatch(itemsIsLoading(false));
                dispatch(itemsFetchDataSuccess(items));
            }))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchAllv2() {
    return (dispatch) => {
        const maxItems = 10;

        dispatch(itemsIsLoading(true));

        axios.get(userUrlResult + maxItems)
            .then((response) => {
                let items = [];

                const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

                for (let i = 0; i < maxItems; i++) {
                    let {
                        name: {first: first, last: last},
                        login: {sha1: sha1},
                        phone,
                        cell,
                        email,
                        picture:{large: pictureLarge, thumbnail: pictureThumb}
                    } = response.data.results[i];

                    let fullName = capitalizeFirstLetter(last) + ' ' + capitalizeFirstLetter(first);
                    items.push({sha1, fullName, pictureThumb, pictureLarge, phone, cell, email});
                }

                items.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);


                dispatch(itemsIsLoading(false));
                dispatch(itemsFetchDataSuccess(items));
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemDelete(hash) {
    return {
        type: AppConstants.ITEM_DELETE,
        hash
    };
}

export function itemCurrentSet(currentItem) {
    return {
        type: AppConstants.ITEM_SET,
        currentItem
    };
}

export function itemSet(hash) {
    return (dispatch, getState) => {
        const {items} =getState();
        dispatch(itemCurrentSet(items.filter(item => item.sha1 === hash)));
    }
}

export function modalIsLoading(bool) {
    return {
        type: AppConstants.MODAL_IS_SHOW,
        isModalShow: bool
    };
}

export function itemUpdate(item) {
    return {
        type: AppConstants.ITEM_UPDATE,
        item
    };
}

export function itemInsert(item) {
    return {
        type: AppConstants.ITEM_INSERT,
        item
    };
}

export function dataFetchV2() {
    return (dispatch) => {

        dispatch(dataHasErrored(false));
        dispatch(dataIsLoading(true));

        axios.get(userUrl)
            .then((response) => {
                const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
                let {
                    name: {first: first, last: last},
                    login: {sha1: sha1},
                    phone,
                    cell,
                    email,
                    picture:{large: pictureLarge, thumbnail: pictureThumb}
                } = response.data.results[0];

                let fullName = capitalizeFirstLetter(last) + ' ' + capitalizeFirstLetter(first);

                dispatch(dataIsLoading(false));

                let item = {sha1, fullName, pictureThumb, pictureLarge, phone, cell, email};
                dispatch(dataFetchSuccess(item));
            })
            .catch(() => dispatch(dataHasErrored(true)));
    };
}

export function dataHasErrored(bool) {
    return {
        type: AppConstants.DATA_HAS_ERRORED,
        hasDataErrored: bool
    };
}

export function dataIsLoading(bool) {
    return {
        type: AppConstants.DATA_IS_LOADING,
        isDataLoading: bool
    };
}

export function dataFetchSuccess(item) {
    return {
        type: AppConstants.DATA_FETCH_SUCCESS,
        item: item
    };
}