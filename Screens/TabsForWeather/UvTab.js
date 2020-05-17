import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { H1, Spinner} from "native-base";
import axios from "axios";

const UV_CUTOFF = 3

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
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
                    <H1> {currindex}</H1>
                    <Text style={{fontSize: 12}}>Current</Text>
                </View>
                {
                    forcast && (
                        <View style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
                            <H1> {maxToday}</H1>
                            <Text style={{fontSize: 12}}>Max Today at {maxUVTime.split(" ")[1]} </Text>
                            {
                                forcast[0].max_level > UV_CUTOFF ? (
                                    <Text>UV Index is high today</Text>
                                ) :  (
                                    <Text>UV Index is low today</Text>
                                )
                            }
                        </View>
                    )
                }
                {
                    forcast && (
                        forcast.slice(1).map((item, index) => {
                            return(
                                <View> 
                                    <Text>Day {index+1} Max</Text>
                                    <Text>{item.max_level}</Text>
                                </View>
                            )
                        })
                    )
                }
           </View>
            // <View style={{alignContent: "center"}}>
            //     {
            //         currindex== null? (
            //             <Spinner></Spinner>
            //         ) : (
            //         <H1>{currindex}</H1>
            //     )}
            // </View>
        )
    }
}

const styles = StyleSheet.create({})
