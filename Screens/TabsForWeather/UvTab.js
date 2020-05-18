import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { H1, H3, Spinner, ListItem} from "native-base";
import axios from "axios";
import colors from '../../constants/Color'
import UVItem from "../../components/uvItem";
import { ScrollView } from 'react-native-gesture-handler';

const UV_CUTOFF = 2

export default class UvTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            currindex: null,
            forcast: null,
            maxUVTime: null,
            maxToday: null
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
    render() {
        let { currindex, forcast, maxToday, maxUVTime } = this.state;
        console.log(forcast)
        return (
            !currindex ? 
            <View style={styles.uvContainer}>
                <Spinner color={colors.accentColor} style={{justifyContent: 'center', alignItems: 'center', flex: 1}}></Spinner>
            </View> : 
            
            <View style={styles.uvContainer}>
                <View style={{height: '50%'}}>
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
                    <View style={{height: '50%'}}>
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
                        {/* {
                            forcast[0].max_level > UV_CUTOFF ? (
                                <Text>UV Index is high today</Text>
                                ) :  (
                                    <Text>UV Index is low today</Text>
                                )
                        } */}
            </View>
        //     <View style={{flex: 1, flexDirection: "row"}}>
        //         <View style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
        //             <H1> {currindex}</H1>
        //             <Text style={{fontSize: 12}}>Current</Text>
        //         </View>
        //         {
            //             forcast && (
                //                 forcast.slice(1).map((item, index) => {
                //                     return(
                //                         <View> 
                //                             <Text>Day {index+1} Max</Text>
                //                             <Text>{item.max_level}</Text>
                //                         </View>
                //                     )
                //                 })
        //             )
        //         }
        //    </View>
        )
    }
}

const styles = StyleSheet.create({
    uvContainer: {
        flex: 1,
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
