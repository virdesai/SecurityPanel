/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 03:14:58 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 03:06:17
 */

/**
 * Raspberry Pi Reducer
 */
import Actions from '../actionTypes';

// Set initial state
const initialState = {
    city:         'Cary',
    ledStatus:    0,
    passcode:     '5555',
    weather:      null,
    sensors:      null,
    modes:        null,
    selectedMode: null,
    alarmState:   null,
    alarm:        false,
};

export default function raspberryPiReducer(state = initialState, action) {
    switch (action.type) {
    case Actions.CHANGE_LED_STATUS:
        return Object.assign({}, state, {
            ledStatus: action.data.value
        });
    case Actions.GET_PASSCODE:
        return Object.assign({}, state, {
            passcode: action.data
        });
    case Actions.GET_LOCATION:
        return Object.assign({}, state, {
            city: action.data ? action.data : state.city
        });
    case Actions.GET_WEATHER:
        return Object.assign({}, state, {
            weather: action.data
        });
    case Actions.GET_SENSORS:
        return Object.assign({}, state, {
            sensors: action.data
        });
    case Actions.GET_MODES:
        return Object.assign({}, state, {
            modes: action.data
        });
    case Actions.SET_MODE:
        return Object.assign({}, state, {
            selectedMode: action.data
        });
    case Actions.SENSOR_STATE_CHANGED:
        // let newSensorsState = state.sensors.map(sensor => sensor.pin === action.data.pin ? action.data : sensor);
        return Object.assign({}, state, {
            sensors: action.data
        });
    case Actions.CHANGE_SENSOR_STATE:
        return Object.assign({}, state, {
            sensors: action.data
        });
    case Actions.ALARM_CHANGED:
        return Object.assign({}, state, {
            alarm: action.data
        });
    case Actions.TURN_OFF_ALARM:
        return Object.assign({}, state, {
            alarmState:   action.data.alarmState,
            alarm:        action.data.alarm,
            sensors:      action.data.sensors,
            selectedMode: null,
        });
    case Actions.GET_ALARM_STATE:
        return Object.assign({}, state, {
            alarmState: action.data
        });
    case Actions.TURN_ON_ALARM:
        return Object.assign({}, state, {
            alarmState: action.data.alarmState
        });
    case Actions.RESET_SENSOR:
        return Object.assign({}, state, {
            sensors: action.data
        })
    default:
        return state;
    }
}
