import React, { Component } from 'react';
import{PermissionsAndroid,Platform} from "react-native"
import {enableScreens} from "react-native-screens";

import DireNavigator from "./navigation/DireNavigator"

export default class App extends Component {
constructor(props){
  super(props)
  this.state ={
    hasMapPermission:false
  }
}

  componentDidMount(){
  enableScreens()
  this.requestFineLocation()
}

async requestFineLocation() {
  try{
    if(Platform.OS === 'android'){
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        this.setState({hasMapPermission:true})
      }
    }else{
      //when not android
      this.state({hasMapPermission:tru})
    }
  }catch(err){
    console.warn(err)
  }
}

  render(){


    return(
      <DireNavigator/>
    )
  }
}