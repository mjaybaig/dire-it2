import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import{StyleSheet} from 'react-native'
import Tab1 from './tabsForNews/TabNews1';
import Tab2 from './tabsForNews/TabNews2';
import Tab3 from './tabsForNews/TabNews3'

export default class NewScreen extends Component {
    render() {
        return (
          <Container tabStyle={styles.contaierStyle} >
            <Tabs tabBarUnderlineStyle={{backgroundColor:"white"}} >
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
              textStyle={{color:"white"}} activeTextStyle={{color:"white"}} heading="General">
                <Tab1 />
              </Tab>
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
              textStyle={{color:"white"}} activeTextStyle={{color:"white"}} heading="Farming">
                <Tab2 />
              </Tab>
              <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}}
              textStyle={{color:"white"}} activeTextStyle={{color:"white"}}  heading="Health">
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
