/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Image,
    Button, Platform, BackAndroid
} from 'react-native';
import {connect} from 'react-redux';//将我们的页面和action链接起来
import TabNavigator from 'react-native-tab-navigator';
import Poetry from '../poetry/Poetry';
import Thing from '../thing/Thing';
import Arithmetic from '../arithmetic/Arithmetic';
import Personl from '../mine/Personl';
import {scaleHeight, scaleWitdh} from '../../util/scale';
import Session from '../../stores/Session';
class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'poetryTab',
        };
    }

    componentWillMount() {
        //初始化数据
        Session.init();

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
        }

    }

    _onBackAndroid = () => {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        // alert(routers.length);
        if (routers.length > 2) {
            navigator.pop();
            return true;
        }
        // 按两次退出
        else {
            if (this.putBackTime < 0) {
                this.putBackTime = new Date().getTime();
                return true;
            }
            if (new Date().getTime() - this.putBackTime < 2000) {
                return false;
            } else {
                this.putBackTime = new Date().getTime();
            }
        }
        return true;
    };

    _getTabComponent = () => {
        let tabComponent = [];
        tabComponent.push(this._renderTabItem(
            1,
            '诗歌',
            require("../../../icon/poetry.png"),
            require("../../../icon/poetry_press.png"),
            'poetryTab',
            <Poetry {...this.props}/>,
        ));
        tabComponent.push(this._renderTabItem(
            2,
            '认物',
            require("../../../icon/thing.png"),
            require("../../../icon/thing_press.png"),
            'thingTab',
            <Thing {...this.props}/>,
        ));
        tabComponent.push(this._renderTabItem(
            3,
            '算术',
            require("../../../icon/math.png"),
            require("../../../icon/math_press.png"),
            'mathTab',
            <Arithmetic {...this.props}/>,
        ));
        tabComponent.push(this._renderTabItem(
            4,
            '我的',
            require("../../../icon/person.png"),
            require("../../../icon/person_press.png"),
            'mineTab',
            <Personl {...this.props}/>,
        ));
        return tabComponent;
    };

    _renderTabItem = (key, title, icon, selectedIcon, selectedTab, component, badgeText) => {
        return (
            <TabNavigator.Item
                key={key}
                title={title}
                titleStyle={styles.titleStyle}
                renderIcon={() => <Image source={icon} style={styles.iconStyle}/>} // 图标
                renderSelectedIcon={() =><Image source={selectedIcon} style={styles.iconStyle}/>}   // 选中的图标
                onPress={()=>{this.setState({selectedTab:selectedTab})}}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText={badgeText}
            >
                {component}
            </TabNavigator.Item>
        );
    };

    render() {
        // const {dispatch, visibleTodos, visibilityFilter} = this.props;
        let tabs = this._getTabComponent();
        return (
            <TabNavigator tabBarStyle={{ height: 55 }}>
                {tabs}
            </TabNavigator>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    selectedTitleStyle: {
        color: 'rgba(0,143,218,1)',
    },
    titleStyle: {
        fontSize: 12,
        marginTop: 2,
    },
    iconStyle: {
        width: 30 * scaleHeight,
        height: 30 * scaleHeight,
    },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    // console.log("mapStateToProps");
    return {
        // num: state,
    };
}

export default connect(mapStateToProps)(Main);
