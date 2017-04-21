/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
    mb: ''
};
//登录数据对象
let DiaryWriteReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GETDIARY_ING:
            return Object.assign({}, state, {
                type: action.type,
            });
        case types.GETDIARY_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                mb: action.payload,
            });
        case types.GETDIARY_FAIL:
            return Object.assign({}, state, {
                type: action.type,
            });
        default:
            return state;
    }
};

export default DiaryWriteReducer;