import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {StatusBar} from 'react-native';
function MyProfile() {
  return (
    <View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerflex}>
        <Icon name="arrowleft" size={30} />
        <View style={styles.profiletextflex}>
          <Text style={styles.myprofiletext}>My Profile</Text>
        </View>
      </View>

      <View style={styles.profilenameview}>
        <View style={styles.pictureandnameview}>
          <Image
            style={styles.profilestyling}
            source={require('../images/b.png')}></Image>
          <View style={styles.profilenameflex}>
            <Text style={styles.profilenametext}>Michael Smith</Text>
          </View>
        </View>
        <View style={styles.edittextflex}>
          <Text style={styles.edittext}>Edit</Text>
        </View>
      </View>
      <View style={styles.horizontalrow}></View>
      <View style={styles.contentsview}>
        <Text style={styles.contentstext}>Share Gather with a friend</Text>
        <Text style={styles.contentstext}>About Gather</Text>
        <Text style={styles.contentstext}>Privacy Policy</Text>
      </View>
    </View>
  );
}

export default MyProfile;

const styles = StyleSheet.create({
  headerflex: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 30,
  },
  myprofiletext: {
    fontSize: 20,
    color: 'black',
  },
  profiletextflex: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
  },
  profilenameview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 23,
    marginTop: 50,
    marginBottom: 50,
  },
  profilenametext: {
    marginLeft: 20,
    fontSize: 20,
    color: 'steelblue',
  },

  profilestyling: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  pictureandnameview: {
    flexDirection: 'row',
  },
  edittext: {
    fontSize: 15,
  },
  profilenameflex: {
    justifyContent: 'center',
  },
  edittextflex: {
    justifyContent: 'center',
  },
  horizontalrow: {
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  contentsview: {
    marginLeft: 25,
    marginTop: 35,
  },
  contentstext: {
    fontSize: 20,
    color: 'steelblue',
    marginBottom: 15,
  },
});
