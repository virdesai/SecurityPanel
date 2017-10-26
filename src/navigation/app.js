/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 01:12:21 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 16:00:15
 */

/**
 * App Navigation Scenes
 */
import React from 'react';
import { Scene, ActionConst } from 'react-native-router-flux';

// Scenes
import LockScreenView from '@containers/lockscreen/LockScreenContainer';
import DashboardView from '@containers/dashboard/DashboardContainer';

/* Routes ==================================================================== */
const scenes = (
    <Scene key={'navigation'} >
        <Scene
            key={'navroot'}>
            <Scene
                hideNavBar
                key={'lockscreen'}
                clone
                type={ActionConst.REPLACE}
                component={LockScreenView}
            />
            <Scene
                hideNavBar
                key={'dashboard'}
                clone
                type={ActionConst.REPLACE}
                component={DashboardView}
            />
        </Scene>
    </Scene>
);

export default scenes;
