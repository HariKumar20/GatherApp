import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import StatusBar from './status';
import DetailsBar from './details';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
function EvaluationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mapview}>
        <View style={styles.iconbarview}>
          <View style={styles.backandstackiconview}>
            <Image
              source={require('./Gallery.png')}
              style={styles.iconbarimages}
            />
            <Image
              source={require('./Gallery.png')}
              style={styles.stackimages}
            />
          </View>

          <Image source={require('./Gallery.png')} style={styles.searchimage} />
        </View>
      </View>
      <View style={styles.bodyview}>
        <View style={styles.imagetitleview}>
          <Image
            source={require('./Gallery.png')}
            style={styles.sideimagestyling}
          />
          <View style={styles.titletextview}>
            <Text style={styles.maintitle}>Z100-X296</Text>
            <Text style={styles.subtitle}>HCFCD</Text>
          </View>
        </View>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Status" component={StatusBar} />
            <Tab.Screen name="Details" component={DetailsBar} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

export default EvaluationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagetitleview: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
  },
  mapview: {
    backgroundColor: 'lightslategrey',
    flex: 1,
  },
  bodyview: {
    // backgroundColor: 'grey',
    flex: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 10,
  },
  sideimagestyling: {
    height: 60,
    width: 60,
  },
  titletextview: {
    marginLeft: 15,
  },
  maintitle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#60698B',
    marginTop: 10,
  },
  iconbarview: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    marginHorizontal: 12,
  },
  backandstackiconview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconbarimages: {
    height: 36,
    width: 36,
    borderRadius: 25,
  },
  searchimage: {
    height: 36,
    width: 36,
    borderRadius: 25,
    marginLeft: 15,
  },
  stackimages: {
    height: 36,
    width: 36,
    borderRadius: 25,
  },
});
