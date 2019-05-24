import React, { Component } from 'react';
import {Permissions, Notifications} from 'expo';
import { Button,Icon } from 'react-native-elements';
import { Platform, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity,Slider,Image } from 'react-native';


class Accordion_Panel extends React.Component {
 
  constructor(props) {
    super(props);
  
    this.state = {
    updated_Height: 0,
    Cindex:[],
    username:''
    
    }
  }

  componentWillReceiveProps(update_Props) {
    if (update_Props.item.Expanded) {
      this.setState(() => {
        return {
          updated_Height: null,
          Cindex : update_Props.item,
          CindexTest:update_Props.item
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
 
          <Text style={styles.Panel_Button_Text}>{this.props.item.SurveyId} </Text>
 
        </TouchableOpacity>
 
        <View style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
 
          <Text style={styles.Panel_text}>
 
           משקל: {this.props.item.Surveyweight}

 
          </Text>
          
         
        </View>
      </View>
    );
  }
}


class SurveyHistory extends React.Component {
  static navigationOptions = {header:null};
  constructor(props) {
    super(props);
  
    this.state = {
      username:'',
      Survey:[],
      Cindex:-1
      
    }
  }
  componentDidMount() {
              url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/allsurveydetails/?usern=";
              url += this.state.username;

            fetch(url)
            .then(res=>res.json())
            .then(Survey=>{
              this.setState({Survey});
            });
                    }
                    update_Layout = (index) => {

                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                                          
                      const array2 = this.state.Survey.map((item) => {
                                                          
                      const newItem = Object.assign({}, item);
                                                           
                      newItem.Expanded = false;
                                        
                                            
                     return newItem;
                           });
                            if(this.state.Cindex==index)
                                 {
                             this.setState(() => {
                               return {
                                Survey : array2, 
                                Cindex:-1,
                                    }
                                     });
                                         } 
                         else
                          {
                            array2[index].Expanded = true;
                                                          
                             this.setState(() => {
                               return {
                                 Survey : array2, 
                                 Cindex:index  
                                      }
                              });
                           } 
                                         
                                         
                                        
                        }                 
 

 


  render(){
    const { params } = this.props.navigation.state;
    this.state.username = params;
     
   
return(
 
  
  <View style={{ flex: 1, 
    flexDirection: 'row',
  
    justifyContent: 'flex-end',
    alignItems:'flex-start',
    backgroundColor:'#36485f'
    }}>
 <View>
 

<Image style={{width: 60, height:60, marginTop:50,left:30}}
          source={require('../src/images/Rupinicon.png')}
        />
 </View>

<View style={styles.MainContainer}>
<Text style ={styles.hometext}> השאלונים שלי:</Text>
<ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
   {
     this.state.Survey.map((item, key) =>
       (
         <Accordion_Panel key={key} propsTest={this.props} onClickFunction={this.update_Layout.bind(this.props, key)} item={item}   />
       ))
   }
</ScrollView>
</View>
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
      flex: 1,
     justifyContent: 'center',
      left:-10,
      top:50,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
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
      left:-10
    },
   
    Btn: {
      padding: 10,
      backgroundColor: '#8FBC8F',
      
    },
    hometext: {
    
     left:0,
     top:5,
     color: '#ffff',
     paddingBottom:10,
     marginBottom:40,
     fontSize: 24,
      
  
   },

   hometext2: {
    
    left:10,
    top:5,
    color: '#ffff',
    paddingBottom:10,
    marginBottom:40,
    borderBottomColor:'#199187',
    borderBottomWidth:1,
    
    fontSize: 21,
    textAlign: 'center',
 
  },
  button: {
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:'#A9A9A9',
    marginTop:30,
    textAlign: 'center',
    top:10,
    left:90
    
       },
       btntext:{
           color:'#fff',
           fontWeight:'bold',
       },
  })
export default SurveyHistory;