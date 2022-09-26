import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoIcon from 'react-native-vector-icons/Feather';
import HorizontalRow from '../components/horizontalRow';
import SparkFillerComponent from '../components/sparkFillsComponent';
import SparkScreenHeader from '../components/headers/sparkScreenHeader';

function SparkScreen({navigation}) {
  const [answerData, setAnswerData] = useState();
  const [activeView, setActiveView] = useState(false);
  return (
    <View style={styles.conatiner}>
      <SparkScreenHeader navigation={navigation} />

      <View style={styles.conversationspark}>
        <SparkFillerComponent />
        <View style={styles.conversationbuttonflex}>
          <TouchableOpacity onPress={() => navigation.navigate('fillSpark')}>
            <View style={styles.conversationbutton}>
              <Text style={styles.conversationtext}>Join Conversation</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SparkScreen;

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
  conversationspark: {
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: 'rgba(52 ,44 ,44, 0.56)',
    marginTop: 20,
    marginHorizontal: 10,
  },
  conversationbuttonflex: {
    width: '100%',
    marginBottom: 15,
  },
  conversationbutton: {
    marginHorizontal: 20,
    backgroundColor: 'rgb(10, 158 ,136)',
    alignItems: 'center',
    borderRadius: 10,
  },
  conversationtext: {
    marginVertical: 15,
    fontSize: 15,
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
  conatiner: {
    flex: 1,
  },
});
