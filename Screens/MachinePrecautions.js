import React, {Component} from "react";
// import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform,Image} from "react-native";
import {StyleSheet, ScrollView } from "react-native";
import { Card, ListItem } from "react-native-elements";
import MACHINECATEGORY from "../data/machineDetail"

export default class MachinePrecautions extends Component {
    constructor(props){
        super(props);
        this.state = {
            catId: null,
            selectedCategory: null
        }
    }
    
    componentDidMount(){
        this.setState({
            catId: this.props.navigation.getParam("categoryId"),
        });
        console.log(this.state);
    }
    render(){
        this.selectedCategory = MACHINECATEGORY.find(cat => cat.id == this.state.catId)
        if(this.selectedCategory && this.selectedCategory != null){
            console.log(this.selectedCategory.comInjury);
        }
        // console.log(this.selectedCategory.imageUrl);
        // console.log(this.state)
        return(
            <ScrollView>

                {
                    this.selectedCategory &&
                    <Card title={this.selectedCategory.title}>

                        {/* <Image source={{uri: this.selectedCategory.imageUrl}}/> */}

                        {this.selectedCategory.precautions.map((l, i) => {
                            return <ListItem
                            key={i}
                            title={l} 
                            bottomDivider
                            />
                        })}
                        {/* </Text> */}
                        {/* <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />     */}
                </Card>

}
                {/* <Image source = {{uri: selectedCategory.imageUrl}} style={styles.image}/>
                <Text style = {styles.title}>Description</Text>
                <Text> 
                </Text>
                <Text style = {styles.title}>Common Injuries</Text>
                <Text > 
            </Text> */}
        </ScrollView>
            // </View>
        )
    }
}


 MachinePrecautions.navigationOptions = (navigationData) =>{
    const catId = navigationData.navigation.getParam("categoryId");
    return {
        headerTitle: 'Safety Guidelines'
    }
 }
 
 const styles = StyleSheet.create({
    image:{
       width :'100%',
       height : 200
     },
     details:{
       flexDirection:"row",
       padding: 15,
       justifyContent:"space-around"
     },
     title:{
       fontSize:22,
       textAlign:'center',
       padding:12
     }
  });