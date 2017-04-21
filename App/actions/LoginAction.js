import * as types from './ActionTypes';

export let login = () => (dispatch) => {
    return dispatch({type: types.LOGIN_SUCCESS});
};

export let restLoginData = () => (dispatch) => {
    dispatch({type: types.RESET_LOGIN_STATE});
};