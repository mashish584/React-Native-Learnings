/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Logo from './components/Logo';
import Animated, {useCode, cond} from 'react-native-reanimated';
import {withTimingTransition} from 'react-native-redash';

const App: () => React$Node = () => {
  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current);

  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo scale={scaleAnimation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2289d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
