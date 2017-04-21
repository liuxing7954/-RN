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
import * as Types from '../../actions/ActionTypes';
import * as action from '../../actions/ThingAction';
import ThingDetail from './ThingDetail';
import Loading from '../../components/FullScreenLoading';

const width = CommonConfigs.ScreenWidth;
const height = CommonConfigs.ScreenHeight;
const itemHeight = height / 3 * CommonConfigs.Scale / 2;

class Thing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cate: [],
            loading: true,
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }

    componentWillMount() {
        //这里进行第一次获取数据
        this.props.dispatch(action.getData(1));
    }

    componentWillReceiveProps(nextProps) {
        const {type, cate, loading} = nextProps;

        if (type == Types.GETPICCATE_SUCCESS) {
            this.setState({
                cate: cate,
                loading: loading,
            });
        }
    }

    _showDetail = (data) => {
        this.props.navigator.push({
            component: ThingDetail,
            name: 'ThingDetail',
            params: {
                // cateId: data,
                img: data.btnImgUrl,
                mz: '答案',
            }
        })
    };

    _renderRow = (rowData, sectionID, rowID) => {
        // console.log(rowData);
        let img = rowData.btnImgUrl == null ? require('../../../images/backgroud.png') : {uri: rowData.btnImgUrl};
        return (
            <TouchableOpacity style={styles.container} onPress={()=>this._showDetail(rowData)}>
                {/*一个分类Card*/}
                <View style={styles.card}>
                    <View style={{flexDirection: 'row',flex: 1, }}>
                        <Image source={img} style={styles.image_back}>
                            <View style={styles.circle}>
                                <Text>{rowData.mz}</Text>
                            </View>
                        </Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        let ctx = (
            <View style={{flex:1,backgroundColor: "#F1F0F6",}}>
                <View style={styles.container}>
                    <NavigatorBar title='观察'/>

                    <View style={{flex:1,}}>
                        <ListView
                            style={{marginBottom: 5,}}
                            dataSource={this.dataSource.cloneWithRows(this.state.cate)}
                            renderRow={this._renderRow}
                            initialListSize={10}
                            enableEmptySections={true}
                        />
                    </View>
                </View>
            </View>
        );
        return (
            <View style={{flex:1,backgroundColor: "#F1F0F6",}}>
                {
                    this.state.loading ? <Loading text="请稍候..."/> : ctx
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: CommonConfigs.bgColor,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 20 * CommonConfigs.Scale,
        elevation: CommonConfigs.CardElevation,
        height: itemHeight,
        width: width - 10 * CommonConfigs.Scale - 20 * CommonConfigs.Scale,
        borderRadius: CommonConfigs.BorderRadius,
    },
    image_back: {
        flex: 1,
        borderRadius: CommonConfigs.BorderRadius,
        height: itemHeight,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: itemHeight / 2,
        height: itemHeight / 2,
        borderRadius: itemHeight / 2 / 2,
        backgroundColor: '#F7EDE4',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: CommonConfigs.CardElevation,
    },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.ThingReducer,
    };
}

export default connect(mapStateToProps)(Thing);

