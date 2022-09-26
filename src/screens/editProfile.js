import React from 'react';
import {Text, View, StyleSheet, Image, TextInput} from 'react-native';
import {StatusBar} from 'react-native';

function EditProfile() {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(6, 51, 164)'}}>
      <StatusBar backgroundColor="rgb(66,101,170)" barStyle="light-content" />
      <Text style={styles.laststeptext}>Last Step!</Text>
      <Text style={styles.completeprofiletext}>Complete Your Profile</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="First Name"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Last Name"
        placeholderTextColor="grey"
      />
      <Image style={styles.imagestyle} source={require('../images/b.png')} />
      <View style={styles.editprofileview}>
        <Text style={{fontSize: 16, color: 'white'}}>Edit Photo</Text>
      </View>
      <View style={styles.facebookview}>
        <Text style={{fontSize: 16, color: 'white'}}>Pull from Facebook</Text>
      </View>
      <View style={styles.getstartedview}>
        <Text style={{fontSize: 18, color: 'white'}}>Let's get started!</Text>
      </View>
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  editprofileview: {
    height: 50,
    width: 245,
    alignSelf: 'center',
    borderWidth: 2.5,
    backgroundColor: 'rgb(66,101,170)',
    borderColor: 'white',
    borderRadius: 22,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookview: {
    height: 50,
    width: 245,
    alignSelf: 'center',
    borderWidth: 2.5,
    backgroundColor: 'rgb(66,101,170)',
    borderColor: 'rgb(151,151,151)',
    borderRadius: 22,
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getstartedview: {
    height: 60,
    width: 295,
    borderWidth: 3,
    borderRadius: 28,
    backgroundColor: 'rgb(3,6,71)',
    alignSelf: 'center',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '18.7%',
  },
  textInputStyle: {
    width: 246,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(151,151,151)',
    marginTop: 45,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },
  imagestyle: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 40,
    marginTop: 30,
  },
  laststeptext: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  completeprofiletext: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    margin: 25,
  },
});
