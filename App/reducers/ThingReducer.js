/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
    loading: true,
    cate: null,

};
//登录数据对象
let ThingReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GETPICCATE_ING:
            return Object.assign({}, state, {
                type: action.type,
                loading: true,
            });
        case types.GETPICCATE_SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                cate: action.payload,
            });
        default:
            return state;
    }
};

export default ThingReducer;