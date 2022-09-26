import {firebase} from '@react-native-firebase/auth';
import React, {useContext} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../App';
import HorizontalRow from '../horizontalRow';
import database from '@react-native-firebase/database';

function FillSparkHeader({navigation, answeredFlag}) {
  const {sparkImageSrc} = useContext(UserContext);
  const {answersObject} = useContext(UserContext);
  const firebaseSpark = () => {
    database().ref('/filledSpark').push().set({
      filledSparkData: answersObject,
    });
  };
  return (
    <View>
      <View style={styles.fillsparkheaderview}>
        <TouchableOpacity onPress={() => navigation.navigate('sparkScreen')}>
          <Icon name="angle-left" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.fillsparkview}>
          <Text style={styles.fillsparktext}>Fill Spark</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            firebaseSpark();
            navigation.navigate('shareScreen');
          }}
          disabled={sparkImageSrc && answeredFlag ? false : true}>
          <View
            style={
              sparkImageSrc && answeredFlag
                ? styles.sharebutton
                : styles.opacitysharebutton
            }>
            <Text style={styles.sharetext}>SHARE</Text>
          </View>
        </TouchableOpacity>
      </View>
      <HorizontalRow borderWidthUnits={0.8} borderColorUnits="grey" />
    </View>
  );
}

export default FillSparkHeader;

const styles = StyleSheet.create({
  fillsparkheaderview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sharebutton: {
    backgroundColor: 'rgb(10 ,158 ,136)',
    borderRadius: 2,
  },
  opacitysharebutton: {
    backgroundColor: 'rgb(10 ,158 ,136)',
    borderRadius: 2,
    opacity: 0.5,
  },
  sharetext: {
    color: 'white',
    size: 11,
    fontFamily: 'Raleway-ExtraBold',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  fillsparktext: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color: 'black',
  },
});
