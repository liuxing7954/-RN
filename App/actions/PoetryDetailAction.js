import * as types from './ActionTypes';
import * as Api from './Api';
import Session from '../stores/Session';

export let getComment = (poetryId) => (dispatch) => {
    dispatch({type: types.GETCOMMENT_ING});
    return fetch(Api.GET_COMMENT + poetryId)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.GETCOMMENT_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};

export let praise = (commentId, toogle) => (dispatch) => {
    return fetch(Api.PRAISE_COMMENT + commentId + '/' + toogle)
        .then((response) => response.json())
        .then((responseJson) => {
        })
        .catch((error) => {
            console.warn(error);
        });
};

export let comment = (content, poetryId) => (dispatch) => {
    return fetch(Api.ADD_COMMENT, {
        method: 'POST',
        body: JSON.stringify({
            "userid": Session.getId(),
            "content": content,
            "poetry": poetryId
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // alert(responseJson.message);
        })
        .catch((error) => {
            console.warn(error);
        });
};