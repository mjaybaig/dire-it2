import React, { Component } from "react";
import { View, Text, StyleSheet,Keyboard,TouchableWithoutFeedback,TouchableOpacity,ScrollView, Button} from "react-native";
import axios from "axios"
import googleKey from "../env"
import ShowDirectionScreen from "./ShowDirectionScreen"
import Geolocation from 'react-native-geolocation-service'
import { Rating } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class  HospitalScreen extends Component{
   constructor(props){
       super(props)
       this.state = {
           userLatitude: 0,
           userLongitude: 0,
           predictions:[],
           mapDetailResult:[],
           distanceResult:[],
          // combines:[]
       }
      // this.showDirectionsOnMap = this.showDirectionsOnMap.bind(this)
   }
   componentDidMount(){
       //continusoly get positon from user and stoping this dismount happens
       Geolocation.watchPosition(
           pos =>{
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude,
                })
                this.getPlaces()
                
            },
            err => console.warn(err),
            {
                enableHighAccuracy: true
            }
        )
        }
        async getPlaces(){
            const result = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleKey.googleApiKey}&input=Hospital&location=${this.state.userLatitude},${this.state.userLongitude}&radius=2000`
            )
            this.setState({predictions: result.data.predictions})
            const firstResult = this.state.predictions.map(prediction =>(prediction.place_id))
            // console.log(firstResult)
            let results = []
            for(let i =0 ; i< firstResult.length; i++){
                // this.setState.mapDetailResult
                const resulttest = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${firstResult[i]}&fields=name,rating,formatted_phone_number,formatted_address,place_id&key=AIzaSyBnSm8AZ8NtPi9Fs-A7o0cFm87ObLYL5PE`
                )
                results.push(resulttest.data.result)
            }
            this.setState({mapDetailResult: results})
             //const testDis = this.state.distanceResult.map(m => (m.duration.text))
             //console.log(this.state.mapDetailResult)
           // console.log(this.state.mapDetailResult.map(m => (m.name) ));
            var dis= []
            for(let i=0;i<firstResult.length; i++){
                const distesult = await axios.get(
                    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.userLatitude},${this.state.userLongitude}&destinations=place_id:${firstResult[i]}&key=AIzaSyBnSm8AZ8NtPi9Fs-A7o0cFm87ObLYL5PE`
                )
                dis.push(distesult.data.rows[0].elements)
                //console.log(dis)
            }
           //this.setState({distanceResult:dis})
            //console.log(this.state.distanceResult)

       // let mapAddress = this.state.mapDetailResult
        //let distanceDetail = this.state.distanceResult
        




            // this.state.mapDetailResult.push(...this.state.distanceResult)
            // console.log(this.state.mapDetailResult)
       // const testDis = this.state.distanceResult.map(m => ({dist: m[0].distance.text, dur:m[0].duration.text}))
    //    console.log(testDis)
        //     //console.log(this.state.distanceResult)
        //     //console.log(this.state.distanceResult.elements)
        //     //console.log(combine)
        }
        hideKeyboard(){
            Keyboard.dismiss()
        }
      componentWillUnmount(){
          Geolocation.clearWatch(this.locationWtchID)
      }
    
    
 // <Text style = {styles.MainTextStyle}>{this.state.distanceResult.map(d => (d.distance.text))}</Text>
            // <Text style = {styles.MainTextStyle}>{this.state.distanceResult.map(d => (d.duration.text))}</Text>
    render(){
       // console.log(this.state.distanceResult)
        // const combine = [...this.state.mapDetailResult, ...this.state.distanceResult]
            const displayMapDetail = this.state.mapDetailResult.map((m,i) => {
            return(
            <TouchableOpacity key ={i}>
            <View style = {styles.gridItem}>
            <View  style = {styles.sugestStyle} >
            <Text style={styles.textStyle}>Name:</Text>
            <Text style = {styles.MainTextStyle}>{m.name}</Text>
            <Text style={styles.textStyle}>Phone Number</Text>
            <Text style = {styles.MainTextStyle}>{m.formatted_phone_number}</Text>
            <Text style={styles.textStyle}>Rating:</Text>
            <Text style = {styles.MainTextStyle}>{m.rating}</Text>
            <Button title = "Direction"
            onPress={() => {
                this.props.navigation.navigate({
                  routeName: "ShowDirection",
                  params: {
                    placeId: m.place_id,
                    latitude: this.state.userLatitude,
                    longitude:this.state.userLongitude
                  },
                });
            }} />
            </View>
            </View>
            </TouchableOpacity>
            )
        })
      

        // const displayDistanceDetail = this.state.distanceResult.map(d => {
        //     return(
        //     <View  style = {styles.sugestStyle} key ={Math.random().toString()}>
        //     <Text style = {styles.MainTextStyle}>{ d.distance.text}</Text>
        //     <Text style = {styles.MainTextStyle}>{d.duration.text}</Text>
        //     </View>
        //     )
        // })
        
        //console.log(this.state.userLatitude)
        //console.log(this.state.userLongitude)
    const mapRegion = {
        //points and surface
        
        latitude: this.state.userLatitude,
        longitude: this.state.userLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
               //const testDis = this.state.distanceResult.map(m => (m.duration.text))

    return(
        
        <ScrollView>
        {displayMapDetail}
        </ScrollView>
        // <ShowDirectionScreen 
        // showDirectionsOnMap={this.showDirectionsOnMap}
        // userLatitude = {this.state.userLatitude} 
        // userLongitude = {this.state.userLongitude}/>
        //when user press screen to close the keyboard
    // <TouchableWithoutFeedback onPress={this.hideKeyboard}>
    //    <View style = {styles.container}>
    //     <MapView showsUserLocation followsUserLocation style={styles.map} region = {mapRegion}/>
    //     </View>
    //    </TouchableWithoutFeedback>
        )
}
}
const styles = StyleSheet.create({
    container:{
     flex:1,
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    gridItem: {
        flex: 1,
        marginTop:10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight:10,
        height: 200,
      },
    sugestStyle:{
        flex: 1,
        padding: 10,
        borderRadius: 5,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 6,
        elevation: 3,
        backgroundColor:"#FAE5B6"

       
        // backgroundColor:"white",
        // padding:5,
        // borderTopWidth:1,
        // borderColor:"#777",
        // padding:20,
        // borderWidth:1
    },
    textStyle:{
        fontWeight: "bold",
        paddingBottom:3,
        color:"black",
        opacity:1
    },
    secondaryStyle:{
        color:"#777"
    },
    MainTextStyle:{
        color:"#000",
        paddingBottom:10
    }
})

// <PlaceInput 
// //showDirectionsOnMap={this.showDirectionsOnMap}
// userLatitude = {this.state.userLatitude} 
// userLongitude = {this.state.userLongitude}/>