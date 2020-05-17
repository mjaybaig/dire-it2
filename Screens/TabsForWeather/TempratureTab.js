import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { H1, Text, Icon } from "native-base";
import axios from "axios";

export default class TempratureTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            'currtemp': null,
        }
    }
    componentDidMount(){
        axios.get('http://www.bom.gov.au/fwo/IDV60901/IDV60901.95936.json').then(response => {
            let data = response.data['observations']['data'][0]
            this.setState({
                'currtemp': data.air_temp
            })
        })
    }
    
    
    render() {
        let {currtemp} = this.state;
        let { maxTemp, minTemp, forcasts } = this.props;
        return (
            // <View>
                <View>
                <View style={{flexDirection: 'column'}}>
                    {
                        currtemp &&
                        (
                            // <View style={{flexDirection: 'row'}}>
                            <View style={{alignContent: 'stretch', flexDirection: "row"}}>
                                <View style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
                                    <H1> {currtemp}°C</H1>
                                    <Text style={{fontSize: 12}}>Current</Text>
                                </View>
                                <View style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
                                    <H1> {maxTemp}°C</H1>
                                    <Text style={{fontSize: 12}}>Max</Text>
                                </View>
                            </View>
                        )
                    }
                    <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                        {/* <Text>HELLO WORDL</Text> */}
                        { forcasts &&
                            forcasts.map((temps, i) => {
                                return (<View key={i}>
                                    <Text>Day {i+1} Max: </Text>
                                    <Text> {temps.maxTemp} </Text>
                                    <Text>Day {i+1} Min: </Text>
                                    <Text> {temps.minTemp} </Text>
                                </View>)
                            })}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
