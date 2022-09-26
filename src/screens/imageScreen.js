import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseIcon from 'react-native-vector-icons/AntDesign';

function ImageScreen({navigation, route}) {
  const imageSrc = route.params.uri;
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSrc}} style={styles.imageStyle} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('fillSpark');
        }}
        style={{position: 'absolute', left: 0}}>
        <CloseIcon
          name="close"
          size={25}
          color="white"
          style={styles.closeicon}
        />
      </TouchableOpacity>
      <View style={styles.messagesendflex}>
        <TextInput
          style={styles.textinpustyle}
          placeholder="Type a Caption"></TextInput>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('fillSpark', {imagePath: imageSrc})
          }>
          <View style={styles.sendbutton}>
            <Icon name="send" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ImageScreen;
const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  messagesendflex: {
    width: '100%',
    paddingHorizontal: 10,
    // paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: 30,
  },
  textinpustyle: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  sendbutton: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeicon: {
    position: 'absolute',
    top: 30,
    left: 15,
  },
});
