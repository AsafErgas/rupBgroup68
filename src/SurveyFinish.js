import React from 'react';
import { Text, View,FlatList,StyleSheet,TextInput,TouchableOpacity,Button, AsyncStorage } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

class SurveyFinish extends React.Component {
  static navigationOptions = {  headerStyle: {
    backgroundColor: '#36485f',
}};
  constructor(props) {
    super(props);
    
     this.updatestatus.bind(this);
     this.updatestudsurveydet.bind(this);
     this.getusername.bind(this);
     this.updatecurrentnum.bind(this);
     this.checkifuserex.bind(this);
     this.GoBack.bind(this);
     this.checkifsurveyex.bind(this);
    this.state = {
      surveyFromDB:'',
      surveyId:'',
      vercode:'',
      time:'',
      username:'',
      statusfromDB:'',
      showAlert: false ,
      showAlert2: false ,
      showAlert3: false ,
      surveydetfromDB:'',
     
                 }
                  }

      componentDidMount() {
    this.getusername();
        
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

      showAlert2 = () => {
        this.setState({
        showAlert2: true
         });}
        hideAlert2 = () => {
       this.setState({
       showAlert2: false
         });
        };

        showAlert3 = () => {
          this.setState({
          showAlert3: true
           });}
          hideAlert3 = () => {
         this.setState({
         showAlert3: false
           });
          };

getusername = async () => {
  try {

  let test = await AsyncStorage.getItem('usernamelocal');
  this.setState({
    username: JSON.parse(test) 
  });
  } catch(e) {
    alert(e)
  }}
updatecurrentnum (){
  fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/Editcurrentnumofans/?sid='+this.state.surveyFromDB.SurveyId, {
  
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({}),
  })
    .then(res => res.json())
    .then(response => {console.log(response);})
    .catch(error => console.warn('Error:', error.message));
  this.showAlert2();
}


  getsurvey(){
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/specsurvey/?sidfromapp=";
    url += this.state.surveyId;
    return fetch(url)
    .then(response => response.json())
    .then((response => this.setState({
      surveyFromDB: response
    })))
    .then(() => {
      if (this.state.surveyFromDB.Verifcode==this.state.vercode) {

   

       this.checkifuserex();
  
      }
      else{
 
   this.showAlert();
 }
    
     })
    .catch((error) => {
      console.log(error);
    })

  }
  checkifsurveyex(){
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/checkifsurveyex/?usern=";
    url += this.state.username;
    url+="&sid=";
    url+=this.state.surveyId;
    return fetch(url)
    .then(response => response.json())
    .then((response => this.setState({
      surveydetfromDB: response
    })))
    .then(() => {
      if (this.state.surveydetfromDB.length==0) {
        this.updatestatus();
       

       
  
      }
      else{
        
        this.showAlert3();
 }
    
     })
    .catch((error) => {
      console.log(error);
    })


  }

checkifuserex(){

    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/ReadstatusforApp/?un=";
    url+=this.state.username;
    return fetch(url)
    .then(response => response.json())
    .then((response => this.setState({
      statusfromDB: response
    })))
    .then(() => {
      if (this.state.statusfromDB.length!=0) {
        this.checkifsurveyex();
       
  
                                   }
      else{
        fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/inserthourfromapp?un='+this.state.username+"&wei="+this.state.surveyFromDB.Surveyweight, {
  
          method: 'POST',
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({}),
        })
          .then(res => res.json())
          .then(response => {console.log(response); })
          .catch(error => console.warn('Error:', error.message));
      this.updatestudsurveydet();
 }
    
     })
    .catch((error) => {
      console.log(error);
    })



}




  updatestatus(){
    
    fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/updatestatusfromapp?un='+this.state.username+"&wei="+this.state.surveyFromDB.Surveyweight, {
  
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(response => {console.log(response); })
      .catch(error => console.warn('Error:', error.message));
  this.updatestudsurveydet();
  }

  updatestudsurveydet(){
    
    fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/insertsurveyfromapp?un='+this.state.username+"&sid="+this.state.surveyFromDB.SurveyId+"&wei="+this.state.surveyFromDB.Surveyweight, {
  
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(response => {console.log(response); })
      .catch(error => console.warn('Error:', error.message));

      this.updatecurrentnum();
  
  }
  

    GoBack(){
     
      this.props.navigation.navigate('Home');
    }
  render(){
    const {showAlert} = this.state;
    const {showAlert2} = this.state;
    const {showAlert3} = this.state;
  return(
    <View style={styles.form}>
  <Text style={styles.header}>טופס סיום שאלון</Text>
 
<TextInput style={styles.textinput} value={this.state.surveyId}  placeholder="מספר זיהוי שאלון " underlineColorAndroid={'transparent'} onChangeText={(surveyId) => this.setState({surveyId})}/>
<TextInput style={styles.textinput} value={this.state.vercode} placeholder="קוד סיום שאלון" underlineColorAndroid={'transparent'} onChangeText={(vercode) => this.setState({ vercode })}/>
<TextInput style={styles.textinput} value={this.state.time} placeholder="זמן מענהד " underlineColorAndroid={'transparent'} onChangeText={(time) => this.setState({ time })}/>

<Button
                buttonStyle={styles.button}
                onPress={this.getsurvey.bind(this)}
                title="שלח לבדיקה"
              />
            
              <AwesomeAlert 
          show={showAlert}
          showProgress={false}
          title="אופס!"
          message="קוד אימות שאלון אינו מתאים לשאלון זה"
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
          <AwesomeAlert 
          show={showAlert2}
          showProgress={false}
          title="עדכון בוצע!"
          message="הפרטים נשמרו במערכת בהצלחה"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle={{color:'green'}}
          showConfirmButton={true}
       
          confirmText="חזור"
          confirmButtonColor="#3385ff"
        
          onConfirmPressed={() => {
            this.hideAlert2();
            this.GoBack();

          }}
        />
         <AwesomeAlert 
          show={showAlert3}
          showProgress={false}
          title="שגיאה!"
          message="מחקר זה נרשם כבר במערכת"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle={{color:'red'}}
          showConfirmButton={true}
       
          confirmText="חזור"
          confirmButtonColor="#3385ff"
        
          onConfirmPressed={() => {
            this.hideAlert3();
           

          }}
        />
       
 </View>
  )    
    }
    
  } 
    

export default SurveyFinish;
const styles = StyleSheet.create ({
    form: {
      alignSelf: 'stretch',
      flex:1,
      justifyContent:'center',
      backgroundColor:'#36485f',
       paddingLeft:60,
       paddingRight:60,
       alignItems: 'center',
       marginTop:-250
    },
    header: {
     color: '#ffff',
     paddingBottom:10,
     marginBottom:40,
     borderBottomColor:'#199187',
     borderBottomWidth:1,
      fontSize: 24,

   },
   textinput: {
alignSelf:'stretch',
height:40,
marginBottom:30,
color: '#ffff',
borderBottomColor:'#f8f8f8',
borderBottomWidth:1,
   },
   button: {
alignSelf:'stretch',
alignItems:'center',
padding:20,
backgroundColor:'#59cbbd',
marginTop:30,
   },
   btntext:{
       color:'#fff',
       fontWeight:'bold',
   }
  
  
  })