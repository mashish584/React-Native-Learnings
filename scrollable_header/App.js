/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Animated,
} from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 80;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

const App: () => React$Node = () => {
  const [scrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 10,
    ],
    extrapolate: 'clamp',
  });

  const headerZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 10 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        10 +
        PROFILE_IMAGE_MIN_HEIGHT +
        26,
    ],
    outputRange: [-20, -20, -20, 5],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZIndex,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{position: 'absolute', bottom: headerTitleBottom}}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
            Ashish Mehra
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderWidth: 3,
            overflow: 'hidden',
            borderColor: '#fff',
            marginTop: profileImageMarginTop,
            marginLeft: 10,
          }}>
          <Image
            source={{uri: 'https://unsplash.it/300/300'}}
            style={{flex: 1, width: null, height: null}}
          />
        </Animated.View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 26, paddingLeft: 10}}>
            Ashish Mehra
          </Text>
        </View>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22, fontWeight: '400', lineHeight: 27}}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
            sollicitudin laoreet viverra, tortor libero sodales leo, eget
            blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse
            potenti. Sed egestas, ante et vulputate volutpat, eros pede semper
            est, vitae luctus metus libero eu augue. Morbi purus libero,
            faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.
            Praesent elementum hendrerit tortor. Sed semper lorem at felis.
            Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
            dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
            dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis
            sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper
            laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a
            purus. Sed vel lacus. Mauris nibh felis, adipiscing varius,
            adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam
            pellentesque mauris ut lectus. Nunc tellus ante, mattis eget,
            gravida vitae, ultricies ac, leo. Integer leo pede, ornare a,
            lacinia eu, vulputate vel, nisl. Suspendisse mauris. Fusce accumsan
            mollis eros. Pellentesque a diam sit amet mi ullamcorper vehicula.
            Integer adipiscing risus a sem. Nullam quis massa sit amet nibh
            viverra malesuada. Nunc sem lacus, accumsan quis, faucibus non,
            congue vel, arcu. Ut scelerisque hendrerit tellus. Integer sagittis.
            Vivamus a mauris eget arcu gravida tristique. Nunc iaculis mi in
            ante. Vivamus imperdiet nibh feugiat est. Ut convallis, sem sit amet
            interdum consectetuer, odio augue aliquam leo, nec dapibus tortor
            nibh sed augue. Integer eu magna sit amet metus fermentum posuere.
            Morbi sit amet nulla sed dolor elementum imperdiet. Quisque
            fermentum. Cum sociis natoque penatibus et magnis xdis parturient
            montes, nascetur ridiculus mus. Pellentesque adipiscing eros ut
            libero. Ut condimentum mi vel tellus. Suspendisse laoreet. Fusce ut
            est sed dolor gravida convallis. Morbi vitae ante. Vivamus ultrices
            luctus nunc. Suspendisse et dolor. Etiam dignissim. Proin malesuada
            adipiscing lacus. Donec metus. Curabitur gravida
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
