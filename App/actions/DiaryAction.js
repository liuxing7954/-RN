import * as types from './ActionTypes';
import * as Api from './Api';
import Session from '../stores/Session';

export let getData = (userId) => (dispatch) => {
    dispatch({type: types.GETLOG_ING});
    return fetch(Api.GET_LOGS + userId)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type: types.GETLOG_SUCCESS, payload: responseJson.data});
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};
export let getDiaryToday = (s1, s2, s3) => (dispatch) => {
    dispatch({type: types.GETDIARY_ING});
    return fetch(Api.GET_DIARY + 'sw=' + s1 + '&kt=' + s2 + '&ss=' + s3)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.code == 202) {
                dispatch({type: types.GETDIARY_FAIL});
            }
            else {
                dispatch({type: types.GETDIARY_SUCCESS, payload: responseJson.date});
            }
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
};

export let putDiary = (content, datetime, title) => (dispatch) => {
    let str = JSON.stringify({
        "userid": Session.getId(),
        "content": content,
        "datetime": datetime,
        "title": title,
    });
    // console.log(str);
    return fetch(Api.ADD_DIARY, {
        method: 'POST',
        body: str
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // alert(responseJson.message);
        })
        .catch((error) => {
            console.warn(error);
        });
};