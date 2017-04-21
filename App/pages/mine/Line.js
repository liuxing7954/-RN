import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
let scall = 2.5;

/**
 * 内容块
 */
export default class Line extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {content} = this.props;
        if (content === undefined || content == "")
            return (
                <View style={Styles.linOne}/>
            );
        else
            return (
                <View style={Styles.line}>
                    <Text style={Styles.text}>{content}</Text>
                </View>
            );
    }
}
const Styles = StyleSheet.create({
    line: {
        alignItems: "center",
        padding: 30 / scall,
        paddingLeft: 55 / scall,
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    linOne: {
        height: 50 / scall,
    },
    text: {
        fontSize: 40 / scall - 3,
        color: "#666",
    },
});
