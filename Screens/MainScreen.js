import React, { Component } from "react";
import { View, Text, StyleSheet, Image,ScrollView} from "react-native";

import MenueItem from '../components/menuItem'


export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.screens = ['MachineList', 'Camera', 'Hospitals']
    }
    render(){
    //calling menue item to get format with image to diplay here
    return(
       
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Image source={require("../Images/MainScreenImage.png")} style={styles.mainImage}/>
        </View>
        <View style={styles.menueContainer}>
            <MenueItem icon = 'tractor'
            iconName = "Machine List"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "MachineList"
                })
            }}>
            </MenueItem>
            <MenueItem icon='camera'
            iconName = "Machine Auto-Identify"

                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Camera",
                })
            }}/>
           <MenueItem icon='hospital'
                iconName ="Near By Hospitals"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Hospitals",
                })
            }}/>
           <MenueItem icon='newspaper'
                iconName ="News"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "News",
                })
            }}/>
        </View>
        </View>
    )
    
}}


MainScreen.navigationOptions = (navigationData) =>{
    return {
        headerTitle: 'Welcome To Dire'
    }
 }
 const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
        //backgroundColor:'rgba(47,163,218, .4)'
    },
    top:{
        height:"50%",
        alignItems:"center",
        justifyContent:"center",
    },
    mainImage:{
        width:"100%",
        height:"100%"
    },
    header: {
        color: "#F3BA36",
        fontSize: 28,
        //borderColor:"#F3BA36",
        //borderWidth:2,
        //padding:20,
        //paddingLeft:40,
       // paddingRight:40,
       // backgroundColor:'rgba(255,255,255, 0.8)',
    },
    menueContainer:{
        height:"50%",
        flexDirection:'row',
        width:"100%",
       flexWrap:'wrap',

    }
})