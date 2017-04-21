import * as types from './ActionTypes';
import * as Api from './Api';

export let getData = (CATEID) => (dispatch) => {
    dispatch({type: types.GETPICCATE_ING});
    return fetch(Api.GET_CATE+CATEID)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.GETPICCATE_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};