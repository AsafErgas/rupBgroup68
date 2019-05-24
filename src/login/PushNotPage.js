import React, { Component } from "react";
import styles from "./style";
import {Permissions, Notifications} from 'expo';




export default class PushNotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
        token: '',
     
    }
}
async registerForPushNotifications() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync();
  this.subscription = Notifications.addListener(this.handleNotification);
  
  this.setState({
    token: token
  });

  this.updateToken(token);

}


updateToken(token){
    
  fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/UpdateToken?Token='+token+"&username="+this.state.username, {

    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({}),
  })
    .then(res => res.json())
    .then(response => { })
    .catch(error => console.warn('Error:', error.message));

}


  
    } 