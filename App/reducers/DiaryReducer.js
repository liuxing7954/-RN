/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
    loading: true,
    refreshing: false,
    diaries: null,
    mb: ''
};
//登录数据对象
let DiaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GETLOG_ING:
            return Object.assign({}, state, {
                type: action.type,
                loading: true,
            });
        case types.GETLOG_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                refreshing: false,
                diaries: action.payload,
            });
        default:
            return state;
    }
};

export default DiaryReducer;