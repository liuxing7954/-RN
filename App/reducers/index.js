/**
 * Created by user on 2016/11/7.
 */
import {combineReducers} from 'redux';

import LoginReducer from './LoginReducer';
import PoetryReducer from './PoetryReducer';
import PoetryDetailReducer from './PoetryDetailReducer';
import ThingReducer from './ThingReducer';
import MathReducer from './MathReducer';
import DiaryReducer from './DiaryReducer';
import DiaryWriteReducer from './DiaryWriteReducer';

export default rootReducer = combineReducers({
    LoginReducer,
    PoetryReducer,
    PoetryDetailReducer,
    ThingReducer,
    MathReducer,
    DiaryReducer,
    DiaryWriteReducer,
})