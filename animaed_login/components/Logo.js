import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const Logo = ({scale}) => {
  console.log({scale});
  return (
    <Animated.View style={{...styles.logo, transform: [{scale}]}}>
      <Text style={{fontWeight: '400', fontSize: 36}}>Uber</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'white',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Logo;
