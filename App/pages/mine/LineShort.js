import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
let scall = 2.5;

/**
 * 内容线条
 */
export default class LineShort extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.line}/>
        );
    }
}
const Styles = StyleSheet.create({
    line: {
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        width: 52 / scall,
        height: 1,
    },
});
