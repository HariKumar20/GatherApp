import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalRow from '../horizontalRow';

function SparkScreenHeader({navigation}) {
  return (
    <View>
      <View style={styles.headerview}>
        <TouchableOpacity onPress={() => navigation.navigate('noContacts')}>
          <Icon name="angle-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headingtext}>College Buds</Text>
        <Icon name="info" size={25} color="black" />
      </View>
      <HorizontalRow borderColorUnits="grey" borderWidthUnits={0.7} />
    </View>
  );
}
export default SparkScreenHeader;
const styles = StyleSheet.create({
  headerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  headingtext: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Raleway-Medium',
  },
});
