import React, { Component } from 'react'
import {  StyleSheet, Modal,Button,ScrollView} from 'react-native'
import axios from "axios";
import apis from "../../env";
import Geolocation from 'react-native-geolocation-service'
import { H1, ListItem,Fab,List } from 'native-base';
import { View, Icon,Text} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const advices = {
    'good': {
        observation: "It's a good day to be outside.",
        suggestion: ["Keep Checking the app for any changes"]
    },
    'moderate': {
        observation: "The air quality is okay, but it could change soon. It’s okay to be outside but watch for changes in air quality around you.",
        suggestion: null
    },
    'poor': {
        observation: "The air is probably dusty or smoky. Sensitive groups may experience symptoms like coughing or shortness of breath.",
        suggestion: [
            "If you are sensitive to air pollution, spend less time outside in the smoke or dust and follow your treatment plan. Reduce prolonged or heavy physical activity.",
            "If you are coughing or short of breath, avoid being outside in the smoke or dust.",
            "Close your windows and doors to keep smoke and dust out of your home.",
            "Seek urgent medical help if anyone has trouble breathing or tightness in the chest. Call 000 for an ambulance.",
        ]
    },
    'very poor': {
        observation: "The air is probably very dusty or smoky. Everyone could be experiencing symptoms like coughing or shortness of breath.",
        suggestion: [
            "Avoid being outside in the smoke or dust. Reduce prolonged or heavy physical activity.",
            "Close your windows and doors to keep smoke and dust out of your home.",
            "If you think the air in your home is uncomfortable, consider going to an air-conditioned building like a library or shopping centre for a break if it’s safe to do so.",
        ]
    },
    'hazardous': {
        observation: "The air is probably extremely dusty or smoky. Everyone could be experiencing symptoms like coughing or shortness of breath.",
        suggestion: [
            "Stay indoors away from smoke and dust.",
            "If you are sensitive to air pollution, follow your treatment plan. If you can, remain indoors and keep physical activity levels as low as possible.",
            "Seek urgent medical help if anyone has trouble breathing or tightness in the chest. Call 000 for an ambulance. "
        ]
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
            value: null,
            advice: null,
            suggestions: null,
            modalVisible: false,

        }
    }
    componentDidMount(){
        Geolocation.getCurrentPosition(loc => {
            let config = {

                headers :{
                    'X-API-Key': apis.EPA_API_KEY
                }
            };
            console.log(loc.coords)
            axios.get(`https://gateway.api.epa.vic.gov.au/environmentMonitoring/v1/sites?environmentalSegment=air&location=[-37.75,145.20]`, config).then(airquality => {
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
                        to: siteHealthAdvices[0].until,
                        advice: advices[siteHealthAdvices[0].healthAdvice.toLowerCase()].observation,
                        suggestion: advices[siteHealthAdvices[0].healthAdvice.toLowerCase()].suggestion
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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    render() {
        let {healthStatus, from, to, advice, suggestion} = this.state
        console.log(this.state)
        let convFrom = this.convertDate(from)
        let convTo = this.convertDate(to)
        console.log("in air")
        return (
            
            <View style={{flex:1}}>
            <View style={{flexDirection: 'column', flex: 1, backgroundColor: this.state.healthColor, alignContent: 'center'}}>
            <ScrollView >
                <H1 style={styles.headerStyle}> The Air Quality is</H1>
                {
                    healthStatus &&
                    <View>
                        <H1 style={styles.statusStyle}>{healthStatus}</H1>
                        <Text style={styles.headerStyle}>{advice}</Text>
                        <Text style={styles.headerStyle}>This reading is valid from {convFrom} to {convTo} </Text>
                        <H1 style={styles.titleStyle}>Suggestions</H1>
                        {
                            suggestion && 
                            suggestion.map((item, index)=>{
                                return( 
                                    <View style={{justifyContent:"center",alignItems:"center"}}>
                                <ListItem>
                                        <Text style={styles.headerStyle}>{item}</Text>
                                    </ListItem>
                                </View>
                                )
                            })
                        }

                    </View>
                }
                <Text></Text>
                <Text></Text>
                <Text></Text>
                </ScrollView>

          </View>
          <View style={{}}>
          <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                      <View style={{backgroundColor:"#FAE5B6",height:"100%"}}>
                      <View style={{alignItems:"center",flex:1,marginTop:20}}>
                      <Text style={{fontSize:30, marginBottom:20}}>Air Pollution</Text>
                      <View style={{marginTop:20,marginBottom:20}}>
                      <FontAwesome5 solid name="smog" style={{color:"#ADD8E6", fontSize:80}}/>
                      </View>
                      <ScrollView>
                      <View>
                    <List>
                    <ListItem>
                      <Text style={{}}>Quality of air is an important factor when working outside. We gather data on air quality in your area and show you the results.</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Good is reflected with Green background</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Moderate is reflected with a yellow background</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Poor is reflected by orange background</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Very poor is reflected with a red background</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Hazardous is reflected with an burgundy background</Text>
                        </ListItem>
                        </List>
                      </View>
                      </ScrollView>
                      </View>
                      <View style={{}}>
                        <Button
                          onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }} title="Back" color="#F3BA36">
                        </Button>
                          </View>
                      </View>
                  </Modal>
                  <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{}}
                  style={{ backgroundColor: '#808080',opacity:0.4 }}
                  position="bottomRight"
                  onPress={() => {
                      this.setModalVisible(true);
                    }}>
                      <Icon name="help" />
                  </Fab>

        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        color: 'white',
        marginTop: 20,
        fontSize: 17,
        textAlign: 'center',
    },
    titleStyle: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 15
    },
    statusStyle: {
        fontWeight: "900",
        color: 'white',
        fontSize: 50,
        marginTop: 25,
        textAlign: 'center',
        padding: 20,
    }
})
