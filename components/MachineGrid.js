import React,{Component} from "react";
import { TouchableOpacity, View, Text, StyleSheet,ImageBackground } from "react-native";
import Colors from '../constants/Color'
//import {Card,Title,Avatar} from 'react-native-paper'
  export default class MachineGrid extends Component{
    render(){
      console.log(this.props);
      //const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    //creating a toucable screen and passing information to map list screen 
    return (
    <TouchableOpacity style={styles.gridItem} onPress={this.props.onSelect}>
      {/* <Card>
     <Card.Title title={this.props.title} left={LeftContent} />
      <Card.Content>
      </Card.Content>
      <Card.Cover source= {{uri:this.props.image}}/>
      </Card> */}
      
      <View style = {styles.container}>
      <ImageBackground source = {{uri: this.props.image}} style = {styles.bgImage}>
        <Text style={styles.title}>{this.props.title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
  }};


  // <Card>
  //   <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
  //   <Card.Content>
  //     <Title>Card title</Title>
  //     <Paragraph>Card content</Paragraph>
  //   </Card.Content>
  //   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  //   <Card.Actions>
  //     <Button>Cancel</Button>
  //     <Button>Ok</Button>
  //   </Card.Actions>
  // </Card>

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginBottom: 18,
    marginLeft: 6,
    marginRight:6,
    height: 200
  },
  container: {
    flex: 1,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 6,
    elevation: 3,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    //fontFamily: "open-sans-bold",
    textAlign: "right",
    fontSize: 18,
    color:Colors.hedTint,
    //color with built in transparency
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical : 5,
    paddingHorizontal:12,
  },
  bgImage:{
    width:"100%",
    height:"100%",
    justifyContent:"flex-end",

}
});

