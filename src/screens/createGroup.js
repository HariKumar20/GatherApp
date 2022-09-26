import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../../App';
import database from '@react-native-firebase/database';

function CreateGroup({navigation, route}) {
  const {imageSource, setImageSource} = useContext(UserContext);
  const {selectedContactsListForGroup, setSelectedContactsListForGroup} =
    useContext(UserContext);
  const {groupName, setGroupName} = useContext(UserContext);
  const {groupDescription, setGroupDescription} = useContext(UserContext);
  const {groupsList, setGroupsList} = useContext(UserContext);
  useEffect(() => {
    setSelectedContactsListForGroup(route.params.selectedContacts);
  }, []);

  const selectImage = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      mediaType: 'mixed',
    };

    launchImageLibrary(options, response => {
      console.log({response});

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response['assets'][0]['uri'];
        setImageSource(source);
        console.log({source});
      }
    });
  };

  const groupsFirebase = (groupNameData, imageSource) => {
    const newReference = database().ref('/groups').push();
    console.log('New Reference Key : ', newReference);
    newReference
      .set({
        groupName: groupNameData,
        groupImage: imageSource,
      })
      .then(() => console.log('Data Updated!'));
  };

  return (
    <View style={styles.createGroupBody}>
      {imageSource == null ? (
        <Image
          source={require('../images/b.png')}
          style={styles.imagestyling}
        />
      ) : (
        <Image source={{uri: imageSource}} style={styles.imagestyling} />
      )}
      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.addPhototext}>Add Group Photo</Text>
      </TouchableOpacity>
      <View style={styles.textinputview}>
        <TextInput
          style={styles.textInputStyling}
          placeholder="Enter Group Name"
          onChangeText={value => {
            if (value.trim().length != 0) {
              setGroupName(value);
            }
          }}
        />
        <TextInput
          style={styles.textInputStyling}
          placeholder="Group Description....."
          onChangeText={value => {
            if (value.trim().length != 0) {
              setGroupDescription(value);
            }
          }}
        />
      </View>

      <View style={styles.createbuttonflex}>
        <TouchableOpacity
          onPress={() => {
            groupsFirebase(groupName, imageSource);
            setGroupsList(item => {
              item.push({gName: groupName, gImage: imageSource});
              return item;
            });
            if (groupName && groupDescription) {
              navigation.navigate('noContacts');
            }
          }}>
          <View style={styles.creategroupbutton}>
            <Text style={styles.creategrouptext}>Create Group</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateGroup;

const styles = StyleSheet.create({
  createGroupBody: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 21,
    backgroundColor: 'white',
    borderTopColor: 'rgba(151, 151, 151,0.1)',
    borderTopWidth: 1,
  },
  createGroupHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
    marginBottom: 36,
  },
  heading: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Raleway-SemiBold',
  },
  imagestyling: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  textInputStyling: {
    borderRadius: 10,
    backgroundColor: 'rgb(239 ,241 ,244)',
    marginBottom: 22,
    marginHorizontal: 25,
    fontFamily: 'Raleway-Medium',
    paddingHorizontal: 14,
  },
  addPhototext: {
    fontSize: 13,
    color: 'rgb(74, 144 ,226)',
    marginBottom: 45,
    fontFamily: 'Raleway-Medium',
    fontWeight: 'bold',
  },
  textinputview: {
    width: '100%',
  },
  headingview: {
    width: '100%',
  },
  iconstyle: {
    marginLeft: 10,
  },
  creategroupbutton: {
    marginHorizontal: 20,
    backgroundColor: 'rgb(10, 158 ,136)',
    alignItems: 'center',
    borderRadius: 6,
  },
  createbuttonflex: {
    width: '100%',
  },
  creategrouptext: {
    marginVertical: 10,
    fontSize: 18,
    color: 'white',
  },
});
