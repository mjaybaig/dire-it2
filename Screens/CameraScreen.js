import React,{Component} from 'react'
import{View,StyleSheet,Button,Image} from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class  CameraScreen extends Component{

constructor(props){
    super(props)
    this.state = {
        pickedImage:null,
    }
}    

     takeImageHandler = () =>{
          
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({

                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    pickedImage: source,
                  });
            }
          }); 
          
        
    }
    render(){
    return (
        <View style={this.styles.imagePicker}>
          <View style={this.styles.imagePreview}>
            {!this.state.whichMachineName ? (
  
              <View style={{alignItems: "center"}}>
  
                <IconButton
                  icon="camera"
                  color={Color.hedTint}
                  size={100}
                  onPress={this.takeImageHandler}
              />
              <Button onPress={this.takeImageHandler} color={Color.hedTint}>Tap to take photo</Button>
              </View>
              ) : (
                <Image style={this.styles.image} source={this.state.pickedImage}></Image>
              )}
          </View>
          {!this.state.whichMachineName ? (
            <Text></Text>
            ):(
              <Card style={this.styles.resultCard}>
              <Card.Title title={this.state.whichMachineName.concat(" detected")} subtitle={"We guess that the picture above is of a".concat(this.state.whichMachineName)} />
              <Card.Content>
                <View>
                  <Text>Because this feature is new, we may have guessed wrong. If the image above is blurry or unclear, please take a clear image and try again.</Text>
                </View>
              </Card.Content>
              <Card.Actions style={{justifyContent: "flex-end"}}>
                <Button
                  icon="camera"
                  style={this.styles.btnStyle}
                  mode="outlined"
                  color={Colors.hedTint}
                  onPress={this.takeImageHandler}
                  disabled={!this.state.isModelReady}
                  >
                  Retake Picture</Button>
                <Button 
                  style={this.styles.btnStyle}
                  mode="contained"
                  color={Color.hedTint}
                  // color={Colors.accentColor}
                  onPress={() => {
                    this.props.navigation.navigate({
                      routeName: 'MachinePrecautions',
                      params: {
                        categoryId: parseInt(this.state.whichMachineId)
                      }
                    })
                  }} 
                  >
                    Safety Rules
                  </Button>
                </Card.Actions>
              </Card>
            )
          }
          {
            !this.state.pickedImage &&(
              // <Text>Hello</Text>
              <Card style={{width: '90%'}}>
                <ListItem style={this.styles.instructions}  bottomDivider key={1} title="Take a photo with a clear view of the machine"/>
                <ListItem style={this.styles.instructions} bottomDivider key={2} title="Make sure the picture is not blurry"/>
                <ListItem style={this.styles.instructions} bottomDivider key={4} title="Try to have a good lighting"/>
              </Card> 
            // </View>
            )
          }
        </View>
  
      );
    }
  
    styles = StyleSheet.create({
        imagePicker: {
          alignItems: 'center',
          marginBottom: 15
        },
        resultCard: {
          width: '100%'
        },
        instructions: {
          fontSize: 9
        },
        imagePreview: {
          width: '100%',
          height: 350,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#ccc',
          padding: 5,
          borderWidth: 1
        },
        btnStyle: {
          marginLeft: 5
        },
        image: {
          width: '100%',
          height: '100%'
        },
        textDisc:{
          padding:10,
          fontWeight:"bold", 
          shadowColor: "black",
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 6,
          elevation: 3,
          backgroundColor:"#FAE5B6"
        },
        gridItem: {
          flex: 1,
          marginTop:10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight:10,
          height: 200,
        }
    });
  }
  
  CameraScreen.navigationOptions = (navigationData) => {
    return {
      headerTitle: "Machine Detector"
    }
  }