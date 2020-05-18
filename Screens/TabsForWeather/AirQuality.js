import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import axios from "axios";
import apis from "../../env";
import Geolocation from 'react-native-geolocation-service'
import { H1 } from 'native-base';


const advices = {
    'good': {
        observation: "It's a good day to be outside.",
        suggestion: null
    },
    'moderate': {
        observation: "The air quality is okay, but it could change soon. It’s okay to be outside but watch for changes in air quality around you.",
        suggestion: null
    },
    'poor': {
        observation: "The air is probably dusty or smoky. Sensitive groups may experience symptoms like coughing or shortness of breath.",
        suggestion: "sugg goes here"
    }
}
export default class AirQuality extends Component {
    constructor(props){
        super(props);
        this.state = {
            healthStatus: null,
            healthColor: null,
            from: null,
            to: null,
            value: null
        }
    }
    componentDidMount(){
        Geolocation.getCurrentPosition(loc => {
            let config = {

                headers :{
                    'X-API-Key': apis.EPA_API_KEY
                }
            };
            axios.get(`https://gateway.api.epa.vic.gov.au/environmentMonitoring/v1/sites?environmentalSegment=air&location=[${loc.coords.latitude},${loc.coords.longitude}]`, config).then(airquality => {
            // axios.get('https://gateway.api.epa.vic.gov.au/environmentMonitoring/v1/sites', config).then(airquality => {
                let siteID = airquality.data.records[0].siteID;
                axios.get(`https://gateway.api.epa.vic.gov.au/environmentMonitoring/v1/sites/${siteID}`, config).then(qualityData => {
                    // console.log(qualityData.data)
                    let {siteHealthAdvices} = qualityData.data
                    console.log(qualityData.data)
                    // console.log(siteHealthAdvices)
                    this.setState({
                        healthStatus: siteHealthAdvices[0].healthAdvice,
                        healthColor: siteHealthAdvices[0].healthAdviceColor,
                        from: siteHealthAdvices[0].since,
                        to: siteHealthAdvices[0].until
                    });
                }, err => {
                    console.log(err);
                })
            }, err => {
                console.log(err);
            })
        })
    }

    convertDate(dateToConvert){
       let addHours = new Date(dateToConvert);

       console.log("Add Hours", addHours)
       addHours.setHours(addHours.getHours()+12);
       console.log(addHours)

       return `${addHours.getUTCHours()}:${(addHours.getUTCMinutes()<10?'0':'') + addHours.getMinutes()}`
    }
    render() {
        let {healthStatus, from, to} = this.state
        console.log(this.state)
        let convFrom = this.convertDate(from)
        let convTo = this.convertDate(to)
        // conso
        return (
            <View style={{flexDirection: 'column', flex: 1, backgroundColor: this.state.healthColor, alignContent: 'center'}}>
                <H1 style={styles.headerStyle}> The Air Quality is</H1>
                {
                    healthStatus &&
                    <View>
                        <H1 style={styles.statusStyle}>{healthStatus}</H1>
                        <Text style={styles.headerStyle}>This reading is valid from {convFrom} to {convTo} </Text>
                        <Text>{}</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        color: 'white',
        marginTop: 30,
        textAlign: 'center'
    },
    statusStyle: {
        fontWeight: "900",
        color: 'white',
        fontSize: 50,
        marginTop: 30,
        textAlign: 'center',
        padding: 30
    }
})
