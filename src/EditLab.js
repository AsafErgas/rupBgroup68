
import React, { Component } from 'react';
import {Permissions, Notifications} from 'expo';
import { Button,Icon } from 'react-native-elements';
import { Platform, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity,Slider,Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

class Accordion_Panel extends React.Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
    updated_Height: 0,
    Cindex:[],
    username:'',
  
    
    }
  }
 
  componentWillReceiveProps(update_Props) {
    if (update_Props.item.Expanded) {
      this.setState(() => {
        return {
          updated_Height: null,
     
        }
      });
    }
    else {
      this.setState(() => {
        return {
          updated_Height: 0
        }
      });
    }
  }
 
  shouldComponentUpdate(update_Props, nextState) {

    if (update_Props.item.Expanded !== this.props.item.Expanded) {
      return true;
    }
 
    return false;
  }
  
  render() {
   
    return (  
      <View style={styles.Panel_Holder}>
 
        <TouchableOpacity  activeOpacity={0.7} onPress={this.props.onClickFunction} style={styles.Btn}>
 
          <Text style={styles.Panel_Button_Text}>{this.props.item.Labtopic} </Text>
 
        </TouchableOpacity>
 
        <View style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
 
          <Text style={styles.Panel_text}>
 
            {this.props.item.Labdetails}

 
          </Text>
          
          <Button


  onPress={this.props.onClickFunction2}
 
  title="לחץ להסרת שיבוץ"
  color="#000000" 
  backgroundColor='#A9A9A9'
  padding='10'
/>        
        </View>
      </View>
    );
  }
}


class EditLab extends React.Component {
  static navigationOptions = {header:null};
  constructor(props) {
    super(props);
    this.username=this.props.navigation.state.params.username
    this.state = {
      username:'',
      Labs:[],
      Clab:[],
      showAlert: false ,
      Cindex:-1
    }
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
              url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/ReadRegLab?un=";
              url += this.username;
            fetch(url)
            .then(res=>res.json())
            .then(Labs=>{
              this.setState({Labs});
            });
                    }
                    update_Layout = (index) => {


 
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                         
                      const array2 = this.state.Labs.map((item) => {
                                                             
                      const newItem = Object.assign({}, item);
                                                             
                      newItem.Expanded = false;
                                          
                                              
                      return newItem;
                      });
                          if(this.state.Cindex==index)
                      {
                          this.setState(() => {
                          return {
                          Labs : array2, 
                          Cindex:-1,
                         }
                     });
                        } 
                         else
                        {
                         array2[index].Expanded = true;
                                                            
                         this.setState(() => {
                         return {
                         Labs : array2, 
                        Cindex:index  
                          }
                        });
                           } 
                     }                 
 

    update_Layout2 = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
    const array3 = this.state.Labs[index]
    const Lid = array3.LabId

    fetch("http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/deletereglab?un="+this.username+"&Lid="+Lid, {
                
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(response => { })
      .catch(error => console.warn('Error:', error.message));
this.showAlert();
    
    
   
   }
   goback =()=>{
     
    this.props.navigation.navigate('LabsSceduling');
  }
  render(){
    
    const {showAlert} = this.state;
   
return(
  
  <View style={{ flex: 1, 
    // flexDirection: 'row',
    justifyContent:'center',
    alignItems:'flex-start',
    backgroundColor:'#36485f',
    alignItems: 'center',
    alignSelf: 'stretch',
    
    }}>
 <View>
 <Text style ={styles.hometext}> מעבדות ששובצת</Text>

 <Image style={{width: 50, height:50, marginTop:-320,left:-50}}
          source={require('../src/images/Rupinicon.png')}
        />
 </View>

<View style={styles.MainContainer}>

 
   {
     this.state.Labs.map((item, key) =>
       (
         <Accordion_Panel key={key} propsTest={this.props} onClickFunction={this.update_Layout.bind(this.props, key)} item={item} onClickFunction2={this.update_Layout2.bind(this, key)}  />
       ))
   }

</View>
 <AwesomeAlert 
          show={showAlert}
          showProgress={false}
          title="אישור!"
          message="השיבוץ למעבדה בוטל"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle={{color:'green'}}
          showConfirmButton={true}
         
          confirmText="חזור"

          confirmButtonColor="#3385ff"
        
          onConfirmPressed={() => {
            this.hideAlert();
            this.goback();
          }}
        />
</View>
); 
 }

  }

  const styles = StyleSheet.create ({
    myText: {
       marginTop: 10,
       textAlign: 'center',
       color: 'red',
       fontWeight: 'bold',
       fontSize: 20,
       padding:40
    },
    MainContainer: {
      // flex: 1,
      // justifyContent: 'center',
       
      //  top:100,
       
      //  position:'relative',
      //  paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
   
    Panel_text: {
      fontSize: 18,
      color: '#F0F8FF',
      padding: 10,
      textAlign: 'center' 
    },
   
    Panel_Button_Text: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 21
    },
   
    Panel_Holder: {
      borderWidth: 1,
      borderColor: '#fff',
      marginVertical: 5,
     top:-100
      
      
    },
   
    Btn: {
      padding: 10,
      backgroundColor: '#8FBC8F',
      
    },
    hometext: {
    
     left:30,
     top:-220,
     color: '#ffff',
     paddingBottom:10,
     marginBottom:40,
     borderBottomColor:'#199187',
     borderBottomWidth:1,
     fontSize: 24,
      
  
     
   },

   hometext2: {
    

    top:60,
    color: '#ffff',
    paddingBottom:10,
    marginBottom:40,
    
    fontSize: 21,
    textAlign: 'center',
 
  
  },
  button: {
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:'#59cbbd',
    marginTop:30,
    textAlign: 'center',
    top:-10,
    
       },
       btntext:{
           color:'#fff',
           fontWeight:'bold',
       },
  })
export default EditLab;