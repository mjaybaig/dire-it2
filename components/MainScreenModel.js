import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import{Container,Header,Content,Body,Left,Right,Title,Button, Icon}from 'native-base'

export default class MainScreenModel extends Component {
    render() {
        this.setModalVisible(true);
                if(item.url != undefined){
                    return (
                        <Modal
                        animationType='slide'
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                          }}
                        >
                        <Container style={styles.contanerStyle}>
                            <Header style={styles.headerStyle}>
                                <Left>
                                <Button onPress={()=>{this.setModalVisible(!modalVisible)}}transparent>
                                    <Icon name ="close" style={{color:"white", fontSize:12}}/>
                                 </Button>
                                 </Left>
                                <Body>
                                    <Title children = {item.title} style ={{color:"white"}}/>
                                </Body>
                            </Header>
                            <Content contentContainerStyle ={{flex:1}}>
                                <WebView source={{uri:item.url}} style={{flex:1}}
                                startInLoadingState scalesPageToFit scrollEnabled
                                />
                            </Content>
                        </Container>
                        </Modal>
                    )
                }else {
                    return null
                } 
    }
}

const styles = StyleSheet.create({})
