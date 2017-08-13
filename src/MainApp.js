import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Orientation from 'react-native-orientation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import LoginScreen from './screens/LoginScreen';
registerScreens();

class MainApp extends Component {
    componentWillMount(){
        this.props.navigator.push({
            screen: 'example.PushedScreen',
            title: 'Pushed Screen'
        });
    }
    render(){
        return (<LoginScreen />);
    }
}

export default MainApp;