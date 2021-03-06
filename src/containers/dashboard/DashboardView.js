/*
 * @Author: Vir Desai 
 * @Date: 2017-10-12 11:08:20 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-18 18:00:25
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppColors, AppStyles, AppSizes } from '@theme/';
import { APIConfig } from '@constants/';
import { AppUtil } from '@lib/';

import { Placeholder } from '@general/';
import { Button, Card, TimeDate, Weather, Text, SortableGrid, Spacer } from '@ui/';

import CountdownCircle from 'react-native-countdown-circle';

let ws;

const styles = StyleSheet.create({
    block: {
        margin:         5,
        borderWidth:    10,
        borderColor:    AppColors.brand.darkGreen,
        borderRadius:   10,
        justifyContent: 'center',
        alignItems:     'center'
    }, 

    button: {
        flex:            1,
        borderWidth:     10,
        borderColor:     AppColors.brand.primary,
        margin:          5,
        borderRadius:    20,
        elevation:       10,
        justifyContent:  'center',
        backgroundColor: AppColors.brand.primary,
        alignItems:      'center'
    }
});

/* Component ==================================================================== */
class Dashboard extends Component {

    static propTypes = {
        ledStatus:          PropTypes.number,
        city:               PropTypes.string,
        weather:            PropTypes.object,
        sensors:            PropTypes.array,
        modes:              PropTypes.object,
        selectedMode:       PropTypes.string,
        alarm:              PropTypes.bool,
        getWeather:         PropTypes.func.isRequired,
        getSensors:         PropTypes.func.isRequired,
        getModes:           PropTypes.func.isRequired,
        setMode:            PropTypes.func.isRequired,
        sensorStateChanged: PropTypes.func.isRequired,
        changeSensorState:  PropTypes.func.isRequired,
        alarmChanged:       PropTypes.func.isRequired,
        turnOnAlarm:        PropTypes.func.isRequired,
        turnOffAlarm:       PropTypes.func.isRequired,
        resetPin:           PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            timer: false,
        };

        // every 1 minute query for the weather 
        this.getWeather =  setInterval(() => {
            this.props.getWeather(this.props.city);
        }, 60000);

        this.timer = setInterval(() => {
            Actions.lockscreen()
        }, 60000);

