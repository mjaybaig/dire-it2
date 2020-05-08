import React from "react" 
import {Platform} from "react-native";

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {Icon} from 'react-native-elements'

import Colors from "../constants/Color"
import MainScreen from "../Screens/MainScreen"
import MachineListScreen from "../Screens/MachineListScreen"
import MachineDetailScreen from "../Screens/MachineDetailScreen"
import MachinePrecautions from "../Screens/MachinePrecautions" 
import HospitalScreen from "../Screens/HospitalScreen"
import ShowDirectionScreen from "../Screens/ShowDirectionScreen"
import CameraScreen from "../Screens/CameraScreen"
import NewsScreen from "../Screens/NewsScreen"

const defaultStackOption = {
    headerStyle:{
      backgroundColor: Colors.hedTint,
     
  
      // Platform.OS === "android" ?Colors.primaryColor: ""
    },
    headerTintColor:"white"
    //Platform.OS == "android" ? "white" : Colors.primaryColor
  }
  
//Main Navigator Stack navigation 
const DireNavigator = createStackNavigator({
    FirstScreen : MainScreen,
    Hospitals:HospitalScreen,
    ShowDirection:ShowDirectionScreen,
    MachineList: MachineListScreen,
    MachineDetail : MachineDetailScreen,
    Camera:CameraScreen,
    MachinePrecautions: MachinePrecautions,
    News: NewsScreen

},{
    defaultNavigationOptions: defaultStackOption
})

//Bottom tab navigation when user clicks on list screen
const TabListNavigator = createStackNavigator({
  MachineList: MachineListScreen,
  MachineDetail : MachineDetailScreen,
  MachinePrecautions: MachinePrecautions


},{
  defaultNavigationOptions: defaultStackOption
})

//Bottom Tab navigation when user clicks on camera screen
const TabCamNavigator = createStackNavigator({
  Camera:CameraScreen,

},{
  defaultNavigationOptions: defaultStackOption
})
//Buttom Tab bavigation when user clikcs on Maps screen
const TabMapNavigator = createStackNavigator({
  Hospital:HospitalScreen,
  ShowDirection:ShowDirectionScreen
},{
  defaultNavigationOptions: defaultStackOption
})

const TabsScreenConfig = {
  Home: {
    screen: DireNavigator,
    navigationOptions: {
      // tab info will diynamically get the collor from tabBarOption using it for my
      // convienece
      tabBarIcon: tabInfo => {return (<Icon name="ios-home" type = "ionicon" size={20}color={tabInfo.tintColor }/>);
      },
      tabBarColor: Colors.hedTint
    }
  },
  List: {
    screen: TabListNavigator,
    navigationOptions: {
      // tabinfo will diynamically get the collor from tabBarOption using it for my
      // convienece
      tabBarIcon: tabInfo => {return (<Icon name="ios-list" type = "ionicon"size={20}color={tabInfo.tintColor } />);
      },
      tabBarColor: Colors.hedTint
    }
  },
  Camera: {
    screen: TabCamNavigator,
    navigationOptions: {
      tabBarLabel: "Cam",
      tabBarIcon: tabInfo => {
        return (<Icon name="ios-camera" type="ionicon" size={20}color={tabInfo.tintColor} />);
      },
      tabBarColor: Colors.hedTint
    }
  },
  Hospital: {
    screen: TabMapNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (<Icon name="hospital" type="material-community" size={25}color={tabInfo.tintColor} />);
      },
      tabBarColor: Colors.hedTint
    }
  },
  // will be implemnting in iteration 2

  // Temp: {
  //   screen: MachineListScreen,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (<MaterialCommunityIcons name="weather-cloudy" size={25}color={tabInfo.tintColor} />);
  //     },
  //     tabBarColor: Colors.accentColor
  //   }
  // },
  // SmoothMaps: {
  //   screen: SmoothMapsScreen,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (<MaterialCommunityIcons name="weather-cloudy
  //       " size={25}color={tabInfo.tintColor} />);
  //     },
  //     tabBarColor: Colors.accentColor
  //   }
  // }
}
const DireTabNavigator = Platform.OS == "android"
 ? createMaterialBottomTabNavigator(TabsScreenConfig, {
   activeTintColor: 'black',
   shifting: true,
   //Set colour defualt for alll tabs
  //  barStyle:{
  //    backgroundColor: Colors.primaryColor
  //}
 }) : createBottomTabNavigator(TabsScreenConfig,
  { // customization of how the Tab bar
  tabBarOptions: {
    activeTintColor: "Colors.accentColor"
  }
});

export default createAppContainer(DireTabNavigator)