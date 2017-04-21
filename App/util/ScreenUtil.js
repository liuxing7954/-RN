/**
 * Created by user on 2017/2/23.
 */

import {
    Dimensions,
} from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const ScreenHeight = Dimensions.get("window").height;

const uiWidth = 1080;//ui设计宽度

function pxTodp(px){
    return px * ScreenWidth / uiWidth ;
}

export {pxTodp,ScreenWidth,ScreenHeight};