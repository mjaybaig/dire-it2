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
                     this.data.urlToImage : "https://images.unsplash.com/photo-1506092490682-b2cc6b651308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}} />
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
                <Button transparent onPress={this.handlePress}>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
    )
}
}

 
