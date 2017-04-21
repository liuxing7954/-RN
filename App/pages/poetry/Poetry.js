import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image, Platform, BackAndroid,
    Navigator, ListView, ActivityIndicator, Dimensions, RefreshControl, TouchableOpacity
} from 'react-native';
import * as Param from '../../util/scale';
import NavigatorBar from '../../components/NavigatorBar';
import {connect} from 'react-redux';
import CommonConfigs from '../../util/CommonConfigs';
import Loading from '../../components/FullScreenLoading';
import * as action from '../../actions/PoetryAction';
import * as Types from '../../actions/ActionTypes';
import PoetryDetail from './PoetryDetail';

const width = CommonConfigs.ScreenWidth;
const height = CommonConfigs.ScreenHeight;
const itemHeight = height / 3 * CommonConfigs.Scale;

class Poetry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataArr: [1, 2, 3, 4],
            animating: true,
            refreshing: false,
            loading: false,
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.putBackTime = -1;
    }

    componentWillMount() {
        //这里进行第一次获取数据
        this.props.dispatch(action.getData());
    }

    componentWillReceiveProps(nextProps) {
        const {type, poetries,} = nextProps;
        //第一次获取或者刷新
        if (type == Types.GETPOETRY_SUCCESS || type == Types.GETPOETRY_REFRESH_SUCCESS) {
            this.setState({
                dataArr: poetries,
            });
        }
        //追加数据
        if (type == Types.ADDDATA_SUCCESS) {
            this.setState({
                dataArr: [...this.state.dataArr, ...poetries],
            });
        }
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableOpacity style={styles.item_container} onPress={()=>this._showDetail(rowData)}>
                {/*背景介绍大图*/}
                <View style={{flexDirection: 'row',flex: 1, }}>
                    <Image source={{uri: rowData.intrImgUrl}} style={styles.image_back}/>
                </View>
                {/*作者头像*/}
                <Image source={{uri: rowData.iconUrl}} style={styles.image_icon}/>
                {/*标题和作者*/}
                <View style={styles.item_container3}>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <Text style={styles.author}>{rowData.author}</Text>
                </View>
                <View style={styles.line}/>
                {/*评论等数量显示*/}
                <View style={styles.item_container2}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../../icon/踩.png')}
                               style={styles.image_icon_small}/>
                        <Text>{rowData.cai}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../../icon/赞.png')}
                               style={styles.image_icon_small}/>
                        <Text>{rowData.zan}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../../icon/评论.png')}
                               style={styles.image_icon_small}/>
                        <Text>{rowData.pl}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    _renderFootRow = () => {
        return (
            <TouchableOpacity style={styles.container} onPress={this._addData}>
                <Text style={{margin: 10,}}>点击加载更多</Text>
            </TouchableOpacity>
        );
    };

    _addData = () => {
        this.props.dispatch(action.addData());
    };

    _refreshData = () => {
        this.props.dispatch(action.refreshData());
    };

    _showDetail = (data) => {
        this.props.navigator.push({
            component: PoetryDetail,
            name: 'PoetryDetail',
            params: {
                title: '标题',
                data: data,
            }
        })
    };


    render() {
        let ctx = (
            <View style={{flex:1,backgroundColor: CommonConfigs.bgColor,}}>
                <NavigatorBar title="诗歌欣赏"/>
                <View style={{flex:1,}}>
                    <ListView
                        style={{marginBottom: 5,}}
                        dataSource={this.dataSource.cloneWithRows(this.state.dataArr)}
                        renderRow={this._renderRow}
                        initialListSize={10}
                        enableEmptySections={true}
                        renderFooter={this._renderFootRow}
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

            </View>
        );
        return (
            <View style={{flex:1,backgroundColor: "#F1F0F6",}}>
                {
                    this.props.loading ? <Loading text="请稍候..."/> : ctx
                }
            </View>
        );
    }
}

const iconWidth = 80 * CommonConfigs.Scale;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonConfigs.bgColor,
        alignItems: "center"
    },
    item_container: {
        backgroundColor: 'white',
        elevation: Param.CardElevation,
        borderRadius: CommonConfigs.BorderRadius,
        margin: 10 * CommonConfigs.Scale,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    item_container2: {
        width: (width - 10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10 * CommonConfigs.Scale,
    },
    item_container3: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image_back: {
        flex: 1,
        borderRadius: CommonConfigs.BorderRadius,
        height: itemHeight / 2 * CommonConfigs.Scale,
        resizeMode: 'cover',
    },
    image_icon: {
        height: iconWidth,
        width: iconWidth,
        borderRadius: iconWidth / 2,
        marginTop: -iconWidth / 2,
    },
    image_icon_card: {
        height: iconWidth,
        width: iconWidth,
        borderRadius: iconWidth / 2,
        marginTop: -iconWidth / 2,
        elevation: CommonConfigs.CardElevation,
    },
    image_icon_small: {
        width: 12 * CommonConfigs.Scale,
        height: 12 * CommonConfigs.Scale,
        resizeMode: 'contain',
        marginRight: 5
    },
    line: {
        width: width - 30,
        backgroundColor: '#eee',
        height: 1,
        margin: 10 * CommonConfigs.Scale,
    },
    title: {fontSize: 20 * CommonConfigs.Scale, color: '#333'},
    author: {fontSize: 14 * CommonConfigs.Scale},

});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.PoetryReducer,
    };
}

export default connect(mapStateToProps)(Poetry);

