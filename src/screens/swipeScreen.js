import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GroupDetailsScreen from './groupDetailsScreen';
import SecondGroupDetails from './secondGroupDetails';
import SparkScreenHeader from '../components/headers/sparkScreenHeader';
import {View, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';
const Tab = createMaterialTopTabNavigator();
function SwipeScreen({navigation, route}) {
  useEffect(() => {}, []);
  const [sharedGroupsFirebase, setSharedGroupsFirebase] = useState([]);
  const [weeklySpark, setWeeklySpark] = useState([]);
  const [filledAnswers, setFilledAnswers] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    () =>
      database()
        .ref('/sharedGroups')
        .once('value')
        .then(snapshot => {
          console.log(
            'Shared : ',
            Object.values(Object.values(snapshot.val())),
          );
          setSharedGroupsFirebase(Object.values(Object.values(snapshot.val())));
        });

    database()
      .ref('/weeklySparks')
      .once('value')
      .then(snapshot => {
        setWeeklySpark(Object.values(Object.values(snapshot.val())[0])[0]);
      });

    for (let i = 0; i < sharedGroupsFirebase.length; i++) {
      if (
        sharedGroupsFirebase[i].sharedGroup ==
        route.params.sharedGroupData.sharedGroup
      ) {
        console.log('Filled Answers : ', sharedGroupsFirebase[i].filledAnswers);
        setFilledAnswers(sharedGroupsFirebase[i].filledAnswers);
      }
    }
    setLoader(false);
  }, []);

  console.log('shared group name : ', route.params.sharedGroupData.sharedGroup);

  return !loader ? (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {display: 'none'},
      }}>
      {sharedGroupsFirebase.map((item, index) => (
        <Tab.Screen
          name={index}
          component={SecondGroupDetails}
          initialParams={{
            weeklySparkData: weeklySpark,
            filledAnswers: item.filledAnswers,
          }}
        />
      ))}
    </Tab.Navigator>
  ) : (
    <View></View>
  );
}

export default SwipeScreen;

const styles = StyleSheet.create({});
