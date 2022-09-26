import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
function DetailsBar() {
  return (
    <View>
      <Text style={styles.detailstext}>Details Screen</Text>
    </View>
  );
}

export default DetailsBar;

const styles = StyleSheet.create({
  detailstext: {
    alignItems: 'center',
  },
});
