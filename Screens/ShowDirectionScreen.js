import React, { Component } from "react";
    import { View, Text, StyleSheet,Keyboard,Dimensions} from "react-native";
    import MapView,{Polyline,Marker}  from 'react-native-maps'
    import axios from "axios"
    import googleKey from "../env"
    import PolyLine from "@mapbox/polyline"
    import Geolocation from 'react-native-geolocation-service'
import {Fab,Icon} from "native-base";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    export default class  ShowDirectionScreen extends Component{
        constructor(props){
            super(props)    
             this.state = {
              userLatitude: 0,
              userLongitude: 0,
             destinationCoords:[],  
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
             firstClick: true              
             }
        // this.showDirectionsOnMap = this.showDirectionsOnMap.bind(this)
        }

        componentDidMount(){
            this.setState({userLatitude: this.props.navigation.getParam("latitude")})
            this.setState({userLongitude: this.props.navigation.getParam("longitude")})
            let placeId = this.props.navigation.getParam('placeId');
            let userLat = this.props.navigation.getParam('latitude')
           let  userLong = this.props.navigation.getParam('longitude')   
            this.showDirectionsOnMap(placeId,userLat,userLong)
           


            //continusoly get positon from user and stoping this dismount happens
            // Geolocation.watchPosition(
            //     pos =>{
            //         console.log(placeId);
            //         this.setState({
            //             userLatitude: pos.coords.latitude,
            //             userLongitude: pos.coords.longitude,
            //         })
                    
            //     },
            //     err => console.warn(err),
            //     {
            //         enableHighAccuracy: true
            //     }
            //     )
            
            }
            hideKeyboard(){
                Keyboard.dismiss()
            }
            componentWillUnmount(){
                //Geolocation.clearWatch(this.locationWtchID)
            }

            async showDirectionsOnMap(placeId,userLat,userLong){
                
                console.log(userLat)
                console.log(userLong)
                console.log(placeId)
                try{
                    const result = await axios.get(
                        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLat},${userLong}&destination=place_id:${placeId}&key=${googleKey.googleApiKey}`
                )
                //console.log(result.data)
                const points = PolyLine.decode(result.data.routes[0].overview_polyline.points)
                //breaking the arry to the format required by polyline to draw directions
                //Array of objects
                const latLng = points.map(point => {
                    return { latitude: point[0], longitude: point[1]}
                })
                this.setState({destinationCoords: latLng})
                this.map.fitToCoordinates(latLng)
                console.log(latLng)
            }catch(err){
                console.error(err)
            }
        }
            
        
        actWhenClicked(){
                if(this.state.firstClick){
                this.setState({latitudeDelta:0.010, longitudeDelta:0.010})
                this.setState({firstClick:false})
                }else{
                    this.setState({latitudeDelta: 0.122, longitudeDelta:0.121})
                    this.setState({firstClick:true})

                }
        }
        render(){
            var first_click = true
            //pply line and marker should not be zero to make sure the 
            //"https://github.com/react-native-community/react-native-maps/blob/master/docs/"
            let polyline = null
            let marker = null
            if(this.state.destinationCoords.length > 0){
                polyline = <Polyline coordinates = {this.state.destinationCoords} strokeWidth={5}
                strokeColor="#CC4400"/>
                //to mark the last corrdinates which in the destination cord polyline
                marker = ( <Marker coordinate = {this.state.destinationCoords
                    [this.state.destinationCoords.length - 1]}/>)
            }
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
            console.log(this.state.userLatitude)    
            console.log(this.state.userLongitude)           
       
                const mapRegion = {
                    //points and surface
                    latitude:this.props.navigation.getParam('latitude'),
                    longitude:this.props.navigation.getParam('longitude') ,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta
                }
        return(
        <View style = {styles.container}>
            <MapView ref={map => { this.map = map }} showsUserLocation followsUserLocation style={styles.map} region = {mapRegion}>
            {polyline}
            {marker}
            </MapView>
            <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#F3BA36",opacity:0.7}}
        position="bottomRight"
        onPress={() => 
            this.actWhenClicked()}>
            <Icon name="navigate"/>
        </Fab>
            </View>
            )
    }}
    const styles = StyleSheet.create({
        container:{
        flex:1,
        },
        map:{
            ...StyleSheet.absoluteFillObject
        }
    })
