import React, { Component } from "react";
import { Container, Header, Content, Icon, Accordion, View } from "native-base";
import{Linking,Button,Text} from "react-native"

const dataArray = [
  { title: "Heat rash – treatment",
   content1: "- Move the person to a cooler, less humid environment",
   content2: "- Keep the affected area dry",
   content3: "- Try using unperfumed talcum powder to increase comfort",
   content4: "- Avoid using ointments or creams, as they keep the skin warm and moist, and may make the condition worse",
   content5:"- Keep the skin clean with frequent baths or showers to prevent sweat glands from becoming clogged",
   content6:"- Click here to vist the Website for further details"
 },
 { title: "Heat cramps – treatment",
   content1: "- Stop activity and sit quietly in a cool place",
   content2: "- Increase fluid intake",
   content3: "- Rest a few hours before returning to activity",
   content4: "- Seek medical help if there is no improvement",
   content5:"- Practice gentle, range-of-motion stretching and gentle massage of the affected muscle group",
   content6:"- Click here to vist the Website for further details"

 },
  { title: "Dizziness/fainting – treatment", 
  content1: "- Get the person to a cool area and lay them down",
   content2: "- If fully conscious, increase fluid intake",
   content3:"- Drinking plenty of fluids can help when dizziness is caused by excessive heat or dehydration",
   content4: "- Avoid moving or switching positions suddenly",
   content5:"- Avoid long periods of standing still, dehydration, and spending a lot of time in hot environments",
   content6:"- Click here to vist the Website for further details"
},
  { title: "Heat exhaustion – treatment", 
  content1: "- Get the person to a cool area and lay them down",
   content2: "- Remove outer clothing",
   content3: "- Wet skin with cool water or wet clothes",
   content4: "- Increase fluid intake if they are fully conscious",
   content5:"- Seek medical advice",
   content6:"- Click here to vist the Website for further details"
  },
  { title: "Heatstroke – treatment", 
  content1: "- Get the person to a cool, shady area and lay them down while you’re waiting for emergency medical help",
  content2: "- Remove clothing and wet their skin with water, fanning continuously.",
  content3: "- Do not give the person fluids to drink",
  content4: "- Position an unconscious person on their side and clear their airway",
  content5: "- If medical attention is delayed, seek further instructions from ambulance or hospital emergency staff",
  content6:"- Click here to vist the Website for further details"
},
];

export default class AccordionCustomHeaderContent extends Component {
  _renderHeader(item, expanded) {
    return (
        <View style={{padding:5}}>
      <View style={{
                    fontSize:30,
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center" ,
          backgroundColor: "#F3BA36",
          marginTop:"5%",
        }}>
      <Text style={{ fontWeight: "600", fontSize:18 }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 20}} name="remove-circle" />
          : <Icon style={{ fontSize: 20 }} name="add-circle" />}
      </View>
          </View>
    );
  }
  _renderContent(item) {
    return (
        <View>
        <Text
        style={{
            backgroundColor: "#e3f1f1",
            padding: 10,
            justifyContent:"center"}}>
    {item.content1}
      </Text>
       <Text
       style={{
           backgroundColor: "#e3f1f1",
           padding: 10,
           }}>
    {item.content2}
     </Text>
     <Text
       style={{
           backgroundColor: "#e3f1f1",
           padding: 10,
           }}>
    {item.content3}
     </Text>
     <Text
       style={{
           backgroundColor: "#e3f1f1",
           padding: 10,
        }}>
    {item.content4}
     </Text>
     <Text
       style={{
           backgroundColor: "#e3f1f1",
           padding: 10,
           }}>
    {item.content5}
    </Text>
     <Text onPress={()=>
     {Linking.openURL('https://www.betterhealth.vic.gov.au/health/healthyliving/heat-stress-and-heat-related-illness')}} 
     style={{
      backgroundColor: "#e3f1f1",
      color:"blue",
      padding: 10,
      }}>
    {item.content6}
     </Text>
</View>
    );
  }
  render() {
    return (
      <Container>
        <Content  style={{ backgroundColor: "white" }}>
          <Accordion
            // ref={c => (this._accordion = c)}
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}
<br/>
AccordionCustomHeaderContent.navigationOptions = (navigationData) =>{
  const catId = navigationData.navigation.getParam("categoryId");
  return {
      headerTitle: 'Safety Guidelines'
  }
}