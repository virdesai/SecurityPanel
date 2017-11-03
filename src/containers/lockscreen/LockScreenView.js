/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 01:46:22 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 03:10:20
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, TextInput, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { APIConfig } from '@constants';
import { AppColors, AppStyles, AppSizes, AppFonts } from '@theme/';
import { Text } from '@ui/'

const styles = StyleSheet.create({
    row: {
        flex:          1,
        flexDirection: 'row',
        paddingTop:    1,

    },
    button: {
        flex:            1,
        borderWidth:     10,
        borderColor:     '#445566',
        margin:          10,
        borderRadius:    20,
        backgroundColor: AppColors.brand.primary,
        justifyContent:  'center',
        alignItems:      'center'
    },
    number: {
        color:    'white',
        fontSize: 40
    }
});

const keypadRowValues = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']];

/* Component ==================================================================== */
class LockScreenView extends Component {
    static componentName = 'LockScreenView';

    static propTypes = {
        city:               PropTypes.string,
        passcode:           PropTypes.string,
        alarmState:         PropTypes.object,
        selectedMode:       PropTypes.string,
        alarm:              PropTypes.bool,
        getPasscode:        PropTypes.func.isRequired,
        getLocation:        PropTypes.func.isRequired,
        getWeather:         PropTypes.func.isRequired,
        getAlarmState:      PropTypes.func.isRequired,
        alarmChanged:       PropTypes.func.isRequired,
        turnOffAlarm:       PropTypes.func.isRequired,
        sensorStateChanged: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            passcode: '',
        };

        this.webSocketInterval = setInterval(() => {
            this.createWebsocket();
        }, 1000);
    }

    componentWillMount = () => {
        StatusBar.setHidden(true);
        this.props.getPasscode();
        this.props.getAlarmState();
        // this.props.getLocation()
        //     .then(this.props.getWeather(this.props.city));
        this.props.getWeather(this.props.city);
    }

    componentWillUnmount = () => {
        clearInterval(this.webSocketInterval);
    }

    createWebsocket = () => {
        try {
            /* eslint-disable no-undef */
            ws = new WebSocket(APIConfig.ws);
            ws.onopen = () => {
                // connection opened
                try {
                    clearInterval(this.webSocketInterval);
                    ws.send('initiate'); // send a message
                } catch (err) {
                    console.log(err);
                }
            };
            
            ws.onmessage = (e) => {
                // a message was received
                console.log(e.data);
                try {
                    let json = JSON.parse(e.data);
                    if (json.alarm) {
                        this.props.alarmChanged(json.alarm);
                        if (this.textInput) {
                            this.textInput.clear();
                        }
                    } else {
                        this.props.sensorStateChanged(json);
                    }
                } catch (error) { console.log(error.message); }
            };
            
            ws.onerror = (e) => {
                // an error occurred
                console.log(e.message);
            };
            
            ws.onclose = (e) => {
                // connection closed
                console.log(e.code, e.reason);
                try {
                    clearInterval(this.webSocketInterval);
                    this.webSocketInterval = setInterval(() => {
                        this.createWebsocket();
                    }, 10000);
                } catch (err) {
                    console.log(err);
                }
            };
        } catch(error) {
            console.log(error);
        }
    }

    log(value) {
        let newPasscode = `${this.state.passcode}${value}`.slice(0-this.props.passcode.length);
        this.setState({ passcode: newPasscode });
        if (newPasscode === this.props.passcode) {
            this.setState({ passcode: '' });
            this.props.turnOffAlarm()
                .then(() => this.props.alarmChanged(false))
                .then(() => Actions.dashboard());
        }
    }

    render() {
        let securityOn = this.props.alarmState && this.props.selectedMode ? this.props.alarmState[this.props.selectedMode].active : false;
        let placeholder = this.props.alarm ? 'Alarm Triggered' : securityOn ? this.props.selectedMode.toUpperCase() : 'Enter Passcode';
        return (
            <View style={securityOn ? AppStyles.containerActive : AppStyles.container}>
                <TextInput
                    ref={(input) => { this.textInput = input; }}
                    placeholder={placeholder}
                    style={[styles.row, AppStyles.h0, {textAlign: 'center'}]}
                    editable={false}
                    value={this.state.passcode}
                    placeholderTextColor={AppColors.textSecondary}
                    secureTextEntry
                />
                {
                    keypadRowValues.map((keypadRow, rowIndex) =>
                        <View style={styles.row} key={rowIndex}>
                            {
                                keypadRow.map((value, keyIndex) =>
                                    <TouchableHighlight key={keyIndex} style={styles.button} onPress={() => this.log(value)}>
                                        <View>
                                            <Text h1>{value}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }
                        </View>
                    )
                }
            </View>
        );
    }
}


/* Export Component ==================================================================== */
export default LockScreenView;
