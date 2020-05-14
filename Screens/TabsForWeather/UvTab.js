import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import axios from "axios";

export default class UvTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            'currindex': null,
            'forcast': null
        }
    }
    componentDidMount(){
        let today = new Date()
        let myString = `${today.getDate()-1}-${today.getMonth()+1}-${today.getFullYear()}`;
        axios.get(`https://dire-api.herokuapp.com/?date=${myString}`).then(res => {
            console.log(res.data.current);
            this.setState({
                'currindex': res.data.current.CurrentUVIndex,
                'forecast': res.data.forecast
            })

            console.log(this.state)
        }, err => {
            console.log(err);
        }, () => {
            console.log("DOne");
        })
    }
    render() {
        let { currindex } = this.state;
        return (
            <View>
                {
                    currindex && 
                    <Text>{currindex}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({})
