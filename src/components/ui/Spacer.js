/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:15:22 
 * @Last Modified by:   Vir Desai 
 * @Last Modified time: 2017-10-14 16:15:22 
 */

/**
 * Spacer
 *
    <Spacer size={10} />
 *
 */
import React, { PropTypes } from 'react';
import { View } from 'react-native';

/* Component ==================================================================== */
const Spacer = ({ size }) => (
    <View
        style={{
            left:      0,
            right:     0,
            height:    1,
            marginTop: size - 1,
        }}
    />
);

Spacer.propTypes = { size: PropTypes.number };
Spacer.defaultProps = { size: 10 };
Spacer.componentName = 'Spacer';

/* Export Component ==================================================================== */
export default Spacer;
