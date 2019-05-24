import React, { Component } from 'react';
import {Permissions, Notifications} from 'expo';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Button,Icon } from 'react-native-elements';
import { StackedBarChart } from 'react-native-svg-charts';
import { Platform,AsyncStorage, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, RefreshControl,Image,Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {NavigationEvents} from 'react-navigation';
 class Accordion_Panel extends Component {
 
  constructor() {
   super();
   this.state = {
 
 updated_Height: 0
 
    }
  }
 
  componentWillReceiveProps(update_Props) {
    if (update_Props.item.Expanded) {
      this.setState(() => {
        return {
          updated_Height: null
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
      
        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onClickFunction} style={styles.Btn}>
 
          <Text style={styles.Panel_Button_Text}>{this.props.item.Topic} </Text>
 
        </TouchableOpacity>
 
        <View style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
 
          <Text style={styles.Panel_text}>
            {this.props.item.Details}
          </Text>

          <Text style={styles.Panel_text2}> משקל שאלון - {this.props.item.Surveyweight}</Text>
          
          <Button
                buttonStyle={styles.button}
                onPress={this.props.onClickFunction2}
                title="התחל מענה"
              />
        </View>
 
      </View>
 
    );
  }
}

 
export default class App extends Component {
 
      static navigationOptions = { header: null };
 
  constructor(props) {
    super(props);
    this.unlocal.bind(this);
    if (Platform.OS === 'android') {
 
      UIManager.setLayoutAnimationEnabledExperimental(true)
 
    }

    this.state = {
      username:'',
        token: '',
     Survey:[],
     amount:0,
     status:[],
     isSelected:false,
     refreshing: false,
     
    };


  }
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  };


  readopensurvey(){
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/opensurvey/?Isopen=1";
         

    fetch(url)
     .then(res=>res.json())
     .then(Survey=>{
       this.setState({Survey});
     }); 
  }

  getdata=()=>{
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/statusspecstudent/?un=";
    url += this.state.username;

   fetch(url)
   .then(res=>res.json())
   .then(amount=>{
     this.setState({amount});
   }); 
  }
  componentDidMount(){
    console.log('object')
    this.registerForPushNotifications();
    this.readopensurvey();
    this.getdata();
   
  }
  GoSurveyHistory = (username) => {
    this.hideMenu();
    this.props.navigation.navigate('SurveyHistory',this.state.username);
  };
  GoSurveyFinish = (username) => {
    this.hideMenu();
    this.unlocal();
    this.props.navigation.navigate('SurveyFinish');
  }
  GoLabs = (username) => {
    this.hideMenu();
    this.props.navigation.navigate('LabsSceduling',this.state.username);
  }
  GoScan = () => {
      
    this.hideMenu();
    this.unlocal();
    this.props.navigation.navigate('Scanner');
 
  };
  unlocal = async () => {
           try {
            AsyncStorage.setItem('usernamelocal',JSON.stringify(this.state.username));
          } catch(e) {
            alert(e)
          }
        
         console.log('Done.')
         }

  logout = () => {
    this.hideMenu();
    this.props.navigation.navigate('Login');
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
  
    fetch('http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/edittoken?Token='+token+"&username="+this.state.username, {
  
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(response => {console.log(response); })
      .catch(error => console.warn('Error:', error.message));
  
  }

  StartAnswer = (index) => 
  {
    const LinkArr =  this.state.Survey[index]
    Clink = LinkArr.Link
    Linking.openURL(Clink).catch((err) => console.error('An error occurred', err));
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
 
  render() {
    const { params } = this.props.navigation.state;
    this.state.username = params ? params.username : null;
    
    const data = [
     {
         
         apples: this.state.amount,
         bananas: 10-this.state.amount,
        
     }
 ]


 const colors = [ '#00ff00', '#ff1a1a' ]
 const keys   = [ 'apples', 'bananas' ]
    return (
    

<View style={{ flex: 1, 
  flexDirection: 'row',
  
  justifyContent: 'flex-end',
  alignItems:'flex-start',
  backgroundColor:'#36485f',
 
  }}>
    <NavigationEvents onDidFocus={() => this.getdata()} />
<ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical:5}}>

 <Menu 
          ref={this.setMenuRef}
          button={<MaterialIcons name="reorder" onPress={this.showMenu} style ={styles.menu}/>}
          style={{left:152,width:200}}
        >

          <MenuItem style ={styles.tab} onPress={this.hideMenu} onPress={this.GoSurveyHistory} >היסטורית שאלונים</MenuItem>
          <MenuItem style ={styles.tab} onPress={this.hideMenu} onPress={this.GoSurveyFinish} >טופס סיום שאלון</MenuItem>
          <MenuItem style ={styles.tab} onPress={this.hideMenu} onPress={this.GoLabs} >שיבוץ למעבדות</MenuItem> 
          <MenuItem style ={styles.tab} onPress={this.hideMenu} onPress={this.GoScan} >סריקה</MenuItem> 
          <MenuItem style ={styles.tab} onPress={this.logout}>התנתק מהמערכת</MenuItem>
        </Menu> 
        <Image style={{width: 70, height:70, marginTop:-55,left:9}}
          source={require('../src/images/Rupinicon.png')}
        />
       
<Text style ={styles.hometext}>ברוכים הבאים</Text>

<View>

<Text style ={styles.statustext}>סטטוס התקדמות:</Text>


   <StackedBarChart
                style={ { height: 100,width:300,marginTop:-30, left:30 } }
                keys={ keys }
                colors={ colors }
                data={ data }
                showGrid={ true }
                horizontal={true}
                contentInset={ { top: 30, bottom: 30 } }
            ></StackedBarChart>
<Text style ={styles.statustext2}>סה"כ שעות שבוצעו {this.state.amount} מתוך 10 </Text>
<Text style ={styles.hometext2}>סקרים פתוחים:</Text>

<View style={styles.MainContainer}>
 
 
   {
     this.state.Survey.map((item, key) =>
       (
         <Accordion_Panel key={key} onClickFunction={this.update_Layout.bind(this, key)} item={item}
         onClickFunction2={this.StartAnswer.bind(this, key)} />
       ))
   }

       </View>

       </View>
       </ScrollView>
       </View>

        );
  }
}
 
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    left:0,
    position:'relative',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  button: {
    
    alignItems:'center',
    padding:20,
    backgroundColor:'#66CDAA',
    marginTop:30,
    
       },
 
  Panel_text: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
    textAlign: 'center' 
  },
 
  Panel_text2: {
    fontSize: 16,
    color: '#fff',
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
    marginVertical: 5
  },
 
  Btn: {
    padding: 10,
    backgroundColor: '#8FBC8F'
  },
  hometext: {
    
   left:3,
   marginTop: 0,
   color: '#ffff',
   paddingBottom:10,
   marginBottom:40,
   borderBottomColor:'#199187',
   borderBottomWidth:1,
    fontSize: 24,
    textAlign:'center',
    


 },
 statustext: {
   writingDirection:'rtl',
  marginTop:2,
  alignSelf:'stretch',
height:40,
color: '#ffff',
left:-8

},
statustext2: {
 writingDirection:'rtl',
marginTop: -13,
alignSelf:'stretch',
height:40,
right:5,
color: '#ffff',
left:-8

},
hometext2: {
 position:'relative',
left:-8,
marginTop: 20,
color: '#ffff',
paddingBottom:0,
marginBottom:5,
fontSize: 20,
 

},

 menu:{
  fontSize:35,
  marginTop:55,
color: '#66CDAA',
left:300,

 },
 tab:{
  borderWidth: 1,
  borderColor:'black',
  backgroundColor:'#66CDAA',

 }

 
});