import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import {Orientation} from 'react-native-orientation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', orientation: 'PORTRAIT'};

     this.login = this.login.bind(this);
     this._signIn = this._signIn.bind(this);
  }

  
  componentWillMount() {
      const initial = Orientation.getInitialOrientation();
      this.setState({
          orientation: initial
      });
      console.log(initial);
      if(initial === 'PORTRAIT'){
        
      }else{

      }
  }

  componentDidMount() {
      this._setupGoogleSignin();
    //   Orientation.lockToPortrait();
        // Orientation.lockToLandscape();
      Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) =>{
      console.log(orientation);
      this.setState({
          orientation: orientation
      });
    if (orientation === 'LANDSCAPE') {
    // do something with landscape layout
    } else {
    // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
  
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '603421766430-60og8n04mebic8hi49u1mrcmcdmugnd5.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }
  _signIn(){
      GoogleSignin.signIn()
        .then((user) => {
        console.log(user);
        this.setState({user: user});
        })
        .catch((err) => {
        console.log('WRONG SIGNIN', err);
        })
        .done();
  }
  login() {
        const {email, password, orientation} = this.state;
        Alert.alert(
            'Alert Title', 
            `[${email}, ${password}, ${orientation}]`,
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }
    render(){
        return (
        <View style={{flex: 1,  
                        backgroundColor: 'steelblue'}}>
            <Text style={{ 
                           padding: 20, 
                           color: '#fff', 
                           fontSize: 50, 
                         }}>
                Sign in
            </Text>
            <ScrollView style={{
                                padding: 10,    
                                }}>
                <TextInput
                name="email"
                keyboardType="email-address"
                placeholderTextColor='white'
                style={{height: 50, marginBottom: 10, color: 'black'}}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})} />
            <TextInput
                name="password"
                secureTextEntry={true}
                placeholderTextColor='white'
                style={{height: 50, marginBottom: 20, color: 'black'}}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                />
            <TouchableOpacity onPress={this.login} style={{ 
                           backgroundColor: 'white', 
                           borderRadius: 3, 
                           padding: 12, 
                           flex: 1,
                            marginBottom: 20, 
                         }}>
                <Text style={{ 
                           textAlign: 'center', 
                           color: 'black', 
                           fontSize: 16, 
                         }}>Save</Text>
            </TouchableOpacity>
            <View style={{
                        alignItems: 'center'
                        }}>
                <GoogleSigninButton
                style={this.state.orientation === 'PORTRAIT' ? styles.btnGPortrait : styles.btnGLandscape }
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn.bind(this)}/>
            </View>
            </ScrollView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    lblHello: {
        color: 'red',
        fontSize: 50,
    },
    btnGPortrait: {
        width: '40%', 
        height: 48,
    },
    btnGLandscape: {
        width: '30%', 
        height: 48
    }
    
});

export default LoginScreen;