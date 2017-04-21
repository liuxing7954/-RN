'use strict';

import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Alert,
    Platform,
    DeviceEventEmitter,
} from "react-native";
import Line from './Line';
import LineShort from './LineShort';
import MineItem from '../../components/MineItem';                   //内容组件
import NavigatorBar from '../../components/NavigatorBar';           //导航栏
import TopBar from './TopBar';
import Diary from './Diary';
import Session from '../../stores/Session';
/**
 * 我的 页面
 */
const scall = 2.5;
export default class Personal extends React.Component {
    constructor(props) {
        super(props);
    }

    _openPage = (target) => {
        const {navigator} = this.props;
        navigator.push({
            name: 'page',
            component: target,
        });
    };

    componentWillReceiveProps() {
    }

    render() {
        return (
            <View style={Styles.container}>
                <NavigatorBar title="我的"/>
                <TopBar/>
                <ScrollView>
                    <MineItem
                        title={Session.getUsername()}
                        subTitle="个人信息、头像"
                        rightType="1"
                        onClick={() => {}}
                        clickAble={true}
                    />
                    <Line/>
                    <MineItem
                        title={'日志'}
                        headImgUrl={require('../../../icon/log.png')}
                        rightType="1"
                        onClick={() => {this._openPage(Diary)}}
                        clickAble={true}
                    />
                    <LineShort/>
                    <MineItem
                        title={'退出'}
                        headImgUrl={require('../../../icon/off.png')}
                        rightType="1"
                        onClick={() => {}}
                        clickAble={true}
                    />
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1F0F6",
        flex: 1,
    },
    item: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 150 / scall,
        padding: 50 / scall,
        elevation: 1,
    },
    text: {
        color: "#F00",
        fontSize: 50 / scall,
    },
    leftText: {
        marginRight: 50 / scall / 2,
        resizeMode: "contain",
        color: "#000",
        fontSize: 40 / scall,
    },
    personItem: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 150 / scall,
        padding: 50 / scall,
    },
});

