import React, { Component } from 'react';
import { Button,Icon } from 'react-native-elements';
import { Platform, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity,Slider,Image } from 'react-native';


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
 
          <Text style={styles.Panel_Button_Text}>{this.props.item.Labtopic} </Text>
 
        </TouchableOpacity>
 
        <View style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
 
          <Text style={styles.Panel_text}>
 
            {this.props.item.Labdetails}

 
          </Text>
          
 <Button
  onPress={this.props.onClickFunction2}
  title="לחץ לפרטים ולשיבוץ"
  color="#ffff" 
  backgroundColor="#A9A9A9"
  padding='10'
/>        
        </View>
      </View>
    );
  }
}


class LabsScheduling extends React.Component {
  static navigationOptions = {header:null};
  constructor(props) {
    super(props);
  
    this.state = {
      username:'',
      Labs:[],
     Cindex:-1,
    }
  }
 componentDidMount() {
              url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/allLabs";
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
    const userN = this.state.username
    this.props.navigation.navigate('AddLab',{labs :array3, username: userN });
   }
   EditLab = () => {
    const userN2 = this.state.username
    this.props.navigation.navigate('EditLab', {username:userN2});
  }

  render(){
    const { params } = this.props.navigation.state;
    this.state.username = params;
     
   
return(
 
  
  <View style={{ flex: 1, 
    flexDirection: 'row',
    width:450,
    justifyContent: 'flex-end',
    alignItems:'flex-start',
    backgroundColor:'#36485f'
    }}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
 <View>
 
             <Button
                buttonStyle={styles.button}
                onPress={this.EditLab}
                title=" צפה בשיבוצים שלך "
              />

<Image style={{width: 50, height:50, marginTop:-65,left:10}}
          source={require('../src/images/Rupinicon.png')}
        />
 </View>

<View style={styles.MainContainer}>
<Text style ={styles.hometext2}> מעבדות פתוחות לשיבוץ</Text>
 
   {
     this.state.Labs.map((item, key) =>
       (
         <Accordion_Panel key={key} propsTest={this.props} onClickFunction={this.update_Layout.bind(this.props, key)} item={item} onClickFunction2={this.update_Layout2.bind(this, key)}  />
       ))
   }
 
</View>
</ScrollView>
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
      left:-140,
      top:50,  
      position:'relative',
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
      left:170,
      width:300,
      top:-50
      
    },
   
    Btn: {
      padding: 10,
      backgroundColor: '#8FBC8F'
    },
    hometext: {
    
     left:100,
     top:40,
     color: '#ffff',
     paddingBottom:10,
     marginBottom:40,
     borderBottomColor:'#199187',
     borderBottomWidth:1,
     fontSize: 24,
      
  

   },
   contentContainer: {
    paddingVertical: 75,
    
    backgroundColor:'#36485f'
    }, 

   hometext2: {
    top:-30,
    color: '#ffff',
    paddingBottom:10,
    marginBottom:40,
    fontSize: 21,
    textAlign: 'center',
    left:125
  },

  button: {
    alignItems:'center',
    padding:15,
    backgroundColor:'#A9A9A9',
    marginTop:30,
    textAlign: 'center',
    top:-10,
    left:90,
    width:225
       },

       btntext:{
           color:'#fff',
           fontWeight:'bold',
       },
  })
export default LabsScheduling;