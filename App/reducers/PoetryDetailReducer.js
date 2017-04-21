/**
 * Created by user on 2017/1/9.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    type: '',
    loading: true,
    comments: null,

};
//登录数据对象
let PoetryDetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GETCOMMENT_ING:
            // console.log('GETCOMMENT_ING');
            return Object.assign({}, state, {
                type: action.type,
                loading: true,
            });
        case types.GETCOMMENT_SUCCESS:
            // console.log('GETCOMMENT_SUCCESS');
            return Object.assign({}, state, {
                type: action.type,
                loading: false,
                comments: action.payload,
            });
        default:
            return state;
    }
};

export default PoetryDetailReducer;