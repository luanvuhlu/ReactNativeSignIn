import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    Text,
    TextInput,
    Alert,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class MainApp extends Component {
    constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

     this.login = this.login.bind(this);
     this._signIn = this._signIn.bind(this);
  }

  componentDidMount() {
      this._setupGoogleSignin();
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
        Alert.alert(
            'Alert Title',
            '['+this.state.email+', '+this.state.password+']',
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
                        justifyContent: 'center', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        backgroundColor: 'steelblue'}}>
            <Text style={{fontSize: 50}}>Sign in</Text>
            <View>
                <TextInput
                name="email"
                keyboardType="email-address"
                placeholderTextColor='white'
                style={{height: 50, width: 200, color: 'white'}}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})} />
            <TextInput
                name="password"
                secureTextEntry={true}
                placeholderTextColor='white'
                style={{height: 50, color: 'white'}}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                />
            <Button title="Login" onPress={this.login} />
            <GoogleSigninButton
                style={{width: 48, height: 48}}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn.bind(this)}/>
            </View>
           
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