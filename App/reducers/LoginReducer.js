/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
};
//登录数据对象
let LoginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN_SUCCESS:
            let obj = Object.assign({}, state, {
                type: action.type,
            });
            // console.log(obj);
            return obj;
        case types.RESET_LOGIN_STATE:
            return initialState;
        default:
            return state
    }
};

export default LoginReducer;