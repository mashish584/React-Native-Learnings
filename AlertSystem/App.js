import React from 'react';
import {View, Text} from 'react-native';

import AlertProvider from './context/Provider/AlertProvider';
import AlertContext from './context/AlertContext';

const App = props => {
  console.log({props});
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Alert System</Text>
    </View>
  );
};

export default () => {
  return (
    <AlertProvider>
      <AlertContext.Consumer>
        {context => <App {...context} />}
      </AlertContext.Consumer>
    </AlertProvider>
  );
};
