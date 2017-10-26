/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 01:45:29 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 03:10:44
 */

/**
 * Lock Screen Container
 */
import { connect } from 'react-redux';

// Actions
import * as RaspberryPiActions from '@redux/raspberryPi/actions';

// The component we're mapping to
import LockScreenRender from './LockScreenView';

// What data from the store shall we send to the component?
const mapStateToProps = state =>  ({
    city:         state.raspberryPi.city,
    passcode:     state.raspberryPi.passcode,
    alarmState:   state.raspberryPi.alarmState,
    selectedMode: state.raspberryPi.selectedMode,
    alarm:        state.raspberryPi.alarm,
});

// Any actions to map to the component?
const mapDispatchToProps = {
    getPasscode:        RaspberryPiActions.getPasscode,
    getLocation:        RaspberryPiActions.getLocation,
    getWeather:         RaspberryPiActions.getWeather,
    getAlarmState:      RaspberryPiActions.getAlarmState,
    alarmChanged:       RaspberryPiActions.alarmChanged,
    turnOffAlarm:       RaspberryPiActions.turnOffAlarm,
    sensorStateChanged: RaspberryPiActions.sensorStateChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(LockScreenRender);
