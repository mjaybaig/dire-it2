import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import{StyleSheet} from 'react-native'
import Tab1 from './TabsForWeather/TempratureTab'
import Tab2 from './TabsForWeather/UvTab';
import Tab3 from './TabsForWeather/RainTab'

export default class NewScreen extends Component {
    render() {
        return (
          <Container tabStyle={styles.contaierStyle} >
            <Tabs tabBarUnderlineStyle={{backgroundColor:"white"}} >
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
              textStyle={{color:"black"}} activeTextStyle={{color:"white"}} heading="Temprature">
                <Tab1 />
              </Tab>
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
              textStyle={{color:"black"}} activeTextStyle={{color:"white"}} heading="UV-Radiation">
                <Tab2 />
              </Tab>
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}}
              textStyle={{color:"black"}} activeTextStyle={{color:"white"}}  heading="Rainfall">
                <Tab3 />
              </Tab>
            </Tabs>
          </Container>
        );
      }
    }
const styles = StyleSheet.create({
contaierStyle:{
    backgroundColor:"#FAE5B6",
}
})
