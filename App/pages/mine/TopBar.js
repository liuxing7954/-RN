'use strict';

import React from "react";
//noinspection JSUnresolvedVariable
import {Text, StyleSheet, View, Image, Platform, Dimensions} from "react-native";
import Session from '../../stores/Session';
const scall = 2.5;
const {height, width} = Dimensions.get('window');

class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={require("../../../images/TopBack.png")} style={Styles.topBar}>
                <Image source={{uri: Session.getHeadport()}} style={Styles.icon}/>
                <Text style={Styles.nickname}>白小心</Text>
            </Image>
        );
    }
}

const iconWidth = 280;

const Styles = StyleSheet.create({
    topBar: {
        marginTop: -5,
        paddingTop: (Platform.OS === "ios") ? 20 : 0,
        justifyContent: "center",
        alignItems: "center",
        // height: height/8,
        width: width,
        resizeMode: "cover",
        flex: 1,
    },
    icon: {
        marginTop: 38,
        width: iconWidth / scall,
        height: iconWidth / scall,
        borderRadius: iconWidth / scall / 2,
        borderWidth: 1,
        borderColor: "#fff",
        marginBottom: 50 / scall,
    },
    nickname: {
        // margin: 44 / scall,
        // marginBottom: 44 + 30 / scall,
        color: "white",
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 44 / scall,
    },
});

module.exports = TopBar;