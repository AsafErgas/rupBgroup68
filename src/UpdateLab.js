import React from 'react';
import { Text, View,StyleSheet,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';



class UpdateLab extends React.Component {
  static navigationOptions = {  headerStyle: {
    backgroundColor: '#36485f',
}};
  constructor(props) {
    super(props);
    this.updatestatus.bind(this);
    this.checkifuserex.bind(this);
    this.GoBack.bind(this);
  this.params=this.props.navigation.state.params;
    this.state = {
        labfromDB:'',
        username:'',
        statusfromDB:'',
    }
  }
  
  getusername = async () => {
    try {
  
    let test = await AsyncStorage.getItem('usernamelocal');
    this.setState({
      username: JSON.parse(test) 
    });
    } catch(e) {
      alert(e)
    }}

 componentDidMount() {
    this.getusername();
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/getlabtofinish/?finishcode=";
    url += this.params;
        return fetch(url)
        .then(response => response.json())
        .then((response => this.setState({
          labfromDB: response
        })))
        .then(() => {
         this.insertlab();
        
         })
        .catch((error) => {
          console.log(error);
        })
                    }
  
 
                    insertlab=()=>{
                        

                        fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/insertLabfromApp?un='+this.state.username+"&Lid="+this.state.labfromDB[0].LabId+"&wei="+this.state.labfromDB[0].Labweight, {
                      
                          method: 'POST',
                          headers: { "Content-type": "application/json; charset=UTF-8" },
                          body: JSON.stringify({}),
                        })
                          .then(res => res.json())
                          .then(response => { })
                          .catch(error => console.warn('Error:', error.message));
                      this.checkifuserex();
                      
                      }

                      checkifuserex(){

                        url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/ReadstatusforApp/?un=";
                        url+= this.state.username;
                        return fetch(url)
                        .then(response => response.json())
                        .then((response => this.setState({
                          statusfromDB: response
                        })))
                        .then(() => {
                          if (this.state.statusfromDB.length!=0) {
                          this.updatestatus();
                           
                      
                                                       }
                          else{
                              
                            fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/insertlabhourfromapp?un='+this.state.username+"&wei="+this.state.labfromDB[0].Labweight, {
                      
                              method: 'POST',
                              headers: { "Content-type": "application/json; charset=UTF-8" },
                              body: JSON.stringify({}),
                            })
                              .then(res => res.json())
                              .then(response => { })
                              .catch(error => console.warn('Error:', error.message));
                         
                     }
                        
                         })
                        .catch((error) => {
                          console.log(error);
                        })
                    
                    
                    
                    }
                    updatestatus(){
    
                        fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/updatelabstatusfromapp?un='+this.state.username+"&wei="+this.state.labfromDB[0].Labweight, {
                      
                          method: 'POST',
                          headers: { "Content-type": "application/json; charset=UTF-8" },
                          body: JSON.stringify({}),
                        })
                          .then(res => res.json())
                          .then(response => { })
                          .catch(error => console.warn('Error:', error.message));
 
                      }
                      GoBack(){
     
                        this.props.navigation.navigate('Home');
                      }
    
  render(){

  return(
    <View style={{ flex: 1, 
    

      alignItems:'flex-start',
      backgroundColor:'#36485f',
     
      }}>
   <Text style={style1.myText}>שעות המעבדה עודכנו בהצלחה!</Text>
   <View style={{left:130,marginTop:50}} >
   <Button
                style={style1.backButton}
                onPress={this.GoBack.bind(this)}
                title="חזור לדף הבית"
              />
              </View>
    </View>
  )
  }

 
  }
  const style1 = StyleSheet.create ({
    myText: {
      
       textAlign: 'center',
       color: '#66CDAA',
       fontWeight: 'bold',
       fontSize: 20,
       padding:40
    },
    backButton:{
   left:50,
      
    }
  })
export default UpdateLab;