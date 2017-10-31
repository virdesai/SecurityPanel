import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import AppContainer from './src';

let codePushOptions = {
    updateDialog: false,
    installMode:  codePush.InstallMode.IMMEDIATE
};

AppRegistry.registerComponent('SecurityPanel', () => codePush(codePushOptions)(AppContainer));
