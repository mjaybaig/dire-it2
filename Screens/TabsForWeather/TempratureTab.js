import React, { Component } from 'react'
import { StyleSheet , Button,View, Modal, Text, TouchableHighlight} from 'react-native'
import { Icon, Fab,Container, Tab,List,ListItem} from "native-base";
import axios from "axios";
import Geolocation from 'react-native-geolocation-service'
import Weather  from "../../components/Weather"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Temp_CUTOFF = 40

export default class TempratureTab extends Component {
    constructor(props){
        super(props);
        this.screens = ['tempHelpScreen']
        this.state = {
            isLoading: true,
            temperature: 0,
            weatherCondition: null,
            temperatureMin:0,
            temperatureMax:0,
            forcasts: null,
            weatherDesc:null,
            error: null,
            sunSet:0,
            active: false,
            modalVisible: false,


        }
    }
    componentDidMount(){
     Geolocation.getCurrentPosition(res => {
      let { latitude, longitude } = res.coords
      console.log(latitude)      
      console.log(longitude)

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=0dba61d449723272020556ebeefc2479&units=metric`)
      .then(tempdata => tempdata.json()).then(json => {
          this.setState({
            temperature: json.main.temp,
            temperatureMin: json.main.temp_min,
            temperatureMax: json.main.temp_max,
            weatherCondition: json.weather[0].main,
            weatherDesc:json.weather[0].description,
            sunSet: json.sys.sunset,
            isLoading:false
          })
      })
      axios.get(`https://dire-api.herokuapp.com/api/daily?lat=${latitude}&long=${longitude}`).then(tempdata => {
        //let { temp_max } = tempdata.data.data[0];
       // let temp_min = tempdata.data.data[0].now.temp_min;
        let forecasts = tempdata.data.data.slice(1)
        let weatherType = forecasts.slice(0,3).map(obj => obj.icon_descriptor)
        let forecastTemps = forecasts.slice(0, 3).map(obj => { return {'minTemp': obj.temp_min, 'maxTemp': obj.temp_max}})
        this.setState({
          forcasts: forecastTemps,
        });
      })

    }, err => {
      console.log("ERRRR", err);
    })
    
    
        
        // let today = new Date();
        // console.log(today.getDay())
        // let tomor = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)
        // console.log(tomor.getDay())
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    
    render() {
        const { isLoading, weatherCondition, temperature,temperatureMin,temperatureMax, forcasts,weatherDesc,sunSet} = this.state;
        console.log(this.state)       

        return (
          <View style={styles.container}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Fetching The Weather</Text>
              </View>
            ) : (
              <Weather weather={weatherCondition} temperature={temperature} 
               temperatureMin={temperatureMin} temperatureMax={temperatureMax} forcasts={forcasts} weatherDesc={weatherDesc} sunSet={sunSet} />
            )} 
            <View style={{}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
            
            <View style={{backgroundColor:"#FAE5B6",flex:1}}>
            <View style={{alignItems:"center",flex:1,marginTop:20}}>
            <Text style={{fontSize:30, marginBottom:20}}>Introduction to Weather</Text>
            <View style={{marginTop:20,marginBottom:20 }}>
            <FontAwesome5 solid name="cloud" style={{color:"#ADD8E6", fontSize:80}}/>
            </View>
            <View style={{}}>
              <List>
                <ListItem>
            <Text style={{fontSize:20}}>In this section, you can find the current outdoor temperature, as well as the minimum and maximum temperatures for today.</Text>
            </ListItem>
            <ListItem>
              <Text style={{fontSize:20}}>Please be mindful of heat. Tap the first-aid section tips on treating yourself from any heat related injuries </Text>
            </ListItem>
              </List>
            </View>
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
      <View style={{}}>
      <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor:'#808080',opacity:0.4}}
        position="bottomRight"
        onPress={() => {
          this.setModalVisible(true);
        }}>
            <Icon name="help" />
        </Fab>
        </View>
       </View> 
      </View>
        );
      }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFDE4'
    },
    loadingText: {
      fontSize: 30
    }
  });





// import React, { Component } from 'react'
// import { StyleSheet, View } from 'react-native'
// import { H1, Text } from "native-base";
// import axios from "axios";
// import Geolocation from 'react-native-geolocation-service'
// import {Icon} from 'react-native-elements'


// const Temp_CUTOFF = 3

