import React,{Component} from 'react'
import {View,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {Icon} from 'react-native-elements'


export default class MenuItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log("NN", this.props.navigation)
        //return custom style imtes to main screen
        return(
            <TouchableOpacity style = {styles.menuItem} onPress={this.props.onSelect}>
            <View>
                {/* <Text>Hello</Text> */}
            <Icon name={this.props.icon} type='material-community' size={40} opacity={0.6}/>
            <Text style = {styles.nameIcon}>{this.props.iconName}</Text>
            {/* <Icon  source = {this.props.itemImage}
            style={styles.image}/> */}
            </View> 
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    menuItem: {
        width:'50%',
        backgroundColor:'#F3BA36',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-evenly",
        //marginLeft:10,
        //opacity:0.5,
        borderColor:"white",
        borderWidth:5,
        
    },
    image:{
        width:'100%',
        height:'100%',
        opacity:0.3,
        // alignItems: 'center'
        //borderColor:"#F3BA36",
        //borderWidth:3
    },
    nameIcon:{
        fontSize: 15,
        textAlign:'center',
       // flex: 1,
        //flexWrap: 'wrap'      
    }
})