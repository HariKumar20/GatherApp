import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {UserContext} from '../../App';
import SparkScreenHeader from '../components/headers/sparkScreenHeader';
import HorizontalRow from '../components/horizontalRow';
import SparkFillerComponent from '../components/sparkFillsComponent';
import database from '@react-native-firebase/database';

function GroupDetailsScreen({navigation, route}) {
  const {sparkImageSrc, answersObject, setAnswersObject, setSparkImageSrc} =
    useContext(UserContext);
  const [sharedGroupsFirebase, setSharedGroupsFirebase] = useState([]);
  const [weeklySpark, setWeeklySpark] = useState([]);
  const [filledAnswers, setFilledAnswers] = useState({});
  useEffect(() => {
    database()
      .ref('/sharedGroups')
      .once('value')
      .then(snapshot => {
        console.log('Shared : ', Object.values(Object.values(snapshot.val())));
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

        break;
      }
    }
  }, []);
  console.log('Weekly Spark : ', weeklySpark);
  console.log('Shared Data : ', route.params.sharedGroupData);

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 20}}>
        <SparkFillerComponent />
      </View>
      <HorizontalRow borderWidthUnits={1} borderColorUnits="grey" />
      <View style={styles.sharedsparkouterflex}>
        {weeklySpark.map((item, index) => {
          return (
            <View style={styles.sharedsparkflex} key={index}>
              <Text style={styles.sparklinetext}>{item.text}</Text>
              <Text style={styles.answertextgroupscreen}>
                {filledAnswers[index]}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.sparkimageview}>
        <Image source={{uri: sparkImageSrc}} style={styles.sparkimagestyle} />
      </View>
    </View>
  );
}

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  sharedsparkflex: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  sharedsparkouterflex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 15,
  },
  sparklinetext: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    color: 'rgb(66 ,69 ,83)',
  },
  answertextgroupscreen: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    color: ' rgb(66 ,69 ,83)',
  },
  sparkimagestyle: {
    height: 200,
    width: 150,
  },
  sparkimageview: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});
