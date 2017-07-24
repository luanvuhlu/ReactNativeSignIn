import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native';

class MainApp extends Component {
    render(){
        return (
            <View>
                <Text style={styles.lblHello}>Hello world</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lblHello: {
        color: 'red',
        fontSize: 50,
    }
})
export default MainApp;