/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
    loading: true,
    refreshing: false,
    poetries: null,

};
//登录数据对象
let PoetryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GETPOETRY_ING:
            return Object.assign({}, state, {
                type: action.type,
                loading: true,
            });
        case types.GETPOETRY_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                refreshing: false,
                poetries: action.payload,
            });
        case types.GETPOETRY_REFRESH_ING:
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                refreshing: true,
            });
        case types.GETPOETRY_REFRESH_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                refreshing: false,
                poetries: action.payload,
            });
        case types.ADDDATA_ING:
            return Object.assign({}, state, {
                type: action.type,
                loading: true,
            });
        case types.ADDDATA_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                refreshing: false,
                poetries: action.payload,
            });
        default:
            return state;
    }
};

export default PoetryReducer;