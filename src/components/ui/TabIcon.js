/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:15:55 
 * @Last Modified by:   Vir Desai 
 * @Last Modified time: 2017-10-14 16:15:55 
 */

/**
 * Tabbar Icon
 *
    <TabIcon icon={'search'} selected={false} />
 *
 */
import React, { PropTypes } from 'react';
import { Icon } from 'react-native-elements';

import { AppColors } from '@theme/';

/* Component ==================================================================== */
const TabIcon = ({ icon, selected }) => (
    <Icon
        name={icon}
        size={26}
        color={selected ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault}
    />
);

TabIcon.propTypes = { icon: PropTypes.string.isRequired, selected: PropTypes.bool };
TabIcon.defaultProps = { icon: 'search', selected: false };

/* Export Component ==================================================================== */
export default TabIcon;
