import React, {Component} from 'react';
import {View,FlatList,Text, StyleSheet,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import HomeItem  from './HomeItem';
import {ListItem} from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';




class Home extends React.Component{
    
constructor(props){
    super(props);
    this.renderDetails.bind(this);
    this.onPressing.bind(this);
    this.readopensurvey.bind(this);
  
    this.state = {
        username:'',
       opensurvey:[],
       amount:0,
       status:[],
       isSelected:false,
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

readopensurvey(){
    url = "http://proj.ruppin.ac.il/bgroup68/test1/tar4/api/opensurvey/?Isopen=1";
         

          fetch(url)
          .then(res=>res.json())
          .then(opensurvey=>{
            this.setState({opensurvey});
      
          });
      
  }
  componentDidMount() {
   
   
       this.readopensurvey();                 
    
    
        }
        renderDetails=()=>{
          return(  <View>
            <Text style ={style.des}>fdgfdgdff</Text>
                </View>)
        };
         onPressing=()=>{
             
        return(
        this.setState((prevState, props) => ({
            isSelected: !prevState.isSelected
          })))
        
        
         };





    // renderItem=()=><HomeItem os={this.state.opensurvey}/>
    render(){
      const {showAlert} = this.state;
        return(
        <View style ={style.container}>
       <Text>I'm AwesomeAlert</Text>
        <TouchableOpacity onPress={() => {
          this.showAlert();
        }}>
          <View >
            <Text >Try me!</Text>
          </View>
        </TouchableOpacity>
     <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
{/* <FlatList data={this.state.opensurvey} renderItem={this.renderItem} keyExtractor={(index, _)=>index + ''}></FlatList> */}
{/* {
    this.state.opensurvey.map((l, i) => (
      <View>
 
      <TouchableWithoutFeedback onPress={this.onPressing}> 
      <ListItem
        key={i}
        leftAvatar={{source:require('./icons8-sort-down-filled-50.png')}}
        title={l.Topic}
        // subtitle={l.Link}
  

    
  
      />
     
      </TouchableWithoutFeedback> 
       {this.state.isSelected && this.renderDetails()}
      </View>
     ) ) }    */}
        </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:50
    },

    list:{
      height:100,
    }
  });
  export default Home;