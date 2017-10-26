/*
 * @Author: Vir Desai 
 * @Date: 2017-10-14 16:14:12 
 * @Last Modified by:   Vir Desai 
 * @Last Modified time: 2017-10-14 16:14:12 
 */

/**
 * Alerts - Status/Success/Error Messages
 *
    <Alerts
      error={'Error hey'}
      success={'Hello Success'}
      status={'Something\'s happening...'}
    />
 *
 */
import React, { PropTypes } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

// Components
import { Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    alerts: {
        left:  0,
        right: 0,
    },

    // Success
    msg: {
        right:             0,
        left:              0,
        paddingVertical:   10,
        paddingHorizontal: 10,
        borderLeftWidth:   3,
        borderColor:       '#1C854C',
        backgroundColor:   '#59DC9A',
    },
    msg_text: {
        textAlign:  'center',
        color:      '#16693c',
        fontWeight: '500',
    },

    // Error
    msgError: {
        borderColor:     '#C02827',
        backgroundColor: '#FB6567',
    },
    msgError_text: {
        color: '#7f1a1a',
    },

    // Status
    msgStatus: {
        borderColor:     '#408491',
        backgroundColor: '#8EDBE5',
    },
    msgStatus_text: {
        color: '#2f606a',
    },
});

/* Component ==================================================================== */
const Alerts = ({ status, success, error }) => (
    <View style={styles.alerts}>
        {!!success &&
          <View>
              <View style={[styles.msg]}>
                  <Text style={[styles.msg_text]}>{success}</Text>
              </View>
          </View>
        }

        {!!status &&
          <View>
              <View style={[styles.msg, styles.msgStatus]}>
                  <Text style={[styles.msg_text, styles.msgStatus_text]}>
                      {status}
                  </Text>
              </View>
          </View>
        }

        {!!error &&
          <View>
              <View style={[styles.msg, styles.msgError]}>
                  <Text
                      style={[
                          styles.msg_text,
                          styles.msgError_text,
                      ]}
                  >
                      {error}
                  </Text>
              </View>
          </View>
        }
    </View>
);

Alerts.propTypes = {
    status:  PropTypes.string,
    success: PropTypes.string,
    error:   PropTypes.string,
};

Alerts.defaultProps = {
    status:  '',
    success: '',
    error:   '',
};

Alerts.componentName = 'Alerts';

/* Export Component ==================================================================== */
export default Alerts;
