import React, { Component } from 'react'
import {Text} from 'native-base'
import moment from 'moment'

//impornted moment which helps in calculation tiem to current time and display is string

export default class Time extends Component {
   
   constructor(props){
       super(props)
       this.data = props.time
   }
    render() {
        //from now converts time to string this hour ago 
        //const time = moment(this.data || moment.now()).fromNow()
        console.log(this.data)
        const time = moment(this.data || moment.now()).toNow()
        
        return (
            <Text style={{fontSize:20, color:"white"}} note>Sun will set in {time}</Text>

        )
    }
}

