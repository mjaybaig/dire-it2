import React from 'react';
import {Text, StyleSheet ,ScrollView} from 'react-native';
import { Container, Header, View, Button,Fab,List,ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { weatherConditions } from '../constants/WeatherConditions';
import {Icon} from 'react-native-elements'
import TimeAgo from "./TimeSunSet"

const tem_CuttOff = 35
const min_temCutoff = 5


const Weather = ({ weather, temperature,temperatureMin,temperatureMax,forcasts,weatherDesc,sunSet }) => {
  console.log(Weather)
let date = new Date(sunSet*1000)
//let localDate = new Date(date)
console.log(sunSet)
console.log(date)
//var hours = date.getHours()
  if (weather != null) {
    return (
      <ScrollView
        style={{backgroundColor: weatherConditions[weather].color}
        }
        >
        <View style={{}}>
        <View style={{justifyContent:"center"}}>
          <Icon name= {weatherConditions[weather].icon} type='material-community' color={"#fff"} size={80}/>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",padding:"5%"}}>
          <Text style={styles.tempText}>Current Temp</Text>
          <Text style={styles.tempText}>{temperature}°C</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",padding:"5%"}}>
          <Text style={styles.tempText}>Max Temp</Text>
          <Text style={styles.tempText}>{temperatureMax}°C</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",padding:"5%"}}>
          <Text style={styles.tempText}>Min Temp</Text>
          <Text style={styles.tempText}>{temperatureMin}°C</Text>
        </View>
        </View>
        <View style={{marginTop:"5%"}}>
        <View style={{}}>
          <List>
            <ListItem>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
            </ListItem>
          <ListItem>
          <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}
          </Text>         
          </ListItem>
          </List>
        </View> 
        </View>
          {
            temperature > tem_CuttOff ? (
              <View style={{justifyContent: 'center'}}>
                <List>
                <ListItem>
                  <Text style={{fontSize:20, color:"red"}}>Even if the climate seems pleasant be heedful of the heat. The temperature seems to be high</Text>
                  </ListItem>
                  <ListItem>
                  <Text style={{fontSize:20, color:"red"}}>Limit Outdoor actitivity to the the coolest part of the day</Text>
                  </ListItem>
                  <ListItem>
                  <Text style={{fontSize:20, color:"red"}}>Protect yourself from the sun when outside by covering exposed skin, using sunscreen and wear a hat.</Text>
                  </ListItem>
                  <ListItem>
                  <Text style={{fontSize:20, color:"red"}}>‘Seek’ shade and ‘slide’ on some sunglasses</Text>
                  </ListItem>
                </List>
              </View>
              ): temperature < min_temCutoff ?(
                <View style={{justifyContent:"center"}}>
                  <List>
                    <ListItem>
                    <Text style={styles.subtitle}>Even if the air temperature seems reasonable, a harsh wind chill can make conditions too dangerous for prolonged work</Text>
                    </ListItem>
                    <ListItem>
                <Text style={styles.subtitle}>Temprature is  low, Take along an emergency kit and blankets in your car in case of a breakdown or accident </Text>
                    </ListItem>
                  </List>
                </View>
                ):(
                  <Text style={styles.subtitle}> </Text>
                  )
                }
                <Text></Text>
                <Text></Text>
                <Text></Text>
    </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Check Internet Connection</Text>
      </View>
    )
  };
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  temperatureMin:PropTypes.number.isRequired,
  temperatureMax:PropTypes.number.isRequired,
  forcasts:PropTypes.array.isRequired,
  weatherDesc:PropTypes.string,
  sunSet:PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    //flex: 1
  },
  headerContainer: {
    //flex: 1,
   //flexDirection: 'row',
   alignItems: 'center',
   justifyContent:"space-evenly"
  },
  tempText: {
    fontSize: 30,
    color: '#fff',
justifyContent:"center" 
 },
  bodyContainer: {
   // flex: 2,
//    alignItems: 'flex-start',
   // justifyContent: 'flex-end',
   // paddingLeft: 25,
   // marginBottom: 20
  // marginTop:35
  },
  title: {
   // padding:5,
    fontSize: 30,
    color: '#fff'
  },
  subtitle: {
    // padding:5,
    fontSize: 20,
    // marginBottom:5,
    color: '#fff'
  }
});
export default Weather;
