import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Grid, Col, Container,List, ListItem, Text, Content, H1, H3, Card, CardItem, Body,Tabs,Tab} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {Icon} from 'react-native-elements'


const slides = [
    {
      key: 1,
      title: 'Introduction to Weather',
      text: 'The sun emits harmful radiation known as UV rays. Swipe right to learn more',
      backgroundColor: '#FAE5B6',
      icon: 'cloud',
      iconColor:"#ADD8E6"
  
    },
    {
      key: 2,
      title: 'What is U.V. Radiation',
      text: "It's harmful radiation emitted by the sun. If the UV reading on the next page is above 3, wear sunscreen. On higher readings, avoid going out.",
      icon: 'radiation-alt',
      backgroundColor: '#FAE5B6',
      iconColor:"#ADD8E6"
    },  
    {
      key: 3,
      title: 'Air Pollution',
      text: "Quality of air is an important factor when working outside. We gather data on air quality in your area and show you the results.",
      icon: 'smog',
      backgroundColor: '#FAE5B6',
      iconColor: '#ADD8E6'
    },
    {
      key: 4,
      title: 'Staying safe',
      text: "We've compiled a list of helpful tips to keep you safe in dangerous weather. The infromation is presented in the first aid section",
      icon: 'user-shield',
      backgroundColor: '#FAE5B6',
      iconColor: '#ADD8E6'
    },
  ];

export default class HelpScreen extends Component {
    _renderItem = ({item}) => {
        return (
        <View style={{ backgroundColor: item.backgroundColor,flex:1}}>
          <View style={{alignItems: 'center',marginTop:20 }}>
            <H1 style={styles.slideHeader}>{item.title}</H1>
            {/* <Icon type="FontAwesome5" name='sun'  style={{color:'red', fontSize:60}}/> */}
            <View style={{marginTop:20}}>
            <FontAwesome5 solid name={item.icon} style={{color:item.iconColor, fontSize:80}}/>
            </View>
            <View style={{marginTop:20,padding:10,justifyContent: 'center'}}>
              <Text style={{fontSize:20,textAlignVertical: "center",textAlign: "center"}}>{item.text}</Text>
            </View>
          </View>
              </View>
        )
      }
    render() {
        return (
            <AppIntroSlider bottomButton showSkipButton renderItem={this._renderItem} 
            data = {slides} showPrevButton = {true} showSkipButton={false} onDone={() => {this.props.navigation.pop()}} />
        )
    }
}
HelpScreen.navigationOptions = (navigationData) =>{
    const catId = navigationData.navigation.getParam("categoryId");
    return {
        headerTitle: 'Help'
    }
 }

const styles = StyleSheet.create({})
