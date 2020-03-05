import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import AlertContext from '../AlertContext';

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
  };

  alert = ({
    title = '',
    body = '',
    display = 'top',
    ctaText = '',
    ctaOnPress = null,
  }) => {
    this.setState({title, body, ctaText, display, visible: true});
  };

  close = () => {
    this.setState({visible: false});
  };

  render() {
    const {title, body, visible, display} = this.state;
    const containerStyles = [styles.alertContainer];

    if (display === 'bottom') {
      containerStyles.push(style.bottom);
    } else if (display === 'top') {
      containerStyles.push(styles.top);
    } else {
      containerStyles.push(styles.modal);
    }

    return (
      <AlertContext.Provider value={{alert: this.alert}}>
        {this.props.children}
        {visible && display === 'modal' && (
          <TouchableWithoutFeedback onPress={this.close}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        {visible && display !== 'modal' && (
          <View style={containerStyles}>
            <SafeAreaView>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.body}>{body}</Text>
            </SafeAreaView>
          </View>
        )}
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;
