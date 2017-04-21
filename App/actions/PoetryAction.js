import * as types from './ActionTypes';
import * as Api from './Api';

export let getData = () => (dispatch) => {
    dispatch({type: types.GETPOETRY_ING});
    return fetch(Api.GET_POETRIES)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.GETPOETRY_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};

export let refreshData = () => (dispatch) => {
    dispatch({type: types.GETPOETRY_REFRESH_ING});
    return fetch(Api.GET_POETRIES)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.GETPOETRY_REFRESH_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};

export let addData = () => (dispatch) => {
    dispatch({type: types.ADDDATA_ING});
    return fetch(Api.GET_POETRIES)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.ADDDATA_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};