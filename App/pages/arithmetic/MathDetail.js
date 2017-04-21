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
import Session from '../../stores/Session';
import * as Types from '../../actions/ActionTypes';
import ShuXue from '../../util/ShuXue';
// import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
class MathDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            res: '',
            operator: '',
        };
    }

    componentWillMount() {
        let opt = '';
        //选择哪种算术题
        switch (this.props.opt) {
            case '加法':
                opt = '+';
                break;
            case '减法':
                opt = '-';
                break;
            case '乘法':
                opt = '*';
                break;
            case '除法':
                opt = '/';
                break;
            default:
                opt = '+';
                break;
        }
        this.setState({operator: opt});
        ShuXue.refresh(opt);
    }

    componentWillReceiveProps(nextProps) {
    }

    // 检查结果对错
    _check = () => {
        const {
            res,
        } = this.state;
        if (res == '') {
            alert('请输入答案！');
        }
        if (ShuXue.getResult(res)) {
            //答对题数+1
            this.setState({
                count: this.state.count + 1,
                res: '',
            });
            Session.upmath();
            ShuXue.refresh(this.state.operator);
        } else {
            alert('再检查一下！');
        }
    };

    render() {
        return (
            <View style={[styles.container]}>
                <NavigatorBar title='加法' leftImageUrl={require('../../../icon/come_back.png')}
                              leftFunc={()=>{this.props.navigator.pop()}}
                              rightImageUrl={require('../../../icon/zhuanfa.png')} rightFunc={()=>{}}/>
                {/*题目卡片*/}
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.card,{flex: 1}]}>
                        <Text style={{margin:16,alignSelf:'flex-start'}}>已经做对了<Text
                            style={{color: 'red'}}>{this.state.count}</Text>题</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{margin:12,fontSize:34,color: '#333'}}>
                                {ShuXue.getQuestionOfString()}
                            </Text>
                            <TextInput placeholder='?'
                                       style={{margin:12,fontSize:34,color: '#333',flex:1}}
                                       onChangeText={(res) => this.setState({res})}
                                       value={this.state.res}/>
                        </View>
                    </View>
                </View>
                {/*答案选择卡片*/}
                {/*<View style={{flexDirection: 'row'}}>*/}
                {/*<View style={[styles.card,{flex: 1}]}>*/}
                {/*<View style={{}}>*/}
                {/*<RadioGroup*/}
                {/*onSelect={(index, value) => this._onSelect(index, value)}*/}
                {/*style={[{height: 160}]}*/}
                {/*selectedIndex={selectedIndex}*/}
                {/*>*/}
                {/*<RadioButton value={select[0]}>*/}
                {/*<Text>{select[0]}</Text>*/}
                {/*</RadioButton>*/}

                {/*<RadioButton value={select[1]}>*/}
                {/*<Text>{select[1]}</Text>*/}
                {/*</RadioButton>*/}

                {/*<RadioButton value={select[2]}>*/}
                {/*<Text>{select[2]}</Text>*/}
                {/*</RadioButton>*/}

                {/*<RadioButton value={select[3]}>*/}
                {/*<Text>{select[3]}</Text>*/}
                {/*</RadioButton>*/}

                {/*</RadioGroup>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*确认卡片*/}
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        style={[styles.card,{alignItems: 'center',justifyContent:'center',flex:1}]}>
                        <Image source={require('../../../icon/wrong.png')}
                               style={{width:50,height:50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.card,{alignItems: 'center',justifyContent:'center',flex:1}]}
                        onPress={this._check}>
                        <Image source={require('../../../icon/yes.png')}
                               style={{width:50,height:50}}/>

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
        ...state.MathDetailReducer,
    };
}

export default connect(mapStateToProps)(MathDetail);

