import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    PixelRatio,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';

/**示例:
 *  导航栏左边文字返回：<NavigatorBar title="工作" leftText="返回"  leftFunc={()=>{alert(2);}} />
 *  导航栏左边图片：<NavigatorBar title="工作" leftImageUrl={require("../../../images/icon-left2.png")}  leftFunc={()=>{alert(2);}} />
 */
//获取ios与android导航栏高度与状态栏高度
var NavigatorNavigationBarStylesAndroid = require('NavigatorNavigationBarStylesAndroid');
var NavigatorNavigationBarStylesIOS = require('NavigatorNavigationBarStylesIOS');

var NavigatorNavigationBarStyles = Platform.OS === 'android' ?
    NavigatorNavigationBarStylesAndroid : NavigatorNavigationBarStylesIOS;
//==============================

export default class NavigatorBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let {title, titleColor, leftImageUrl, leftText, leftTextColor, leftFunc, rightImageUrl, rightText, rightTextColor, rightFunc} = this.props;
        //title处理
        let titleStyleArray = [];
        titleStyleArray.push(styles.titleStyle);
        titleColor ? titleStyleArray.push({color: titleColor}) : titleStyleArray.push({color: '#fff'});
        //左边栏处理
        let leftFalg = leftImageUrl || leftText;
        if (leftFalg) {
            if (!leftFunc) {
                throw new Error("请传左边栏的回调方法");
            }
        }
        let leftTextStyleArray = [];
        leftTextColor ? leftTextStyleArray.push({color: leftTextColor}) : leftTextStyleArray.push({color: "#000000"});
        //右边栏处理
        let rightFalg = rightImageUrl || rightText;
        if (rightFalg) {
            if (!rightFunc) {
                throw new Error("请传右边栏的回调方法");
            }
        }
        let rightTextStyleArray = [];
        rightTextColor ? rightTextStyleArray.push({color: rightTextColor}) : rightTextStyleArray.push({color: "#000000"});

        return (
            <View style={styles.container}>
                <Text style={titleStyleArray}>{title}</Text>
                {
                    //左边栏
                    leftFalg ?
                        leftImageUrl ?
                            <TouchableOpacity onPress={leftFunc}
                                              style={[styles.leftImageStyle]}
                            >
                                <View style={styles.leftTouchImageStyle}>
                                    <Image style={styles.leftInnerImageStyle} source={leftImageUrl}>
                                    </Image>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={leftFunc}
                                              style={[styles.leftImageStyle, styles.leftTextStyle]}
                            >
                                <Text style={[leftTextStyleArray, {paddingLeft: 15}]}>{leftText}</Text>
                            </TouchableOpacity>
                        : null
                }
                {
                    //右边栏
                    rightFalg ?
                        rightImageUrl ?
                            <TouchableOpacity onPress={rightFunc}
                                              style={styles.rightImageStyle}
                            >
                                <View style={styles.rightTouchImageStyle}>
                                    <Image style={styles.rightInnerImageStyle} source={rightImageUrl}>
                                    </Image>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={rightFunc}
                                              style={[styles.rightImageStyle, styles.rightTextStyle]}
                            >
                                <Text style={[rightTextStyleArray, {paddingRight: 15}]}>{rightText}</Text>
                            </TouchableOpacity>
                        : null
                }
            </View>
        );
    }
}

NavigatorBar.propTypes = {
    title: React.PropTypes.string.isRequired,   //标题【必传】
    titleColor: React.PropTypes.string,          //标题文字颜色
    leftImageUrl: React.PropTypes.number,       //左边图标
    leftText: React.PropTypes.string,           //左边文字，如果图像和图标一起传，则默认使用图标
    leftTextColor: React.PropTypes.string,       //左边文字颜色
    leftFunc: React.PropTypes.func,               //左边栏的方法
    rightImageUrl: React.PropTypes.number,       //右边图标 传具体的图标
    rightText: React.PropTypes.string,           //右边文字
    rightTextColor: React.PropTypes.string,      //右边文字颜色
    rightFunc: React.PropTypes.func,              //右边栏方法

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 46,
        backgroundColor: '#38B5DF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: NavigatorNavigationBarStyles.General.StatusBarHeight,
        elevation: 5,
        marginBottom: 4,
    },
    titleStyle: {
        fontSize: 18,
        // color: '#fff',
    },
    rightImageStyle: {
        //backgroundColor: 'red',
        height: NavigatorNavigationBarStyles.General.TotalNavHeight,
        position: 'absolute',//绝对布局
        right: 0,
        padding: Platform.OS === 'ios' ? 0 : 5,
        top: NavigatorNavigationBarStyles.General.StatusBarHeight-4,
        alignItems: 'center',
    },
    rightTextStyle: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 0,
    },
    leftImageStyle: {
        //backgroundColor:'red',
        height: NavigatorNavigationBarStyles.General.TotalNavHeight,
        position: 'absolute',//绝对布局
        top: NavigatorNavigationBarStyles.General.StatusBarHeight-4,
        left: 0,
        padding: Platform.OS === 'ios' ? 0 : 5,
        alignItems: 'center',
    },
    leftTextStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 0,
    },
    leftImageStyle_1: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 0,
    },
    rightInnerImageStyle: {
        resizeMode: "contain",
        width: 18,
        height: 18,
    },
    leftInnerImageStyle: {
        resizeMode: "contain",
        width: 23 / 2,
        height: 37 / 2,
    },
    leftTouchImageStyle: {
        alignItems: 'center',
        width: 50,
        height: 44,
        justifyContent: 'center',
    },
    rightTouchImageStyle: {
        alignItems: 'center',
        width: 50,
        height: 44,
        justifyContent: 'center',
    },
});