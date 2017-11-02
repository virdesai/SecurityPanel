/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:17:42 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-15 11:45:41
 */

/**
 * List Items
 *
     <ListItem title={'Hello World'} />
 *
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacer, Text } from '@ui/';

// Consts and Libs
import { AppStyles, AppFonts } from '@theme/';

var styles = StyleSheet.create({
    temperature: {
        fontWeight:    'bold',
        fontSize:      AppFonts.scaleFont(14),
        paddingBottom: 5
    },
    location: {
        fontWeight:    'bold',
        paddingBottom: 5
    },
    weatherType: {
        fontWeight:    'bold',
        fontSize:      AppFonts.scaleFont(14),
        paddingBottom: 5
    },
    icon: {
        fontFamily: 'WeatherIcons-Regular',
        fontSize:   AppFonts.scaleFont(35),
        padding:    40
    }
});

/* Component ==================================================================== */
class CustomWeather extends Component {
    static propTypes = {
        temperature:  PropTypes.number,
        city:         PropTypes.string,
        weatherType:  PropTypes.string,
        currentColor: PropTypes.string,
        nextColor:    PropTypes.string,
        icon:         PropTypes.string,
    }

    static defaultProps = {
        temperature:  0,
        city:         'Cary',
        weatherType:  '',
        currentColor: 'rgba(255,255,255,0.5)',
        nextColor:    'rgba(255,255,255,0.5)',
        icon:         ''
    }

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <View style={[AppStyles.containerCentered]}>
                <Text style={[styles.temperature]}>
                    {`Outside Temp: ${Math.round(this.props.temperature)} °F`}
                </Text>
                <Spacer /><Spacer />
                <Text style={[styles.icon]}>
                    {this.props.icon}
                </Text>
                <Text style={[styles.weatherType]}>
                    {`${this.props.city} - ${this.props.weatherType}`}
                </Text>
            </View>
        );
    };
}

/* Export Component ==================================================================== */
export default CustomWeather;
