import React from 'react';
import AlertContext from '../AlertContext';

class AlertProvider extends React.Component {
  state = {};

  alert = ({
    title = '',
    body = '',
    display = 'bottom',
    ctaText = '',
    ctaOnPress = null,
  }) => {
    alert('body');
  };

  render() {
    return (
      <AlertContext.Provider value={{alert: this.alert}}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;
