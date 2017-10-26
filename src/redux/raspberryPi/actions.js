/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 03:16:24 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 03:05:04
 */

/**
 * RaspberryPi Actions
 */
import { APIConfig } from '@constants';
import { AppAPI } from '@lib/';

const Actions = require('../actionTypes');

const changeLedStatus = (pin, value) => {
    return dispatch => AppAPI.pin.post(null, { pin, value })
        .then(response => {
            return dispatch({
                type: Actions.CHANGE_LED_STATUS,
                data: { pin, value }
            });
        });
};

const getPasscode = () => {
    return dispatch => AppAPI.passcode.get()
        .then(passcode => dispatch({
            type: Actions.GET_PASSCODE,
            data: passcode.passcode
        }));
};

const getLocation = () => {
    /* eslint-disable no-undef */
    return dispatch => fetch(APIConfig.location)
        .then(response => response.json())
        .then(responseJson => dispatch({
            type: Actions.GET_LOCATION,
            data: responseJson.city,
        }))
        .catch(err => dispatch({
            type: Actions.GET_LOCATION,
            data: null
        }))
};

const getWeather = (city) => {
    return dispatch => AppAPI.weather.get({ q: city, APPID: APIConfig.weatherKey })
        .then(weatherData => dispatch({
            type: Actions.GET_WEATHER,
            data: weatherData.list[0]
        }));
};

const getSensors = () => {
    return dispatch => AppAPI.sensors.get()
        .then(sensors => dispatch({
            type: Actions.GET_SENSORS,
            data: sensors.current
        }));
};

const getModes = () => {
    return dispatch => AppAPI.modes.get()
        .then(modes => dispatch({
            type: Actions.GET_MODES,
            data: modes
        }));
};

const setMode = (newMode, sensors) => {
    return dispatch => (newMode ? AppAPI.sensors.post(null, { sensors })
        .then(response => dispatch({
            type: Actions.CHANGE_SENSOR_STATE,
            data: response.current
        })) : Promise.resolve())
        .then(() => dispatch({
            type: Actions.SET_MODE,
            data: newMode
        }));
};

const sensorStateChanged = (newSensorStates) => {
    return dispatch => dispatch({
        type: Actions.SENSOR_STATE_CHANGED,
        data: newSensorStates
    })
};

const turnOnAlarm = (mode) => {
    return dispatch => AppAPI.alarm.post(null, {
        active: true,
        mode,
    })
        .then(response => dispatch({
            type: Actions.TURN_ON_ALARM,
            data: response
        }));
};

const turnOffAlarm = () => {
    return dispatch => AppAPI.alarm.post(null, {
        active: false,
    })
        .then(response => dispatch({
            type: Actions.TURN_OFF_ALARM,
            data: response,
        }));
};

const getAlarmState = () => {
    return dispatch => AppAPI.alarmState.get()
        .then(response => dispatch({
            type: Actions.GET_ALARM_STATE,
            data: response.alarmState
        }));
};

const changeSensorState = (propsSensors, sensor) => {
    let sensors = propsSensors.map(propsSensor => {
        if (propsSensor.id === sensor.id) {
            propsSensor.active = !propsSensor.active;
        }
        return propsSensor;
    });
    return dispatch => AppAPI.sensors.post(null, { sensors })
        .then(response => dispatch({
            type: Actions.CHANGE_SENSOR_STATE,
            data: response.current
        }));
};

const alarmChanged = (value) => {
    return dispatch => dispatch({
        type: Actions.ALARM_CHANGED,
        data: value
    });
};

const resetPin = (id) => {
    return dispatch => AppAPI.resetSensor.post(null, { id })
        .then(response => dispatch({
            type: Actions.RESET_SENSOR,
            data: response.current
        }));
}

export {
    changeLedStatus,
    getPasscode,
    getLocation,
    getWeather,
    getSensors,
    getModes,
    setMode,
    sensorStateChanged,
    turnOnAlarm,
    turnOffAlarm,
    getAlarmState,
    changeSensorState,
    alarmChanged,
    resetPin
};
