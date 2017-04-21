'use strict';

import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Alert,
    Platform, TouchableOpacity,
    DeviceEventEmitter, RefreshControl, ListView,
} from "react-native";

import {connect} from 'react-redux';
import NavigatorBar from '../../components/NavigatorBar';           //导航栏
import * as action from '../../actions/DiaryAction';
import * as Types from '../../actions/ActionTypes';
import Session from '../../stores/Session';
import DiaryWrite from './DiaryWrite';
/**
 * 我的 页面
 */
class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }

    componentWillMount() {
        //这里进行第一次获取数据
        this._refreshData();
    }

    _openPage = (target) => {
        const {navigator} = this.props;
        navigator.push({
            name: 'page',
            component: target,
            params: {
                _onBack: () => this._refreshData(),
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        const {type, diaries,} = nextProps;
        //第一次获取或者刷新
        if (type == Types.GETLOG_SUCCESS) {
            this.setState({
                diaries: diaries,
            });
        }
    }

    _renderRow = (rowData, sectionID, rowID) => {
        // console.log(thisd.props);
        let content = rowData.content.substring(0, 50) + '...';
        return (
            <View style={Styles.item}>
                <Text style={Styles.title}>{rowData.title}</Text>
                <Text>{rowData.dateTime}</Text>
                <Text
                    style={Styles.content}>{content}</Text>
                {/*分割线*/}
                <View style={{flexDirection:'row'}}>
                    <View style={{height:0.8,flex: 1, backgroundColor:'#ddd',marginTop:10,marginBottom: 10,}}/>
                </View>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{alert('查看全部')}}>
                    <View
                        style={{flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text>查看全部</Text>
                        <Image style={{height:20,width:20}}
                               source={require('../../../icon/arrow_form-right.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _refreshData = () => {
        this.props.dispatch(action.getData(Session.getId()));
    };

    render() {
        return (
            <View style={Styles.container}>
                <NavigatorBar title={'日志'} leftImageUrl={require('../../../icon/come_back.png')}
                              leftFunc={()=>{this.props.navigator.pop()}}
                              rightImageUrl={require('../../../icon/添加.png')}
                              rightFunc={()=>{this._openPage(DiaryWrite)}}/>
                <ListView
                    style={{marginBottom: 5,}}
                    dataSource={this.dataSource.cloneWithRows(this.state.diaries)}
                    renderRow={this._renderRow}
                    initialListSize={10}
                    enableEmptySections={true}
                    refreshControl={
                            <RefreshControl
                            refreshing = {this.props.refreshing}
                            enabled = {true}
                            onRefresh = {this._refreshData}
                            colors = {['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor = "#ffffff"
                            />
                        }
                />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f3f3",
        flex: 1,
    },
    item: {
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 16,
        borderWidth: 0.8,
        borderColor: '#ddd',
        margin: 16,
        borderRadius: 6,
    },
    title: {
        color: '#333'
    },
    content: {
        color: '#333',
    },
});


//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.DiaryReducer,
    };
}

export default connect(mapStateToProps)(Diary);

