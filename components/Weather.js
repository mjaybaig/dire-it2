import React from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import { weatherConditions } from '../constants/WeatherConditions';
import {Icon} from 'react-native-elements'
import TimeAgo from "./TimeSunSet"

const tem_CuttOff =30
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
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
        >
        <View style={{}}>
        <View style={styles.headerContainer}>
          <Icon name= {weatherConditions[weather].icon} type='material-community' color={"#fff"} size={80}/>
          <Text style={styles.tempText}>{temperature}°C</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.tempText}>Max Temp </Text>
          <Text style={styles.tempText}>{temperatureMax}°C</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.tempText}>Min Temp </Text>
          <Text style={styles.tempText}>{temperatureMin}°C</Text>
        </View>
        </View>
        <View style={{marginTop:20}}>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}({weatherDesc})</Text>
          <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>         

          {
            temperature > tem_CuttOff ? (
              <View style={{padding:5}} >
              <Text style={styles.subtitle}>- Limit Outdoor actitivity to the the coolest part of the day</Text>
              <Text style={styles.subtitle}>- Protect yourself from the sun when outside by covering exposed skin, using sunscreen and wear a hat.</Text>
              <Text style={styles.subtitle}>- ‘Seek’ shade and ‘slide’ on some sunglasses</Text>
              </View>
              ): temperature < min_temCutoff ?(
                <Text style={styles.subtitle}>Temprature is  low, Take along an emergency kit and blankets in your car in case of a breakdown or accident </Text>
                ):(
                  <Text style={styles.subtitle}>Please click on the "More" button for a detailed tips of how keep your self safe</Text>
                  )
                }
        </View>
      </View>
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
    flexDirection: 'row',
   alignItems: 'center',
   justifyContent: "space-evenly"
  },
  tempText: {
    fontSize: 30,
    color: '#fff'
  },
  bodyContainer: {
   // flex: 2,
//    alignItems: 'flex-start',
   // justifyContent: 'flex-end',
   // paddingLeft: 25,
   // marginBottom: 20
   marginTop:30
  },
  title: {
    padding:5,
    fontSize: 30,
    color: '#fff'
  },
  subtitle: {
    padding:5,
    fontSize: 20,
    marginBottom:5,
    color: '#fff'
  }
});
export default Weather;
