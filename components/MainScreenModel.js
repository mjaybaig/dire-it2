import React, { Component } from 'react'
import { Dimensions,Modal,StyleSheet } from 'react-native'
import{Container,Header,Content,Body,Left,Right,Title,Button, Icon}from 'native-base'
import { WebView } from 'react-native-webview';


export default class MainScreenModel extends Component {
    
    render() {
        let url = this.props.navigation.getParam('url');
        console.log("here in Screen Model")
        console.log(url)
        let title = this.props.navigation.getParam('title');
        console.log(title)
                if(url != undefined){
                    return (
               <Container style={styles.contanerStyle}>
                {/* <Header style={styles.headerStyle}>
                    <Body>
                        <Title children = {title} style ={{color:"black"}}/>
                    </Body>
                </Header> */}
                <Content contentContainerStyle ={{flex:1}}>
                    <WebView source={{uri:url}} style={{flex:1}}
                    startInLoadingState scalesPageToFit scrollEnabled
                    />
                </Content>
            </Container>
            )
                }else {

                    return null
                } 
    }
}

MainScreenModel.navigationOptions = (navigationData) => {
    return {
      headerTitle: "Farming News"
    }
  }

const styles = StyleSheet.create({
    contanerStyle:{
        //margin:15,
        marginBottom:0,
        backgroundColor:"white"
    },
    headerStyle:{
        backgroundColor:"#F3BA36"
    }
})
