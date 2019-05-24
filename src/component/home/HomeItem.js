import React, {Component} from 'react';
import {View,Image,Text, StyleSheet,TouchableWithoutFeedback} from 'react-native';
// import PropTypes from 'prop-types';

// const propTypes ={
// item: PropTypes.object
// };



class HomeItem extends React.Component{
    constructor(props){
        super(props);
        this.renderDetails.bind(this);
        this.onPressing.bind(this);
        // this.renderTopic.bind(this);
     this.state={
    isSelected: false
          }
    }

renderDetails=()=>{
  return(  <View>
    <Text style ={style.des}>description</Text>
        </View>)
};
 onPressing=()=>{
     
return(
this.setState((prevState, props) => ({
    isSelected: !prevState.isSelected
  })))


 };
 
// renderTopic=()=>{
//     this.props.os.map(function(element){
//     return(
// <TouchableWithoutFeedback onPress={this.onPressing}>
//     <View style={style.titleContainer}>
//     <Text style={style.title}>{element.Topic}</Text>
// <Image source={require('./icons8-sort-down-filled-50.png')} style={style.image}/>
//     </View>
// </TouchableWithoutFeedback>
//     )
//     })

// }




render(){
  
    return(
       
        <View style ={style.container}>
        
<TouchableWithoutFeedback onPress={this.onPressing}> 
   <View style={style.titleContainer}>
   <Text style={style.title}>{this.props.os[0].Topic}</Text> 
  {/* <Image source={require('./icons8-sort-down-filled-50.png')} style={style.image}/> */}
    </View>
  </TouchableWithoutFeedback>



{this.state.isSelected && this.renderDetails()}

        </View>
    )
}

}
// HomeItem.propTypes=propTypes;
export default HomeItem;
const style = StyleSheet.create({
    container: {
      flex: 1,
     flexDirection:'column',
     margin:10
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    image:{
        width:20,
        height:20

    },
    title:{
        flex:1,
        fontSize:22
    },
    des:{
        flex:1,
        fontSize:15,
        paddingTop:10,
        color:'gray',
        height:80
    }
  });