import React,{Component} from 'react'
import{ListItem,Left,Thumbnail,Body,Button,Text,Right} from 'native-base'
import{View} from 'react-native'
import TimeAgo from './time'
export default class Newsitem extends Component{

constructor(props){
    super(props)
    this.data = props.data
}
handlePress = () =>{
    const {url, title} = this.data
    this.props.onPress({url, title })
}

render(){
    console.log(this.data.publishedAt)
    return(
        <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: this.data.urlToImage != null ?
                     this.data.urlToImage : "https://pixabay.com/get/54e6d0424956aa14f1dc8460da2932761c3ddfe5515178_640.jpg"}} />
              </Left>
              <Body>
                <Text numberOfLines={2}>{this.data.title} </Text>
                <Text note numberOfLines={2}>{this.data.description}</Text>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0}}>
                    <Text note>{this.data.source.name}</Text>
                    <TimeAgo time={this.data.publishedAt}/>
                </View>
              </Body>
              <Right>
                <Button transparent onPress={this.handlePress}  style={{backgroundColor:"#F3BA36"}}>
                  <Text style={{color:"white"}}>View</Text>
                </Button>
              </Right>
            </ListItem>
    )
}
}

 