        this.webSocketInterval = setInterval(() => {
            this.createWebsocket();
        }, 1000);
    }

    componentWillMount = () => {
        StatusBar.setHidden(true);
        this.props.getModes();
        this.props.getSensors();
    }

    resetTimer = () => {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            Actions.lockscreen()
        }, 60000);
        return Promise.resolve();
    }

    componentWillUnmount = () => {
        clearInterval(this.getWeather);
        clearInterval(this.timer);
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

    render = () => {
        let canAlarm = this.props.sensors.every(sensor => sensor.active && !sensor.status || !sensor.active);
        return (
            <TouchableHighlight onPress={() => this.resetTimer()} style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: AppColors.background}}>
                    <View style={{ flex: 1 }}>
                        <TimeDate containerStyle={{ flex: 1, elevation: 2, margin: 5 }}/>
                        <View style={{ flex: 1, elevation: 2, margin: 5, backgroundColor: AppColors.brand.primary, justifyContent: 'center', alignItems: 'center' }}>
                            <Weather
                                city={this.props.city}
                                temperature={this.props.weather && this.props.weather.main ? AppUtil.kelvinToFahrenheit(this.props.weather.main.temp) : 0}
                                weatherType={this.props.weather && this.props.weather.weather ? this.props.weather.weather[0].main : ''}
                                icon={AppUtil.getIcon(this.props.weather && this.props.weather.weather ? this.props.weather.weather[0].icon : '')}
                            />
                        </View>
                        <View style={{ flex: 1, elevation: 2, margin: 5, backgroundColor: AppColors.brand.primary, justifyContent: 'center', alignItems: 'center' }}>
                            {
                                this.props.selectedMode ?
                                    this.state.timer && !this.props.alarm && canAlarm ?
                                        <View style={AppStyles.containerCentered}>
                                            <CountdownCircle
                                                seconds={30}
                                                radius={70}
                                                borderWidth={8}
                                                color="#ff003f"
                                                bgColor="#fff"
                                                textStyle={{ fontSize: 50, fontWeight: 'bold' }}
                                                onTimeElapsed={() => { this.setState({ timer: false }); this.props.turnOnAlarm(this.props.selectedMode).then(() => Actions.lockscreen()); }}/>
                                            <Spacer />
                                            <Button raise small title={'Cancel'} backgroundColor={AppColors.red} onPress={() => Promise.resolve(this.resetTimer()).then(() => Promise.resolve(this.props.setMode(null))).then(() => this.setState({ timer: false }))} />
                                        </View>
                                        : <Button raised title={`${this.props.alarm ? 'Turn off alarm' : 'Activate '}${this.props.alarm ? '' : this.props.selectedMode.toUpperCase()}`} backgroundColor={canAlarm ? AppColors.red : AppColors.grey} color={'white'} onPress={() => this.props.alarm ? this.props.turnOffAlarm().then(() => this.props.alarmChanged(false)).then(() => this.resetTimer()).then(() => this.setState({  timer: false })) : canAlarm ? Promise.resolve(this.resetTimer()).then(() => this.setState({ timer: true })) : null} />
                                    : <Text>Alarm Disarmed</Text>
                            }
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <SortableGrid
                            style={{ flex: 2 }}
                            blockTransitionDuration      = { 200 }
                            activeBlockCenteringDuration = { 100 }
                            itemsPerRow                  = { 6 }
                            dragActivationTreshold       = { 200 }
                            onDragRelease                = { (itemOrder) => console.log('Drag was released, the blocks are in the following order: ', itemOrder) }
                            onDragStart                  = { ()          => console.log('Some block is being dragged now!') }
                        >

                            {
                                this.props.selectedMode ? this.props.modes[this.props.selectedMode].map((sensor, index) => <TouchableHighlight key={index} onPress={() => sensor.name ? Promise.resolve(this.props.sensors[index].alarm ? this.props.resetPin(sensor.id) : this.props.changeSensorState(this.props.sensors, sensor)).then(() => this.resetTimer()) : this.resetTimer()} style={[styles.block, { flex: 1, backgroundColor: sensor.name ? this.props.sensors[index].alarm ? AppColors.yellow : this.props.sensors[index].active ? this.props.sensors[index].status ? AppColors.red : AppColors.green : AppColors.grey : AppColors.transparent }]}>
                                    <View>
                                        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{sensor.name || ''}</Text>
                                    </View>
                                </TouchableHighlight>)
                                    :  this.props.sensors ? this.props.sensors.map((sensor, index) => <TouchableHighlight key={index} onPress={() => Promise.resolve(sensor.alarm ? this.props.resetPin(sensor.id) : this.props.changeSensorState(this.props.sensors, sensor)).then(() => this.resetTimer())} style={[styles.block, { flex: 1, backgroundColor: sensor.name ? sensor.alarm ? AppColors.yellow : sensor.active ? sensor.status ? AppColors.red : AppColors.green : AppColors.grey : AppColors.transparent }]}>
                                        <View>
                                            <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{sensor.name || ''}</Text>
                                        </View>
                                    </TouchableHighlight>)
                                        : []
                            }

                        </SortableGrid>

                        <SortableGrid
                            style={{ flex: 1 }}
                            blockTransitionDuration      = { 200 }
                            activeBlockCenteringDuration = { 100 }
                            itemsPerRow                  = { 3 }
                            dragActivationTreshold       = { 200 }
                            onDragRelease                = { (itemOrder) => console.log('Drag was released, the blocks are in the following order: ', itemOrder) }
                            onDragStart                  = { ()          => console.log('Some block is being dragged now!') }
                        >
                            {
                                this.props.modes ? Object.keys(this.props.modes).map((mode, index) => <TouchableHighlight key={index} onPress={() => this.props.setMode(mode, this.props.modes[mode]).then(() => this.resetTimer())} style={[styles.button, { flex: 1, backgroundColor: this.props.selectedMode && this.props.selectedMode === mode ? AppColors.brand.darkBlue : AppColors.brand.primary }]}>
                                    <View>
                                        <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>{mode.toUpperCase()}</Text>
                                    </View>
                                </TouchableHighlight>)
                                    : []
                            }
                        </SortableGrid>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

/* Export Component ==================================================================== */
export default Dashboard;
