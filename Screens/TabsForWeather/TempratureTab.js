import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { H1, Text, Icon } from "native-base";
import axios from "axios";
import Geolocation from 'react-native-geolocation-service'

export default class TempratureTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            'currtemp': null,
            maxTemp: null,
            forcasts: null,
        }
    }

    //   componentDidMount(){

//   }
    componentDidMount(){
     Geolocation.getCurrentPosition(res => {
      let { latitude, longitude } = res.coords
      axios.get(`https://dire-api.herokuapp.com/api/daily?lat=${latitude}&long=${longitude}`).then(tempdata => {
        let { temp_max } = tempdata.data.data[0];
        let temp_min = tempdata.data.data[0].now.temp_min;
        let forecasts = tempdata.data.data.slice(1)
        let forecastTemps = forecasts.slice(0, 3).map(obj => { return {'minTemp': obj.temp_min, 'maxTemp': obj.temp_max}})
        this.setState({
          maxTemp: temp_max,
          minTemp: temp_min,
          forcasts: forecastTemps
        });
      })
    }, err => {
      console.log("ERRRR", err);
    })
        axios.get('http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json').then(response => {
            let data = response.data['observations']['data'][0]
            this.setState({
                'currtemp': data.air_temp
            })
        })
        let today = new Date();
        console.log(today.getDay())
        let tomor = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)
        console.log(tomor.getDay())
    }
    
    
    render() {
        //let {forecastTemps } = this.state;
        let {currtemp} = this.state;
        let { maxTemp, forcasts } = this.state;
        console.log(forcasts)
        return (
                <View style={styles.container}>

                    {/* {
                        currtemp &&
                        (       <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{fontSize: 12}}>Current{"\n"} <H1> {currtemp}°C</H1></Text>
                                    
                                <Text style={{fontSize: 12}}>Max</Text>
                                    <H1> {maxTemp}°C</H1>
                                </View>
                        )
                    }
                        { forcasts &&
                            forcasts.map((temps, i) => {
                                return (<View key={i} style={{marginRight:20}}>
                                    <Text>Day {i+1} Max: </Text>
                                    <Text> {temps.maxTemp} </Text>
                                    <Text>Day {i+1} Min: </Text>
                                    <Text> {temps.minTemp} </Text>
                                </View>)
                            })} */}
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }

})
