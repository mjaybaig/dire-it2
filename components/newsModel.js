import React, { Component } from 'react'
import { Dimensions,Modal,StyleSheet } from 'react-native'
import{Container,Header,Content,Body,Left,Right,Title,Button, Icon}from 'native-base'
import { WebView } from 'react-native-webview'

//get the height of the window with the help of Dimesion and redicong -56 pixel
const weViewHeight = Dimensions.get('window').height -56;

export default class newsModel extends Component {
    
    constructor(props){
        super(props)
    }
    handleClose = () => {
        return this.props.onClose()
    }
    render() {
        const {showModal, articleData} = this.props
        const { url } = articleData
        if(url != undefined){
        return (
            <Modal
            animationType='slide'
            transparent
            visible={showModal}
            onRequestClose={this.handleClose}>
            <Container style={styles.contanerStyle}>
                <Header style={styles.headerStyle}>
                    <Left>
                    <Button onPress={this.handleClose}transparent>
                        <Icon name ="close" style={{color:"white", fontSize:12}}/>
                     </Button>
                     </Left>
                    <Body>
                        <Title children = {articleData.title} style ={{color:"white"}}/>
                    </Body>
                </Header>
                <Content contentContainerStyle ={{height: weViewHeight}}>
                    <WebView source={{uri:url}} style={{flex:1}}
                    onError ={this.handleClose} startInLoadingState
                    scalesPageToFit/>
                </Content>
            </Container>
            </Modal>
        )
    }else {
        return null
    }
    }
}

const styles = StyleSheet.create({
    contanerStyle:{
        margin:15,
        marginBottom:0,
        backgroundColor:"white"
    },
    headerStyle:{
        backgroundColor:"#F3BA36"
    }
})

