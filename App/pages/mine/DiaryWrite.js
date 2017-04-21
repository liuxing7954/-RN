import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Alert,
    Platform, TextInput,
    DeviceEventEmitter, RefreshControl, ListView,
} from "react-native";
import {connect} from 'react-redux';
import * as action from '../../actions/DiaryAction';
import * as types from '../../actions/ActionTypes';
import Session from '../../stores/Session';
import NavigatorBar from '../../components/NavigatorBar';           //导航栏
/**
 * 内容线条
 */
class DiaryWrite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mb: {},
        };
        this.mb = {};
    }

    componentWillMount() {
        this.props.dispatch(action.getDiaryToday(Session.getpoetry(), Session.getthing(), Session.getmath()));
    }

    componentWillReceiveProps(nextProps) {
        const {type, mb} = nextProps;
        if (type == types.GETDIARY_SUCCESS) {
            this.setState({mb});
        }
        if (type == types.GETDIARY_FAIL) {
            alert('一天不可以重复写日志');
            this.props.navigator.pop();
        }
    }

    _save = () => {
        const {mb} = this.state;
        let date = new Date();
        this.props.dispatch(action.putDiary(
            mb.content + this.state.text,
            date.getYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
            mb.title
        ));
        this.props.navigator.pop();
        this.props._onBack();
    };

    render() {
        const {mb} = this.state;
        return (
            <View style={Styles.container}>
                <NavigatorBar title={'今天的表现'} leftImageUrl={require('../../../icon/come_back.png')}
                              leftFunc={()=>{this.props.navigator.pop()}}
                              rightImageUrl={require('../../../icon/保存.png')}
                              rightFunc={this._save}
                />
                <ScrollView style={{flexDirection: 'column'}}>
                    <View style={Styles.item}>
                        <Text style={Styles.title}>{mb.title}</Text>
                        <Text>时间</Text>
                        <Text
                            style={Styles.content}>{mb.content}</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={{flex: 1}} onChangeText={(text) => {this.setState({text})}}
                                       value={this.state.text}/>
                        </View>
                        {/*分割线*/}
                        <View style={{flexDirection:'row'}}>
                            <View style={{height:0.8,flex: 1, backgroundColor:'#ddd',marginTop:10,marginBottom: 10,}}/>
                        </View>
                    </View>
                </ScrollView>
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
        flex: 1,
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
        color: '#333',
        fontSize: 20,
    },
    content: {
        color: '#333',
    },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        ...state.DiaryWriteReducer,
    };
}

export default connect(mapStateToProps)(DiaryWrite);

