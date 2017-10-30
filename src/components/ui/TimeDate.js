/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:17:42 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-18 00:21:44
 */

/**
 * List Items
 *
     <ListItem title={'Hello World'} />
 *
 */
import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Spacer, Text } from '@ui/';

// Consts and Libs
import { AppColors, AppStyles, AppFonts } from '@theme/';

/* Component ==================================================================== */
class CustomTimeDate extends Component {
    static propTypes = {
        containerStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({}),
        ]),
        dateStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({}),
        ]),
        timeStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({}),
        ]),
        wrapperStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({}),
        ]),
    }

    static defaultProps = {
        containerStyle: [],
        dateStyle:      [],
        timeStyle:      [],
        wrapperStyle:   [],
    }

    constructor(props) {
        super(props);
        this.state = {
            liveTime: '',
            liveDate: '',
        };
        this.getTime =  setInterval(() => {
            let currentDate = new Date();
            this.setState({
                liveTime: `${this.formatHours(currentDate.getHours())}:${this.formatMinutes(currentDate.getMinutes())}:${this.formatMinutes(currentDate.getSeconds())} ${currentDate.getHours() >= 12 ? 'PM' : 'AM'}`,
                liveDate: currentDate.toDateString()
            })
        }, 1000);
    }

    formatHours = (hours) => {
        return hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    }

    formatMinutes = (minutes) => {
        return `${minutes < 10 ? '0' : ''}${minutes}`;
    }

    componentWillUnmount = () => {
        clearInterval(this.getTime);
    }

    dateTimeProps = () => {
        // Defaults
        const props = {
            ...this.props,
            containerStyle: [AppStyles.containerCentered, { backgroundColor: AppColors.brand.primary }],
            dateStyle:      [AppStyles.baseText, { fontSize: AppFonts.scaleFont(14) }],
            timeStyle:      [AppStyles.h3],
            wrapperStyle:   [AppStyles.containerCentered],
        };

        if (this.props.containerStyle) {
            props.containerStyle.push(this.props.containerStyle);
        }
        
        if (this.props.dateStyle) {
            props.dateStyle.push(this.props.titleStyle);
        }
        
        if (this.props.timeStyle) {
            props.timeStyle.push(this.props.subtitleStyle);
        }

        if (this.props.wrapperStyle) {
            props.wrapperStyle.push(this.props.wrapperStyle);
        }
        
        return props;
    }

    render = () => {
        let styles = this.dateTimeProps();
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.timeStyle}>{this.state.liveTime}</Text>
                <Spacer /><Spacer />
                <Text style={styles.dateStyle}>{this.state.liveDate}</Text>
            </View>
        );
    };
}

/* Export Component ==================================================================== */
export default CustomTimeDate;
