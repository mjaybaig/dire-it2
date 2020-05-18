import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native";

export default class Weather extends Component{
    
    constructor(props){
        super(props)
    }

    dayOfWeekAsString(dayIndex) {
        return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
    }

    render(){
        let {day, value, cutoff} = this.props;
        console.log(cutoff, value)
        return(
            <View style={{flex: 1, justifyContent: 'space-around', backgroundColor: value > cutoff? 'red':'green'}}>
                <Text style={styles.uvTextStyle}>{this.dayOfWeekAsString(new Date(day).getDay())}</Text>
                <Text style={styles.uvTextStyle}>{value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uvTextStyle: {
        color: 'white',
        flex: 1,
        textAlign: 'center'
    }
})