/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    PixelRatio,
    Alert,
    AsyncStorage,
    InteractionManager,
    Platform,
    Animated,
    Easing,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    LayoutAnimation,
} from 'react-native';
import {connect} from 'react-redux';//将我们的页面和action链接起来
import Main from '../main/Main';
import * as actions from '../../actions/LoginAction';
import {scaleHeight, scaleWitdh} from '../../util/scale';
import * as types from '../../actions/ActionTypes';

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }


    componentWillReceiveProps(nextProps) {
        const {
            type,
            navigator,
            dispatch,
        } = nextProps;
        // console.log("componentWillUpdate");
        switch (type) {
            case types.LOGIN_SUCCESS:
                dispatch(actions.restLoginData());
                navigator.push({
                    name: 'main',
                    component: Main,
                });

                break;
        }
    }

    componentDidMount() {
        // console.log("componentDidMount");
    }

    _login = () => {
        const {dispatch} = this.props;
        dispatch(actions.login());
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={require('../../../images/logo1.png')}
                           style={styles.logoImageView}/>

                </View>
                <View style={styles.logoTextView}>
                    <Animated.Text >宝宝成长路</Animated.Text>
                </View>
                <View behavior="padding" style={styles.userInfoView}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row',}}>
                            <Image source={require('../../../images/icon-user.png')}
                                   style={styles.userImage}/>
                            <TextInput
                                style={styles.textInputView}
                                placeholder="姓名/手机号"
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                                value={'18850107457'}
                                onSubmitEditing={() => {
                this.refs.pwd.focus();
                }}
                                returnKeyType="next"
                                onChangeText={(text) => {

                this.setState({
                userCode: text,
                });
                }}
                            />
                        </View>
                    </View>
                    <View style={styles.lineView}></View>
                    <View style={{flex: 1}}>

                        <View style={{flexDirection: 'row',}}>
                            <Image source={require('../../../images/icon-password.png')}
                                   style={styles.userImage}/>
                            <TextInput
                                ref="pwd"
                                style={styles.textInputView}
                                placeholder="密码"
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                value='qweqweqwe'
                                onChangeText={(text) => {
                this.setState({
                password: text,
                });
                }}
                                returnKeyType="done"
                                onSubmitEditing={() => {
                this._login();
                }}
                            />
                        </View>

                    </View>
                </View>
                <TouchableOpacity onPress={this._login}
                                  style={styles.loginButton}>
                    <Text style={{color: 'white', fontSize: 15,}}>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eceef3",
    },
    logoView: {
        marginTop: 232 / 3 * scaleHeight,
        alignItems: 'center',
    },
    logoImageView: {
        width: 176 / 3 * scaleWitdh,
        height: 176 / 3 * scaleHeight,
        borderRadius: 5,
    },
    logoTextView: {
        marginTop: 36 / 3 * scaleHeight,
        alignItems: 'center',
    },
    userImage: {
        width: 58 / 3 * scaleWitdh,
        height: 58 / 3 * scaleHeight,
        marginTop: 32 / 3 * scaleHeight,
        marginBottom: 36 / 3 * scaleHeight,
        marginLeft: 42 / 3 * scaleWitdh,
        marginRight: 42 / 3 * scaleWitdh,
    },
    userInfoView: {
        borderRadius: 5,
        height: 256 / 3 * scaleHeight,
        marginTop: 258 / 3 * scaleHeight,
        marginLeft: 64 / 3 * scaleWitdh,
        marginRight: 64 / 3 * scaleWitdh,
        backgroundColor: 'white',
    },
    textInputView: {
        flex: 1,
        fontSize: 13,
        padding: 2
    },
    lineView: {
        width: Dimensions.get("window").width - 2 * (64 / 3) * scaleWitdh,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#e1e1e1',
    },
    loginButton: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120 / 3 * scaleHeight,
        marginTop: 58 / 3 * scaleHeight,
        marginLeft: 64 / 3 * scaleWitdh,
        marginRight: 64 / 3 * scaleWitdh,
        backgroundColor: '#1ca9f9',
    },

});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    // console.log("mapStateToProps");
    // console.log(state.LoginReducer);
    return {
        ...state.LoginReducer
    };
}

export default connect(mapStateToProps)(Login);
