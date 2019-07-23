import React from 'react';
import { StyleSheet} from 'react-native';
import HomePage from './src/HomePage.js';
import Login from './src/login/Login.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ThemeProvider } from 'react-native-material-ui';
import Barcode from './src/component/home/Barcode.js';
import SurveyFinish from './src/SurveyFinish';
import SurveyHistory from './src/SurveyHistory.js';
import LabsSceduling from './src/LabsScheduling';
import UpdateLab from './src/UpdateLab';
import AddLab from './src/AddLab';
import EditLab from './src/EditLab';

class App extends React.Component {

  render() {
    return (
     
      <ThemeProvider>
       <AppNavigator />
      </ThemeProvider>
   
     
    );
  }

 
}


const AppNavigator = createStackNavigator(
  {
    
    Login: Login,
    Home: HomePage,
    SurveyFinish: SurveyFinish,
    SurveyHistory: SurveyHistory,
    LabsSceduling: LabsSceduling,
    Scanner: Barcode,
    UpdateLab:UpdateLab,
    AddLab : AddLab,
    EditLab:EditLab,
   
  }
 
);

export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});


