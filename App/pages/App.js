/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// npm install

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,   // 判断当前运行的系统
    Navigator
} from 'react-native';
import Login from './login/Login';
import Main from './main/Main';

export default class App extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Navigator
                initialRoute={{name:"Login",component:Login}}
                configureScene={()=>{
                             return Navigator.SceneConfigs.PushFromRight;
                        }}
                renderScene={(route,navigator)=>{
                           let Component = route.component;
                           return <Component {...route.params} {...this.props} navigator={navigator}/>;
                        }}
            />
        );
    }


};




