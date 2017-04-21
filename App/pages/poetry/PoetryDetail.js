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
import * as action from '../../actions/PoetryDetailAction';
import Session from '../../stores/Session';
class PoetryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            text: '',
        };
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }

    componentWillMount() {
        Session.uppoetry();
        const {data} = this.props;
        //这里进行第一次获取数据
        this.props.dispatch(action.getComment(data.id));
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        const {type, comments,} = nextProps;
        if (type == Types.GETCOMMENT_SUCCESS) {
            // 添加一个自己用的字段isPraise
            for (let ee of comments) {
                ee.isPraise = false;
            }
            this.setState({
                dataArr: comments,
            });
        }
    }


    _praise = (id, commentId, toogle) => {
        this.state.dataArr[id].isPraise = !this.state.dataArr[id].isPraise;
        if (toogle) {
            this.state.dataArr[id].praise = parseInt(this.state.dataArr[id].praise) + 1;
        } else {
            this.state.dataArr[id].praise = parseInt(this.state.dataArr[id].praise) - 1;
        }
        this.props.dispatch(action.praise(commentId, toogle));
        this.setState(
            {dataArr: this.state.dataArr}
        );

    };

    _renderRow = (rowData, sectionID, rowID) => {
        let praiseImg = rowData.isPraise ? require('../../../icon/praise_press.png') : require('../../../icon/praise.png');

        return (
            <View style={styles.item_container}>
                <View
                    style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'flex-start',marginBottom: 10,paddingLeft: 5,}}>
                    {/*左侧内容*/}
                    <View style={{alignItems: 'flex-start',justifyContent: 'flex-start',width: 40,height:40,}}>
                        <Image source={{uri:rowData.user.headprot}}
                               style={{width: 40,height:40,borderRadius:20}}/>
                    </View>
                    {/*右侧内容*/}
                    <View
                        style={{flex: 1, alignItems: 'flex-start',justifyContent: 'space-around', marginLeft: 10, borderBottomColor:'#ccc',borderBottomWidth:0.5,}}>
                        {/*名字和时间和图标*/}
                        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flex:1, justifyContent: 'flex-start',alignItems: 'flex-start'}}>
                                <Text style={{color: '#333'}}>{rowData.user.username}</Text>
                                <Text>{rowData.datatime}</Text>
                            </View>
                            <TouchableOpacity style={{flexDirection:'row'}}
                                              onPress={()=>this._praise(rowID,rowData.id,!rowData.isPraise)}>
                                <Text style={{margin:5}}>{rowData.praise || 0}</Text>
                                <Image source={praiseImg}
                                       style={{width: 26,height:26,marginRight: 10,}}/>
                            </TouchableOpacity>
                        </View>
                        {/*评论内容*/}
                        <View
                            style={{justifyContent: 'center',alignItems:'center',height: 40,marginTop: 10,}}>
                            <Text style={{color: 'black'}}>{rowData.content}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    _comment = (comment, poetryId) => {

        this.props.dispatch(action.comment(comment, poetryId));
        let date = new Date();
        this.state.dataArr.push({
            "userId": Session.getId(),
            "datatime": date.getMonth() + '月' + date.getDate() + '日  ' + date.getHours() + '时' + date.getMinutes() + '分',
            "content": comment,
            "praise": 0,
            "state": 0,
            "poetryId": poetryId,
            "user": {
                "username": Session.getUsername(),
                "headprot": Session.getHeadport()
            },
            "id": "1"
        });
        // console.log(this.state.dataArr)
        this.setState({
            dataArr: this.state.dataArr,
            text: ''
        });
    };

    render() {
        const {
            data,
            loading,
        } = this.props;
        return (
            <View style={[styles.container]}>
                <NavigatorBar title={this.props.title} leftImageUrl={require('../../../icon/come_back.png')}
                              leftFunc={()=>{this.props.navigator.pop()}}
                              rightImageUrl={require('../../../icon/zhuanfa.png')} rightFunc={()=>{}}/>
                <ScrollView style={styles.scrollview}>
                    {/*详情内容展示卡片*/}
                    <View style={styles.card}>
                        <Image source={{uri:data.intrImgUrl}}
                               style={styles.image_ctx}/>
                        <Text style={styles.title}>{data.title}</Text>
                        <View style={styles.author_view}>
                            <Text style={styles.author}>{data.author}</Text>
                        </View>
                        <Text style={styles.content}>{data.detail}</Text>
                    </View>
                    {/*评论列表卡片*/}
                    <View style={[styles.card,{paddingTop: 0,}]}>
                        <View
                            style={styles.comment_title_view}>
                            <Image source={require('../../../icon/晴_press.png')}
                                   style={styles.comment_title_image}/>
                            <Text style={[styles.title,styles.comment_title]}>精彩评论</Text>
                        </View>
                        {
                            loading ?
                                <Text>加载中</Text> :
                                <ListView
                                    style={{margin: 5,}}
                                    dataSource={this.dataSource.cloneWithRows(this.state.dataArr)}
                                    renderRow={this._renderRow}
                                    initialListSize={10}
                                    enableEmptySections={true}
                                />
                        }

                    </View>
                </ScrollView>
                {/*评论输入框*/}
                <View
                    style={{margin:0,flexDirection: 'row',width:CommonConfigs.ScreenWidth,height:60* CommonConfigs.Scale,backgroundColor:CommonConfigs.bgColor,alignItems: 'center'}}>
                    <TextInput style={{flex: 1}} onChangeText={(text) => this.setState({text})}
                               value={this.state.text}/>
                    <TouchableOpacity onPress={()=>{this._comment(this.state.text,data.id)}}>
                        <Image source={require('../../../icon/commit.png')}
                               style={{width: 40,height:40,marginRight: 10,}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    author_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    author: {
        fontSize: 18 * CommonConfigs.Scale,
        marginBottom: 15 * CommonConfigs.Scale,
    },
    comment_title_view: {
        flexDirection: 'row',
        margin: 5 * CommonConfigs.Scale,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    comment_title_image: {
        width: 30 * CommonConfigs.Scale,
        height: 30 * CommonConfigs.Scale,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    comment_title: {
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: CommonConfigs.bgColor,
    },
    card: {
        backgroundColor: 'white',
        margin: 10 * CommonConfigs.Scale,
        elevation: CommonConfigs.CardElevation,
        paddingTop: 10 * CommonConfigs.Scale,
        paddingBottom: 18 * CommonConfigs.Scale,
    },
    content: {
        color: '#333',
        fontSize: 18 * CommonConfigs.Scale,
        // marginTop: 15 * CommonConfigs.Scale,
        alignSelf: 'center',
        padding: 10,
    },
    image_ctx: {
        width: CommonConfigs.ScreenWidth * CommonConfigs.Scale,
        height: CommonConfigs.ScreenHeight / 3 * CommonConfigs.Scale,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    scrollview: {
        flex: 1,
        width: CommonConfigs.ScreenWidth
    },
    title: {
        color: 'black',
        fontSize: 24 * CommonConfigs.Scale,
        margin: 15 * CommonConfigs.Scale,
        alignSelf: 'center',
    },

});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.PoetryDetailReducer,
    };
}

export default connect(mapStateToProps)(PoetryDetail);

