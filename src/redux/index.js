/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:28:11 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 03:27:27
 */

/**
 * Combine All Reducers
 */

import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import raspberryPi from '@redux/raspberryPi/reducer';
import router from '@redux/router/reducer';

// Combine all
const appReducer = combineReducers({
    raspberryPi,
    router
});

// Setup root reducer
const rootReducer = (state, action) => {
    const newState = (action.type === 'RESET') ? null : state;
    return appReducer(newState, action);
};

export default rootReducer;
