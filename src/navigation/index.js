/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:29:11 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 16:03:54
 */

/**
 * App Navigation
 */
import React from 'react';
import { Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Scenes
import AppNavigation from './app';

/* Routes ==================================================================== */
const scenes = (
    <Scene key={'root'} hideNavBar>
        <Scene key={'app'} hideNavBar title={AppConfig.appName} type={ActionConst.RESET}>
            {AppNavigation}
        </Scene>
    </Scene>
);

export default scenes;
