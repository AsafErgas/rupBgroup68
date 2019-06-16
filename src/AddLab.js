import React from 'react';
import { Text, View,FlatList,StyleSheet,TextInput,TouchableOpacity,Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';

class AddLab extends React.Component {
  static navigationOptions = {header:null};
  constructor(props) {
    super(props);
    this.updatecurrentnum.bind(this);
    this.params = this.props.navigation.state.params.labs
    this.username=this.props.navigation.state.params.username
    //this.checkverif.bind(this);
    this.state = {
      Clab:'',
      username:'',
      showAlert: false ,
      showAlert2: false ,
      }
    }

    showAlert = () => {
      this.setState({
        showAlert: true
      });}
      showAlert2 = () => {
        this.setState({
          showAlert2: true
        });}
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
      hideAlert2 = () => {
        this.setState({
          showAlert2: false
        });
      };
      componentDidMount() 
      {
        
                }
 updatecurrentnum(){

  fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/addstudenttocounter?lid='+this.params.LabId, {
                
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({}),
  })
    .then(res => res.json())
    .then(response => { })
    .catch(error => console.warn('Error:', error.message));

                }
                
  
       RegToLab(){
         Lid = this.params.LabId
            
          url = 'http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/ifuserreg?un='+this.username+"&Lid="+Lid;
                
           return fetch(url)
           .then(response => response.json())
            .then((response => this.setState({
                 Clab: response
                })))
               .then(() => {
                  if (this.state.Clab.length==0) {
            
                  this.updatestudentlab();
              
                    }
                  else{
              
               this.showAlert();
             }
                
                 })
                .catch((error) => {
                  console.log(error);
                })
                

                 
                
                }
  
         updatestudentlab()
                   {
                   fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/Regtolab?un='+this.username+"&Lid="+this.params.LabId+"&wei="+this.params.Labweight, {
                
                    method: 'POST',
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify({}),
                  })
                    .then(res => res.json())
                    .then(response => { })
                    .catch(error => console.warn('Error:', error.message));
                    this.updatecurrentnum();
               
                this.showAlert2();
                       }

                       goback =()=>{
     
                        this.props.navigation.navigate('LabsSceduling');
                      }
 

    
  render(){
    const { params } = this.props.navigation.state;
    this.state.username = params ? params.username : null;
    const {showAlert} = this.state;
    const {showAlert2} = this.state;
    Moment.locale('en');
    var dt =this.params.Labdate ;
  return(
    
    <View style={styles.form}>
  <Text style={styles.header}>טופס שיבוץ למעבדה</Text>
  <Text style={styles.text}>נושא המעבדה:</Text>
  <Text style={styles.text10}>{this.params.Labtopic}</Text>
  <Text style={styles.text}>פרטי המעבדה:</Text>
  <Text style={styles.text11}>{this.params.Labdetails}</Text>
  <Text style={styles.text1}>תאריך המעבדה:</Text>
  <Text style={styles.text12}>{Moment(dt).format('DD/MM/YYYY')}</Text>
  <Text style={styles.text5}>מיקום המעבדה:</Text>
  <Text style={styles.text13}>{this.params.Lablocation}</Text>
  <Text style={styles.text1}>אחראי המעבדה:</Text>
  <Text style={styles.text14}>{this.params.Director}</Text>
  <Text style={styles.text5}>משקל המעבדה:</Text>
  <Text style={styles.text15}>{this.params.Labweight}</Text>


<Button
                buttonStyle={styles.button}
                onPress={this.RegToLab.bind(this)}
                title="בצע שיבוץ "
              />
               <AwesomeAlert 
          show={showAlert}
          showProgress={false}
          title="אופס!"
          message=' שים לב! כבר שובצת בעבר למעבדה זו, אנא בחר מעבדה אחרת'
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
          title="מאושר"
          message="השיבוץ בוצע בהצלחה"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle={{color:'green'}}
          showConfirmButton={true}
         
          confirmText="חזור"
          confirmButtonColor="#3385ff"
        
          onConfirmPressed={() => {
            this.hideAlert2();
            this.goback();
          }}
        />
 </View>

  ); 
    }
  
    
  } 
    

export default AddLab;
const styles = StyleSheet.create ({
    form: {
      alignSelf: 'stretch',
      flex:1,
      justifyContent:'center',
      backgroundColor:'#36485f',
      paddingLeft:60,
      paddingRight:60,
      alignItems: 'center',
    },
    header: {
     color: '#ffff',
     paddingBottom:5,
    top:-30,
     borderBottomColor:'#199187',
     borderBottomWidth:1,
      fontSize: 25,
      


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
   },
   text1: {
    color: '#ffffff',
    paddingBottom:10,  
    position: 'relative',
    top: -20,
    fontSize: 20,
    writingDirection:'auto',
    left:100
  },
  text: {
    color: '#ffffff',
    paddingBottom:10,  
    position: 'relative',
    top: -20,
    fontSize: 20,
    writingDirection:'auto',
    left:105
  },
  text10: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top: -20,
    fontSize: 18,
    writingDirection:'auto',
    left:105

  },
  text11: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top:-20,
    fontSize: 18,
    writingDirection:'auto',
    left:115

  },
  text12: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top: -20,
     fontSize: 18,
     writingDirection:'auto',
     left:120

  },
  
  text13: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top: -20,
     fontSize: 18,
     writingDirection:'auto',
     left:130

  },
  text14: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top: -20,
     fontSize: 18,
     writingDirection:'auto',
     left:130

  },
  text15: {
    color: '#778899',
    paddingBottom:10,
    position: 'relative',
    top: -20,
     fontSize: 18,
     writingDirection:'auto',
     left:165

  },
  
   text5: {
    color: '#ffffff',
    paddingBottom:10,  
    position: 'relative',
    top: -20,
    fontSize: 20,
    writingDirection:'auto',
    left:100
  }
  
  
  })