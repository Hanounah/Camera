import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.simport React, { useState, useEffect ,useRef} from 'react';
    import { Text, View, TouchableOpacity , StyleSheet,SafeAreaView, TouchableOpacityProps, Modal , Image } from 'react-native';
    import { Camera } from 'expo-camera';
    import { FontAwesome } from '@expo/vector-icons';
    
    export default function App() {
      const camRef = useRef(null);
      const [hasPermission, setHasPermission] = useState(null);
      const [type, setType] = useState(Camera.Constants.Type.back);
      const [capturedPhoto , setCapturedPhoto] = useState(null);
      const [open , SetOpen] = useState(false);
    
      useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
    async function takePicture(){
      if (camRef){
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri);
        SetOpen(true);
        console.log(data);
      }
    }
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Camera
           style={{ flex: 1 }}
            type={type}
            ref ={camRef}
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                 bottom: 20,
                  left:20,
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
                >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Trocar </Text>
              </TouchableOpacity>
            </View>
          </Camera>
    
    <TouchableOpacity style={styles.button}onPress={ takePicture}>
    <FontAwesome name ="window-close"size={23}color="#fff"/>
      </TouchableOpacity>
    
      {capturedPhoto &&
      <Modal
      animationType ="slide"
      transparent={false}
      visible={open}
      >
    <View style={{flex: 1, justifyContent:'center', alignItems:'center', margin :20}}>
    <TouchableOpacity style={styles.button}onPress={ takePicture}>
    <FontAwesome name ="window-close"size={50}color="#fff"/>
      </TouchableOpacity>
    
    <Image
    style={{ width: '100%', height:300,borderRadius:20}}
    source={{uri :capturedPhoto}}
    />
        </View>
        </Modal>
    }
    </SafeAreaView>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex:1,
        justifyContent :'center',
      },
      button:{
        justifyContent:'center',
        alignItems :'center',
        margin :20 ,
        borderRadius:10,
        height :50
      }
    });howImagePicker(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };

  // Launch Camera
  cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
  }

  imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
  }  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.resourcePath.uri }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.resourcePath.uri}
          </Text>

          <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
              <Text style={styles.buttonText}>Launch Camera Directly</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.imageGalleryLaunch} style={styles.button}  >
              <Text style={styles.buttonText}>Launch Image Gallery Directly</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});