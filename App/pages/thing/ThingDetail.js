import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Platform, BackAndroid,
    View,
    Image,
    Navigator, ListView, ActivityIndicator, Dimensions, RefreshControl, TouchableOpacity, ScrollView, TextInput
} from 'react-native';
import {connect} from 'react-redux';
import CommonConfigs from '../../util/CommonConfigs';
import NavigatorBar from '../../components/NavigatorBar';
import * as Types from '../../actions/ActionTypes';
import Session from '../../stores/Session';

class ThingDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            text: '',
            showResult: false,
            count: 0,
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }

    componentWillMount() {
        const {data} = this.props;
        //这里进行第一次获取数据
        // this.props.dispatch(action.getComment(data.id));

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const {type, comments,} = nextProps;
        if (type == Types.GETCOMMENT_SUCCESS) {
            this.setState({
                dataArr: comments,
            });
        }
    }


    _comment = () => {
        this.state.dataArr.push({
            //todo::要获取
            nickname: '帅哥季',
            time: '2月3号',
            comment: this.state.text,
        });
        // console.log(this.state.dataArr)
        this.setState({
            dataArr: this.state.dataArr,
            text: ''
        });
    };

    _pass = () => {
        if (this.state.count < 100) {
            this.setState({count: this.state.count + 10});
            Session.upthing();
        } else {
            alert('今日任务已完成');
        }
    };

    render() {
        const {
            data,
            loading,
        } = this.props;
        return (
            <View style={[styles.container]}>
                <NavigatorBar title='观察' leftImageUrl={require('../../../icon/come_back.png')}
                              leftFunc={()=>{this.props.navigator.pop()}}
                              rightImageUrl={require('../../../icon/zhuanfa.png')} rightFunc={()=>{}}/>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.card}>
                        {/*当前进度*/}
                        <Text style={styles.content}>当前进度 <Text style={{color: 'red'}}>{this.state.count}%</Text></Text>
                        {/*图片展示*/}
                        <TouchableOpacity onPress={()=>{this.setState({showResult:!this.state.showResult});}}
                                          style={[styles.card,{flex: 1,width: CommonConfigs.ScreenWidth * CommonConfigs.Scale * 2/ 3,}]}>
                            <Image source={{uri:this.props.img}}
                                   style={styles.image_ctx}/>
                        </TouchableOpacity>
                        {
                            //查看答案
                            !this.state.showResult ? null :
                                <View
                                    style={[styles.card,{padding:50,flexDirection: 'row',backgroundColor: 'white',justifyContent:'center'}]}>
                                    <Text>{this.props.mz}</Text>
                                </View>
                        }
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity
                            style={[styles.card,{alignItems: 'center',justifyContent:'center',flex:1}]}>
                            <Image source={require('../../../icon/wrong.png')}
                                   style={{width:50,height:50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.card,{alignItems: 'center',justifyContent:'center',flex:1}]}
                            onPress={this._pass}>
                            <Image source={require('../../../icon/yes.png')}
                                   style={{width:50,height:50}}/>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/*评论输入框*/}
                <View
                    style={{margin:0,flexDirection: 'row',width:CommonConfigs.ScreenWidth,height:60* CommonConfigs.Scale,backgroundColor:CommonConfigs.bgColor,alignItems: 'center'}}>
                    <TextInput style={{flex: 1}} onChangeText={(text) => this.setState({text})}
                               value={this.state.text}/>
                    <TouchableOpacity onPress={()=>{this._comment()}}>
                        <Image source={require('../../../icon/commit.png')}
                               style={{width: 40,height:40,marginRight: 10,}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonConfigs.bgColor,
    },
    card: {
        backgroundColor: 'white',
        margin: 10 * CommonConfigs.Scale,
        elevation: CommonConfigs.CardElevation,
        paddingTop: 10 * CommonConfigs.Scale,
        paddingBottom: 18 * CommonConfigs.Scale,
        alignItems: 'center',
        justifyContent: 'center',
        // width: CommonConfigs.ScreenWidth * CommonConfigs.Scale / 2,
    },
    content: {
        color: '#333',
        fontSize: 20 * CommonConfigs.Scale,
        // marginTop: 15 * CommonConfigs.Scale,
        alignSelf: 'flex-start',
        padding: 10,
    },
    image_ctx: {
        width: CommonConfigs.ScreenWidth * CommonConfigs.Scale * 2 / 3,
        height: CommonConfigs.ScreenWidth * CommonConfigs.Scale * 2 / 3,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    scrollview: {
        flex: 1,
        width: CommonConfigs.ScreenWidth
    },

});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.ThingDetailReducer,
    };
}

export default connect(mapStateToProps)(ThingDetail);

