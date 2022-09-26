import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
function SparkFillerComponent() {
  return (
    <View>
      <View style={styles.headersparkview}>
        <Text style={styles.headersparktext}>This Week's spark</Text>
        <Image
          style={styles.sparkimage}
          source={require('../images/topRight.png')}
        />
      </View>
      <View style={styles.bodysparkview}>
        <Text style={styles.sparktext}>This Week is all about </Text>
        <View style={styles.answerviewstyle}></View>
        <Text style={styles.sparktext}> for me.My morning </Text>
        <View style={styles.answerviewstyle}></View>
        <Text style={styles.sparktext}>
          energizes me. In the evening , I like to
        </Text>
        <View style={styles.answerviewstyle}></View>
        <Text style={styles.sparktext}>. I'm so ready to try </Text>
        <View style={styles.answerviewstyle}></View>
        <Text style={styles.sparktext}> stop</Text>
        <View style={styles.answerviewstyle}></View>
        <Text style={styles.sparktext}>
          real soon.This is my favourite spot at home :
        </Text>
      </View>
    </View>
  );
}

export default SparkFillerComponent;

const styles = StyleSheet.create({
  sparkimage: {
    height: 35,
    width: 35,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 30,
  },
  headersparkview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headersparktext: {
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'Raleway-SemiBold',
    color: 'rgb(20, 31 ,77)',
    marginTop: 10,
  },
  conversationspark: {
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: 'rgba(52 ,44 ,44, 0.56)',
    marginTop: 16,
    marginHorizontal: 10,
  },
  bodysparkview: {
    marginHorizontal: 13,
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sparktext: {
    fontSize: 16,
    color: 'rgb(66, 69, 83)',
    letterSpacing: 0.8,
    marginBottom: 10,
    fontFamily: 'Raleway-SemiBold',
  },
  answerviewstyle: {
    height: 20,
    width: 50,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'lightslategrey',
    backgroundColor: 'rgba(233 ,238 ,247, 0.26)',
  },
});
