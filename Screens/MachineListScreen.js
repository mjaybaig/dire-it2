import React, {Component} from "react";
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard} from "react-native";
import {SearchBar} from "react-native-elements";
import _ from 'lodash'

import MachineGrid from "../components/MachineGrid"
import MACHINECATEGORY from "../data/machineDetail"

export default class MachineListScreen extends Component {
    //initialed variables for the search operation
    constructor(props){
        super(props);
        this.state = {
            data:[],
            fullData:[],
            loading: false,
            error: null,
        }
    }
    hideKeyboard(){
        Keyboard.dismiss()
    }
    //will load every time
     componentDidMount(){
         this.getData()
     }
     //using debounce to render input with delay so that the list is not filitred for every workd typed
     getData = _.debounce(() =>{
        this.setState({loading :true})
        const machine = MACHINECATEGORY
        this.setState({
            loading: false,
            data: machine,
            fullData: machine,
            //query:""
        })
     },250 ) 
     //as the name indacts footer 
    renderFooter = () => {
        if(!this.state.loading) return null
        return (
            <View
            style ={{
                paddingVertical :20,
                borderTopWidth:1
            }}>
            <ActivityIndicator animating size = "large"/>
            </View>
        )
    }
    
     renderHeader = () =>{
        const { data,text } = this.state;  
        return <SearchBar placeholder ="Search Here" 
        lightTheme round editable= {true}
        onChangeText = {this.handelSearch}
        value = {data,text}
       />
    }
    //search fucntion to handle shearch by converting all entry to loawer cace while comparing
    handelSearch = (text) => {
        const formatedQuery = text.toLowerCase()
         const data = _.filter(this.state.fullData, photo => {
             if(photo.title.toLowerCase().includes(formatedQuery)){
                 return true
             }
             return false
         })
         this.setState({data,text})
      }
    render(){

    //calling the machine grid to get the layout and passing to Detail sceen
    //By forwarding the ID so only the machine slected is diplayed
    const renderGridItem = itemData => {
        return <MachineGrid 
        title = {itemData.item.title}
        color = {itemData.item.color}
        image = {itemData.item.imageUrl}
        onSelect = {() => {
            this.props.navigation.navigate({
                routeName: "MachineDetail",
                params:{
                    categoryId: itemData.item.id
                }
            })
        }}
        />
    }
    //Flatlist gives us the item property
    // KeyExtractor (unique id maping) is not required for the latest verstion of react
    //using it for my refrence
   return ( 
       this.state.data.length > 0 ? (
           <View>

           <TouchableWithoutFeedback onPress={this.hideKeyboard}>
               <FlatList 
               ListHeaderComponent = {this.renderHeader}
               style = {styles.back}
               // keyExtractor={(item, index) => item.id} 
               data={this.state.data}
               renderItem={renderGridItem}
               numColumns={1}
               ListFooterComponent={this.renderFooter}
               />
           </TouchableWithoutFeedback>
               </View>
           ) : (
               <View>
                    <TouchableWithoutFeedback onPress={this.hideKeyboard}>
                        <FlatList 
                        ListHeaderComponent = {this.renderHeader}
                        style = {styles.back}
                        // keyExtractor={(item, index) => item.id} 
                        data={[]}
                        renderItem={renderGridItem}
                        numColumns={1}
                        ListFooterComponent={this.renderFooter}
                        />
            </TouchableWithoutFeedback>
                        <Text style={styles.nomatch}>No match found. We are still in the process of adding machines</Text>
               </View>
           ) 
) 
}}

const styles = StyleSheet.create({
    back:{
        backgroundColor:"white"
    },
    nomatch: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15
    }
})