// export default class TempratureTab extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             'currtemp': null,
//             maxTemp: null,
//             forcasts: null,
//             weatherName:[]
//         }
//     }
//     componentDidMount(){
//      Geolocation.getCurrentPosition(res => {
//       let { latitude, longitude } = res.coords
//       axios.get(`https://dire-api.herokuapp.com/api/daily?lat=${latitude}&long=${longitude}`).then(tempdata => {
//         let { temp_max } = tempdata.data.data[0];
//         let temp_min = tempdata.data.data[0].now.temp_min;
//         let forecasts = tempdata.data.data.slice(1)
//         let weatherType = forecasts.slice(0,3).map(obj => obj.icon_descriptor)
//         let forecastTemps = forecasts.slice(0, 3).map(obj => { return {'outlook':obj.icon_descriptor, 'minTemp': obj.temp_min, 'maxTemp': obj.temp_max}})
//         this.setState({
//           maxTemp: temp_max,
//           minTemp: temp_min,
//           forcasts: forecastTemps,
//           weatherName:weatherType
//         });
//       })
//     }, err => {
//       console.log("ERRRR", err);
//     })
//         axios.get('http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json').then(response => {
//             let data = response.data['observations']['data'][0]
//             this.setState({
//                 'currtemp': data.air_temp
//             })
//         })
//         // let today = new Date();
//         // console.log(today.getDay())
//         // let tomor = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)
//         // console.log(tomor.getDay())
//     }
    
    
//     render() {
//         //let {forecastTemps } = this.state;
//         let {currtemp} = this.state;
//         let { maxTemp, forcasts,weatherName } = this.state;
//        // console.log(this.state.weatherName)
//         console.log(this.state)
//         return (
//                 <View style={styles.weatherContainer}>
//                 <Icon name= "weather-sunny" type='material-community' color={"#fff"} size={80}/>
//                 <View style={styles.headerContainer} >
//             {
//                 currtemp &&(   
//                 <View style={{alignItems:"center",width:"50%",flex:1}}>
//                 <Text style={styles.tempText}>Current Temp</Text>
//                 <Text style={styles.tempText}>{currtemp}</Text>
//                 </View>
//                 )
//             }
//                 {
//                 maxTemp&& (
                    
//                 <View style={{alignItems:"center",width:"50%",flex:1}}>
//                 <Text style={styles.tempText}>Max Temp</Text>
//                 <Text style={styles.tempText}>{maxTemp}</Text>
//                 </View>
//             )}
//             </View>
//             <View style={{marginTop:"10%"}}>
//                 { forcasts &&
//                  forcasts.map((temps, i) => {
//                      return (<View key={i} style={{ flexDirection:"row", alignItems: 'center',justifyContent: "space-between",flexDirection:"row"}}>
//                                     <View style={{alignItems:"center",width:"50%",flex:1}}>
//                                     <Text style={styles.forcastText}>Day {i+1} Max:</Text>
//                                     <Text style={styles.forcastText}>{temps.maxTemp}</Text>
//                                     </View>
//                                     <View style={{alignItems:"center",width:"50%",flex:1}}>
//                                     <Text style={styles.forcastText}>Day {i+1} Min:</Text>
//                                     <Text style={styles.forcastText}>{temps.minTemp}</Text>
//                                     </View>
//                                 </View>)
//                 })}
//                 </View>
//                 <View style={styles.bodyContainer}>
//                 {/*Since the API is called every time, the first element of the array is replaced with the current weather state */}
//                 <Text style={styles.title}>{weatherName[0]}</Text>
//                 {
//                 maxTemp> Temp_CUTOFF ? (
//                     <Text style={styles.subtitle}>Temperature is to high stay hydrated</Text>               
//                     ): (
//                     <Text style={styles.subtitle}>Maximum Temerature is {maxTemp}........</Text>
//                     )
//                  }
//                  </View>
                           
//                     </View>

//                     // {/* {
//                     //     currtemp &&
//                     //     (       <View style={{flexDirection:"row",justifyContent:"space-between"}}>
//                     //             <Text style={{fontSize: 12}}>Current{"\n"} <H1> {currtemp}°C</H1></Text>
                                    
//                     //             <Text style={{fontSize: 12}}>Max</Text>
//                     //                 <H1> {maxTemp}°C</H1>
//                     //             </View>
//                     //     )
//                     // }
//                     //     { forcasts &&
//                     //         forcasts.map((temps, i) => {
//                     //             return (<View key={i} style={{marginRight:20}}>
//                     //                 <Text>Day {i+1} Max: </Text>
//                     //                 <Text> {temps.maxTemp} </Text>
//                     //                 <Text>Day {i+1} Min: </Text>
//                     //                 <Text> {temps.minTemp} </Text>
//                     //             </View>)
//                     //         })} */}
//         )
//     }
// }

// const styles = StyleSheet.create({
//     weatherContainer: {
//         flex: 1,
//         backgroundColor: '#f7b733', 

//       },
//       headerContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: "space-between",
//         flexDirection:"row",


//       },
//       tempText: {
//         fontSize: 30,
//         color: '#fff'
//       },
//       forcastText:{
//         fontSize: 20,
//         color: '#fff'
//       },
//       bodyContainer: {
//         flex: 2,
//         alignItems: 'flex-start',
//         justifyContent: 'flex-end',
//         paddingLeft: 25,
//         marginBottom: 40
//       },
//       title: {
//         fontSize: 40,
//         color: '#fff'
//       },
//       subtitle: {
//         fontSize: 20,
//         color: '#fff'
//       }

// })
