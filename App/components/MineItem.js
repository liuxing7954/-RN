'use strict';

import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    PixelRatio,
} from "react-native";

import {pxTodp} from "../util/ScreenUtil";

const scall = 2.5;
const jtUrl = require("../../icon/arrow_form-right.png"); //箭头图标
const onUrl = require("../../icon/Toggle-On.png");  //Switch打开图标
const offUrl = require("../../icon/Toggle-Off.png");  //Switch关闭图标
//调用ios原生控件显示图片
//import RNImage from "../../components/RNImageView";
/**
 * 我的内容组件
 */
export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, titleColor, subTitle, subTitleColor, headImgUrl, rightImgUrl, rightImgText,
            leftImgUrl, rightType, rightText, onClick, clickAble, checkState,//rightUserPhoto,
            //leftUserPhoto,
        } = this.props;


        //
        let activeOpacity = clickAble ? 0.2 : 1;
        let allFunc = onClick ? onClick : null;
        //如果类型为2，必须传rightText的参数
        if (rightType === "2") {
            if (!rightText) {
                throw new Error("rightType为2时，缺少rightText参数");
            }
        }

        let check = checkState ? true : false;
        let switchUrl = check ? onUrl : offUrl;

        //控制点击事件的范围，类型为1时，外层TouchableOpactiy触发事件，类型为3时，Switch触发事件
        let props_1 = {};
        let props_2 = {};
        if (rightType === "3") {
            props_2 = {onPress: allFunc};
        } else {
            props_1 = {onPress: allFunc};
        }
        return (
            <View>
                <TouchableOpacity  {...props_1}
                    style={Styles.item}
                    activeOpacity={activeOpacity}

                >
                    <View style={[Styles.content, Styles.normalMargin]}>
                        {
                            leftImgUrl === undefined ?
                                null :
                                <Image style={Styles.leftIcon} source={leftImgUrl}/>
                        }
                        {
                            headImgUrl ?
                                <Image style={Styles.headImg} source={headImgUrl}/>
                                : null
                        }
                        <View style={Styles.contentTitle}>
                            <Text
                                style={[Styles.normalMargin, Styles.title, {color: titleColor?titleColor:'#000000'}]}>{title}</Text>
                            {
                                subTitle === undefined ?
                                    null :
                                    <Text
                                        style={[Styles.normalMargin, Styles.title, Styles.subTitle, {color: subTitleColor?subTitleColor:'#666666'}]}>{subTitle}</Text>
                            }
                        </View>
                    </View>
                    <View style={[{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}]}>
                        {
                            rightImgText === undefined ? null :
                                <Text style={Styles.rightImgText}>{rightImgText}</Text>
                        }
                        {
                            //
                            rightImgUrl === undefined ? null :
                                <Image style={Styles.rightImg} source={rightImgUrl}/>
                        }
                        {
                            //箭头图标
                            rightType === "1" ?
                                <Image style={Styles.tipsImg} source={jtUrl}/>
                                : null
                        }
                        {
                            //文字
                            rightType === "2" ?
                                <Text style={Styles.tipsText}>{rightText}</Text>
                                : null
                        }
                        {
                            //Switch选择控件
                            rightType === "3" ?
                                <TouchableOpacity {...props_2}>
                                    <Image style={Styles.switchItem} source={switchUrl}/>
                                </TouchableOpacity>
                                : null
                        }

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

Item.propTypes = {
    title: React.PropTypes.string.isRequired,   //大标题【必传】
    titleColor: React.PropTypes.string,         //大标题文字颜色【默认值】
    subTitle: React.PropTypes.string,           //小标题
    subTitleColor: React.PropTypes.string,      //小标题文字颜色【默认值】
    leftImgUrl: React.PropTypes.number,         //左边图标
    //leftUserPhoto:React.PropTypes.object,     //调用ios原生控件显示图片 //左边网络动态获取头像
    headImgUrl: React.PropTypes.number,
    //右边栏处理
    rightType: React.PropTypes.string,          //右边栏的类型，1-箭头图标，2-文字，3-Switch按钮
    rightText: React.PropTypes.string,          //右边文字
    rightImgUrl: React.PropTypes.number,        //右边带头像图标
    //rightUserPhoto:React.PropTypes.object,    //调用ios原生控件显示图片 //右边网络动态获取头像
    //事件
    clickAble: React.PropTypes.bool,            //Item是否整行点击,为true时，有点击效果，默认为没有点击效果
    checkState: React.PropTypes.bool,           //是否选中。
    onClick: React.PropTypes.func,              //点击事件
};

const Styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        // borderBottomWidth:1,
        // borderBottomColor: '#ccc'
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    contentTitle: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    normalMargin: {
        marginLeft: pxTodp(50),
        marginTop: pxTodp(20),
        marginBottom: pxTodp(20),
    },
    leftIcon: {
        height: pxTodp(85),
        width: pxTodp(85),
        resizeMode: "contain",
    },
    title: {
        fontSize: pxTodp(40),
        // backgroundColor: "#f00",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: pxTodp(34) / 2,
        marginTop: pxTodp(34) / 2,
        marginBottom: pxTodp(34) / 2,
    },
    subTitle: {
        color: "#666666",
        fontSize: pxTodp(40) - 1,
    },
    headImg: {
        width: pxTodp(100),
        height: pxTodp(100),
        borderRadius: pxTodp(100) / 2,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: "#fff",
    },
    rightImg: {
        width: pxTodp(130),
        height: pxTodp(130),
        borderRadius: pxTodp(130) / 2,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: "#fff",
        margin: 10,
    },
    tipsImg: {
        height: 16,
        width: 20,
        marginRight: 12,
        resizeMode: "contain",
        // backgroundColor: "#f00",
    },
    tipsText: {
        color: "#BFBFBF",
        fontSize: pxTodp(40),
        marginRight: 16,
    },
    rightImgText: {
        color: "#BFBFBF",
        fontSize: pxTodp(40),
        marginRight: 5,
    },
    switchItem: {
        height: pxTodp(70),
        width: pxTodp(105),
        marginRight: 12,
        resizeMode: "contain",
    }
});