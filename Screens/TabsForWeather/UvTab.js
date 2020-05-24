import React, { Component } from 'react'
import { Text, StyleSheet, View ,Modal,Button} from 'react-native'
import { H1, H3, Spinner, ListItem,Fab,Icon} from "native-base";
import axios from "axios";
import colors from '../../constants/Color'
import UVItem from "../../components/uvItem";
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const UV_CUTOFF = 2

export default class UvTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            currindex: null,
            forcast: null,
            maxUVTime: null,
            maxToday: null,
            modalVisible: false,

        }
    }
    componentDidMount(){
        let today = new Date()
        let myString = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
        axios.get(`https://dire-api.herokuapp.com/api/uv?date=${myString}`).then(res => {
            console.log("DATA", res.data);
            this.setState({
                currindex: res.data.current.CurrentUVIndex,
                maxToday: res.data.current.MaximumUVLevel,
                maxUVTime: res.data.current.MaximumUVLevelDateTime,
                forcast: res.data.forecast
            })
        }, err => {
            console.log(err);
        }, () => {
            console.log("Done");
        })
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    render() {
        let { currindex, forcast, maxToday, maxUVTime } = this.state;
        console.log(forcast)
        return (
            <View style={{flex:1}}>
            {

                !currindex ?
                <View style={styles.uvContainer}>
                <Spinner color={colors.accentColor} style={{justifyContent: 'center', alignItems: 'center', }}></Spinner>
            </View> : 
            <View style={styles.uvContainer}>
                <View style={{height: '60%'}}>
                    <View style={styles.textContainer}>
                        <Text style={styles.uvText}>Current</Text>
                        <Text style={styles.uvText}>{currindex}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.uvText}>Today's Max.</Text>
                        <Text style={styles.uvText}>{maxToday}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <H3 style={styles.uvText}>Forcast for coming days</H3>
                    </View>
                    <View style={styles.textContainer}>
                        {
                            forcast.map((item, index) => {
                                return(
                                    <UVItem cutoff={UV_CUTOFF} value={item.max_level} day={item.date_start}></UVItem>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{height: '40%'}}>
                        {
                            maxToday > UV_CUTOFF ? 
                            <ScrollView>
                                <H1 style={styles.suggHeader}>If you must be out</H1>
                                <ListItem>
                                    <Text style={styles.listText}>Slip on a shirt</Text>
                                </ListItem>
                                <ListItem>
                                    <Text style={styles.listText}>Slop on sunscreen, sunscreen should be applied every two hours, even on cloudy days, and reapplied after sweating.</Text>
                                </ListItem>
                                <ListItem>
                                    <Text style={styles.listText}>Slap on a hat.</Text>
                                </ListItem>
                                <ListItem>
                                    <Text style={styles.listText}>Wrap on sunglasses to protect the eyes and skin around them.</Text>
                                </ListItem>
                            </ScrollView> : 
                            <ScrollView>
                                <Text style={styles.suggHeader}>Today seems a great safe day to go out!</Text>
                            </ScrollView>
                        }

                 </View>
            </View>

}
    <View style={{height:"16.5%", backgroundColor:"black"}}>
<Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      alert('Modal has been closed.');
                    }}>
                      <View style={{backgroundColor:"#FAE5B6",height:"100%"}}>
                      <View style={{alignItems:"center",height:"60%",marginTop:20}}>
                      <Text style={{fontSize:30, marginBottom:40}}>What is U.V. Radiation</Text>
                      <View style={{marginTop:20,marginBottom:30 }}>
                      <FontAwesome5 solid name="radiation-alt" style={{color:"#ADD8E6", fontSize:80}}/>
                      </View>
                      <View style={{marginTop:30,padding:10,justifyContent: 'center'}}>
                      <Text style={{fontSize:25,textAlignVertical: "center",textAlign: "center"}}>It's harmful radiation emitted by the sun. If the UV reading is above 3, wear sunscreen. On higher readings, avoid going out</Text>
                      </View>
                      </View>
                      <View style={{padding:60}}>
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
                  style={{ backgroundColor: '#808080' }}
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
    uvContainer: {
        //flex: 1,
        height:"87%",
        backgroundColor: 'black'
    },
    uvText: {
        fontSize: 30,
        color: '#fff',
        padding: 15,
    },
    textContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    } ,
    listText: {
        color: 'white',
        fontSize: 17
    } ,
    suggHeader: {
        textAlign: 'center',
        padding: 10,
        fontSize: 25,
        color: 'white'
    }
})
