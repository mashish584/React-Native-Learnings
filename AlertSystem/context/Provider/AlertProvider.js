import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Button,
  Animated,
  Dimensions,
} from 'react-native';
import AlertContext from '../AlertContext';

const w = Dimensions.get('window');

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#fafbfc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
});

class AlertProvider extends React.Component {
  state = {
    title: '',
    body: '',
    visible: false,
    contentHeight: 0,
  };

  animated = new Animated.Value(0);

  alert = ({
    title = '',
    body = '',
    display = 'top',
    ctaText = '',
    ctaOnPress = null,
  }) => {
    this.setState({title, body, ctaText, ctaOnPress, display, visible: true});
    Animated.timing(this.animated, {
      toValue: 1,
      useNativeDriver: true,
      duration: 150,
    }).start();
  };

  close = () => {
    Animated.timing(this.animated, {
      toValue: 0,
      useNativeDriver: true,
      duration: 150,
    }).start(() => this.setState({visible: false}));
  };

  renderItem = () => {
    const {title, body} = this.state;
    return (
      <React.Fragment>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </React.Fragment>
    );
  };

  onLayout = ({nativeEvent}) => {
    const height = nativeEvent.layout.height;
    this.setState({contentHeight: height});
  };

  render() {
    const {visible, display, ctaOnPress, ctaText, contentHeight} = this.state;
    const containerStyles = [styles.alertContainer];

    if (display === 'bottom') {
      containerStyles.push(style.bottom);
    } else if (display === 'top') {
      containerStyles.push(styles.top);
      containerStyles.push({
        transform: [
          {
            translateY: this.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [-contentHeight, 0],
            }),
          },
        ],
      });
    } else if (display === 'bottom') {
      containerStyles.push(styles.top);
      containerStyles.push({
        transform: [
          {
            translateY: this.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [contentHeight, 0],
            }),
          },
        ],
      });
    } else if (display === 'modal') {
      containerStyles.push(styles.modal);
      containerStyles.push({
        opacity: this.animated,
        transform: [
          {
            translateY: this.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            }),
          },
        ],
      });
    }

    return (
      <AlertContext.Provider value={{alert: this.alert}}>
        {this.props.children}
        {visible && display === 'modal' && (
          <TouchableWithoutFeedback onPress={this.close}>
            <View style={[styles.modalContainer]}>
              <Animated.View style={[styles.modal, containerStyles]}>
                {this.renderItem()}
              </Animated.View>
              {ctaOnPress && <Button title={ctaText} onPress={ctaOnPress} />}
            </View>
          </TouchableWithoutFeedback>
        )}
        {visible && display !== 'modal' && (
          <TouchableWithoutFeedback
            onPress={this.close}
            onLayout={this.onLayout}>
            <Animated.View style={containerStyles}>
              <SafeAreaView forceInset={{top: 'always'}}>
                {this.renderItem()}
                {ctaOnPress && <Button title={ctaText} onPress={ctaOnPress} />}
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;
