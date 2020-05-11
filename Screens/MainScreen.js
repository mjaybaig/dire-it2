import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image,ScrollView, Dimensions,TouchableOpacity} from "react-native";
import TextTicker from 'react-native-text-ticker'

import MenueItem from '../components/menuItem'
import {getArticles} from "../components/articleFarm"
import {ListItem} from 'react-native-elements'

const DEVICE_WIDTH = Dimensions.get("window").width
export default class MainScreen extends PureComponent{
  // scrollRef = React.createRef()
    constructor(props){
        super(props);
        this.screens = ['MachineList', 'Camera', 'Hospitals']
        this.state ={   
            data: [],
            sortData:[],
            //selectedIndex:0
        }
    }
    componentDidMount(){
        getArticles().then(result => {
            this.setState({data: result})
            this.setState({sortData: this.state.data.map(m => (m.title))})
        },error =>{
            Alert.alert("Error","Was not able to load News Check Internet Connectivity")
        }
         )

        //  setInterval(()=> {
        //     this.scrollRef.current.scrollTo({
        //         animated:true,
        //         y:0,
        //         x:DEVICE_WIDTH * 2
        //     })
        // }, 3000)

        // this.setState({predictions: result.data.predictions})
        //     const firstResult = this.state.predictions.map(prediction =>(prediction.place_id))
    }
    render(){
        let titleData = this.state.sortData
        console.log(titleData)
    //calling menue item to get format with image to diplay here
    return(
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Image source={require("../Images/MainScreenImage.png")} style={styles.mainImage}/>
        </View>
        <Text style={{fontWeight:"bold",fontSize:17,backgroundColor:"#F3BA36",width:"100%",padding:2}}>News</Text>
         <ScrollView style={styles.ScrollTextContainer} horizontal >
         {titleData.map((fill,k) =><ListItem bottomDivider style={styles.txtStyles} key={k} title ={fill}/> )}
        {/* <TextTicker
          style={{ fontSize: 20, padding:12}}
          duration={50000}    
          //<ListItem bottomDivider style={styles.txtStyles} key={k} title ={fill}>/
          //<Text style={{}}key={k}>{fill}</Text>
          loop
          bounce
          shouldAnimateTreshold={100}
          scroll
          repeatSpacer={50}
          marqueeDelay={2000}
          >
        
        </TextTicker>
         */}
      </ScrollView>
       
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
        height:"35%",
        flexDirection:'row',
        width:"100%",
        flexWrap:'wrap',
    },
    ScrollTextContainer: {
        height:"10%",
        
       // marginBottom:7
        //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
     },
     txtStyles: {
        fontSize: 16,
        padding:5   
     },
     cirlceDiv:{
         position:"absolute",
         bottom:15,
         height:5,
         display:"flex",
         flexDirection:"row",
         justifyContent:"center",
         alignItems:"center"
     },
     whiteCilre:{
         width:6,
         height:6,
         borderRadius:3,
         margin:5,
         backgroundColor:"white"
     }
})