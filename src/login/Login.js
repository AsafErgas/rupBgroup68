import React, { Component } from "react";

import Style from './Style.js'
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView,Image } from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';


class Login extends React.Component {
  static navigationOptions = {
    title: 'LOGIN',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#36485f',
  
  },
  

    
}
  constructor(props) {
    super(props);
    // this.checkStud= this.checkStud.bind(this);
    this.state = {
      username: '',
      password: '',
      personFromDB:'',
      showAlert: false ,
    };
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });}
    hideAlert = () => {
      this.setState({
        showAlert: false
      });
    };

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  GoHomepage = (username) => {
    this.props.navigation.navigate('Home', {username:username});
  }
  onLoginPress() {

    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/student/?Username=";
    url += this.state.username;
    url += "&Password=";
    url += this.state.password;
    return fetch(url)
      .then(response => response.json())
      .then((response => this.setState({
        personFromDB: response
      })))
      .then(() => {
      
        if ((this.state.personFromDB.Message=="An error has occurred.")||(this.state.personFromDB[0].Ise==false)) {
          //  alert('Incorrect UserName or Password');
          this.showAlert();
        
          
        }
         else{
          this.GoHomepage(this.state.username);
         }
       })
      .catch((error) => {
        console.log(error);
      })

  }

  render() {
    const {showAlert} = this.state;
    return (
      
      <KeyboardAvoidingView style={Style.containerView} behavior="padding">
 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Style.loginScreenContainer}>
            <View style={Style.loginFormView}>
              <Text style={Style.logoText}>MySurveyApp</Text>
              <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username })} placeholder="שם משתמש" placeholderColor="#c4c3cb" style={Style.loginFormTextInput} />
              <TextInput value={this.state.password} onChangeText={(password) => this.setState({ password })} placeholder="סיסמא" placeholderColor="#c4c3cb" style={Style.loginFormTextInput} secureTextEntry={true} />
              <Button
                buttonStyle={Style.loginButton}
                onPress={this.onLoginPress.bind(this)}
                title="התחבר"
              />
             
            </View>
          </View>
        </TouchableWithoutFeedback>
        <AwesomeAlert 
          show={showAlert}
          showProgress={false}
          title="אופס!"
          message="שם המשתמש או הסיסמא שגויים"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle={{color:'red'}}
          showConfirmButton={true}
         
          confirmText="חזור"
          confirmButtonColor="#3385ff"
        
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
       
      </KeyboardAvoidingView>
 
     
    );
  }

}
export default Login;

