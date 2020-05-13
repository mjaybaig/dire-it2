import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image,ScrollView, Dimensions,TouchableOpacity,SafeAreaView,Modal} from "react-native";
import TextTicker from 'react-native-text-ticker'
import Carousel from 'react-native-snap-carousel';
import {Icon} from 'react-native-elements'
import { WebView } from 'react-native-webview';

import MenueItem from '../components/menuItem'
import {getArticles} from "../components/articleFarm"
import {ListItem} from 'react-native-elements'

import MainScreenModel  from "../components/MainScreenModel"

const DEVICE_WIDTH = Dimensions.get("window").width
export default class MainScreen extends PureComponent{
  // scrollRef = React.createRef()
    constructor(props){ 
        super(props);
        this.screens = ['MachineList', 'Camera', 'Hospitals']
        this.state ={   
            data: [],
            sortData:[],
            activeIndex:0,
        }
    }
   
    
    componentDidMount(){
        getArticles().then(result => {
            this.setState({data: result})
            this.setState({sortData: this.state.data.map(m => ({"title": m.title, "url": m.url, "urlToImage": m.urlToImage}))})
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

    _renderItem({item}){
       // console.log("ITEM", item)
        //console.log(item.url)
        //const { modalVisible } = this.state;
        return (
            <TouchableOpacity onPress={() => {  
                return <MachineGrid 
                title = {itemData.item.title}/>
            }}>
            <View style={{flexDirection:"row"}}>
           <Image source = {{uri: item.urlToImage != null ? 
            item.urlToImage:"https://pixabay.com/get/54e6d0424956aa14f1dc8460da2932761c3ddfe5515178_640.jpg"}}
             style={{width:"20%",height:60,marginLeft:5,marginTop:5}} />
           <Text style={{
                fontSize: 18,
                marginLeft:5,
                shadowColor: "black",
                shadowOpacity: 0.7,
                width:"80%",
                shadowOffset: { width: 10, height: 10 },
                }} >{item.title} </Text>
                
          </View>
          </TouchableOpacity>
        )
    }
    render(){
        let titleData = this.state.sortData
        //console.log(titleData)
    //calling menue item to get format with image to diplay here
    return(
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Image source={require("../Images/MainScreenImage.png")} style={styles.mainImage}/>
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: 'baseline',backgroundColor:"#F3BA36"}}>
        <Text style={{fontWeight:"bold",fontSize:17,padding:2}}>News</Text>
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate({routeName: 'News'})
         }}>
        <View style={{flexDirection:"row"}}>
        <Text style={{color:"black",fontWeight:"bold",fontSize:17,padding:2,}}>More</Text><Icon name="arrow-right" type='material-community' color="black" />
        </View>
        </TouchableOpacity>
        </View>
         <View style={styles.ScrollTextContainer} >
         <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.sortData}
                 sliderWidth={300}
                itemWidth={DEVICE_WIDTH}
                loop={true}
                  renderItem={this._renderItem}
                  autoplay={true}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />   
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
           {/* <MenueItem icon='newspaper'
                iconName ="News"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "News",
                })
            }}/> */}
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
        height:"47%",
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
        flex: 1, 
        flexDirection:'row', 
        justifyContent: 'center'
        
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
     },
     contanerStyle:{
        margin:15,
        marginBottom:0,
        backgroundColor:"white"
    },
    headerStyle:{
        backgroundColor:"#F3BA36"
    }
})