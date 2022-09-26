import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

function GroupScreenHeader({navigation}) {
  return (
    <View style={styles.innerheaderview}>
      <Image
        source={require('../../images/b.png')}
        style={styles.imagestyling}></Image>
      <Text style={styles.headingtext}>Conversations</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('contactsList');
        }}>
        <Image
          style={styles.writeimagestyle}
          source={require('../../images/write.png')}></Image>
      </TouchableOpacity>
    </View>
  );
}

export default GroupScreenHeader;

const styles = StyleSheet.create({
  innerheaderview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imagestyling: {
    height: 30,
    width: 30,
    borderRadius: 26,
  },
  writeimagestyle: {
    height: 35,
    width: 35,
  },
  headingtext: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 1,
  },
});
