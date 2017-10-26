/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:09:57 
 * @Last Modified by:   Vir Desai 
 * @Last Modified time: 2017-10-14 16:09:57 
 */

/**
 * Placeholder Scene
 *
    <Placeholder text={"Hello World"} />
 *
 */
import React, { PropTypes } from 'react';
import { View } from 'react-native';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Text } from '@ui/';

/* Component ==================================================================== */
const Placeholder = ({ text }) => (
    <View style={[AppStyles.container, AppStyles.containerCentered]}>
        <Text>{text}</Text>
    </View>
);

Placeholder.propTypes = { text: PropTypes.string };
Placeholder.defaultProps = { text: 'Coming soon...' };
Placeholder.componentName = 'Placeholder';

/* Export Component ==================================================================== */
export default Placeholder;
