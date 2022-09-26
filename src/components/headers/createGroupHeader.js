import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CreateGroupHeader = ({navigation}) => {
  return (
    <View style={styles.createGroupHeader}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('contactsList');
        }}>
        <Icon
          name="angle-left"
          color="black"
          size={25}
          style={{marginLeft: 10}}
        />
      </TouchableOpacity>
      <View style={styles.headingview}>
        <Text style={styles.heading}>Create Group</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createGroupHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    marginVertical: 13,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Raleway-SemiBold',
  },
  headingview: {
    width: '100%',
  },
});
