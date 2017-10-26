/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 03:00:16 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 21:20:32
 */

/**
 * Dashboard Screen Container
 */
import { connect } from 'react-redux';

// Actions
import * as RaspberryPiActions from '@redux/raspberryPi/actions';

// The component we're mapping to
import DashboardRender from './DashboardView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    ledStatus:    state.raspberryPi.ledStatus,
    city:         state.raspberryPi.city,
    weather:      state.raspberryPi.weather,
    sensors:      state.raspberryPi.sensors,
    modes:        state.raspberryPi.modes,
    selectedMode: state.raspberryPi.selectedMode,
    alarm:        state.raspberryPi.alarm,
});

// Any actions to map to the component?
const mapDispatchToProps = {
    changeLedStatus:    RaspberryPiActions.changeLedStatus,
    getWeather:         RaspberryPiActions.getWeather,
    getSensors:         RaspberryPiActions.getSensors,
    getModes:           RaspberryPiActions.getModes,
    setMode:            RaspberryPiActions.setMode,
    sensorStateChanged: RaspberryPiActions.sensorStateChanged,
    changeSensorState:  RaspberryPiActions.changeSensorState,
    alarmChanged:       RaspberryPiActions.alarmChanged,
    turnOnAlarm:        RaspberryPiActions.turnOnAlarm,
    turnOffAlarm:       RaspberryPiActions.turnOffAlarm,
    resetPin:           RaspberryPiActions.resetPin,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRender);
