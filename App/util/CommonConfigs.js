/**
 * Created by chenxs on 2017/2/13.
 */
import React, {Component} from 'react';
import {
    Platform,
    Dimensions,
} from 'react-native';

const Screen_Width = Dimensions.get('window').width;
const Screen_Height = Dimensions.get('window').height;

const CommonConfigs = {

    CommonColor: 'rgba(0,143,218,1)',

    ScreenWidth: Screen_Width,//屏幕宽
    ScreenHeight: Screen_Height,//屏幕高

    Scale: 0.88,
    ScaleHeight: 1,
    ScaleWidth: 1,
    CardElevation: 5,

    BorderRadius: 5,

    BgColor: '#F1F0F6',
    CardBgColor: 'white',
};

module.exports = CommonConfigs;