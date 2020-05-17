

import React, { Component } from 'react'
import { StyleSheet, Alert,View, ActivityIndicator, PermissionsAndroid } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import {getArticles} from "../../components/articles"
import NewsItem from "../../components/newsItem"
import NewsModel from "../../components/newsModel"

export default class TabNews1 extends Component {

    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            data: null,
            setModalVisible:false,
            modalArticleData:{}
        }
    }

    //when we click on view to make the model visble
    handleNewsDataOnPress = (articleData) => {
        this.setState({
            setModalVisible:true,
            modalArticleData: articleData
        })
    }

    handleNewsDataClose = () => {
        this.setState({
            setModalVisible:false,
            modalArticleData:{}
        })
    }

    componentDidMount(){
        getArticles().then(data => {
            this.setState({
                isLoading:false,
                data: data
            })
        },error =>{
            Alert.alert("Error","Was not able to load News Check Internet Connectivity")
        }
        )
    }

  render() {
      console.log(this.state.data)
      let view =  this.state.isLoading ? (
          <View>
              <ActivityIndicator animating={this.state.isLoading} style={{justifyContent:"center"}}/>
              {/* //<Text style={{flex:1,marginTop:10, justifyContent:"center",}}>Loading Please wait</Text> */}
          </View>
       ): (
        <List 
        //Inbuild fuction of native base to render array iteratively
        dataArray={this.state.data}
        //callback which takes array and retursn commponent 
        renderRow={(item) => {
            return <NewsItem data={item} onPress ={this.handleNewsDataOnPress}/>
        }}/>

       )

    return (
      <Container>
        <Content>
         {view}
        </Content>
        <NewsModel
        showModal={this.state.setModalVisible}
        articleData={this.state.modalArticleData}
        //only run this fuction when we want to  call it hence no ()
        onClose = {this.handleNewsDataClose}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({})
