/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:45:16 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 20:51:03
 */

/**
 * App Theme - Sizes
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
    // Window Dimensions
    screen: {
        height: screenHeight,
        width:  screenWidth,

        heightOneThird:      screenHeight * 0.333,
        heightTwoThirds:     screenHeight * 0.666,
        heightTwoFifths:     screenHeight * 0.40,
        heightThreeQuarters: screenHeight * 0.75,
        heightHalf:          screenHeight * 0.5,
        heightTenth:         screenHeight * 0.1,

        widthHalf:          screenWidth * 0.5,
        widthOneThird:      screenWidth * 0.333,
        widthTwoThirds:     screenWidth * 0.666,
        widthQuarter:       screenWidth * 0.25,
        widthThreeQuarters: screenWidth * 0.75,
        widthFourFifths:    screenWidth * 0.8,
    },
    navbarHeight:    (Platform.OS === 'ios') ? 64 : 54, // header with title and nav bar buttons
    statusBarHeight: (Platform.OS === 'ios') ? 16 : 0,  // time and icon indicators
    tabbarHeight:    51,

    padding:    20,
    paddingSml: 10,
    tickSize:   5,

    borderRadius: 5,
};
