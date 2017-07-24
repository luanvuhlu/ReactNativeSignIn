
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainApp from './src/MainApp';

export default class ReactNativeSignIn extends Component {
  render() {
    return (
      <MainApp />
    );
  }
}

AppRegistry.registerComponent('ReactNativeSignIn', () => ReactNativeSignIn);
