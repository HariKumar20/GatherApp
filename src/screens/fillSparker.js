import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalRow from '../components/horizontalRow';
import FillSparkHeader from '../components/headers/fillSparkHeader';
import {launchImageLibrary} from 'react-native-image-picker';

function FillSparker({navigation}) {
  const [keyboardFlag, setKeyboardFlag] = useState(false);
  const [answerData, setAnswerData] = useState('');
  const [defaultFlag, setdefaultFlag] = useState(false);
  const [indexValue, setIndexValue] = useState();
  const [answersObject, setAnswersObject] = useState({});
  const [imageFlag, setImageFlag] = useState(false);
  const sparkData = [
    'This ',
    'week ',
    'is ',
    'all ',
    'about ',
    false,
    'for ',
    'me.',
    'My ',
    'morning ',
    false,
    'energizes ',
    'me ',
    'In ',
    'the ',
    'evening ,',
    'i ',
    'like ',
    'to ',
    "i'm ",
    'so ',
    'ready ',
    'to ',
    'try ',
    false,
    '& ',
    'stop ',
    false,
    'real ',
    'soon.',
    'This ',
    'is ',
    'my ',
    'favourite ',
    'spot ',
    'at ',
    'home: ',
  ];

  const [keyBoardFlag, setKeyBoardFlag] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('show');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // setKeyboardStatus('Keyboard Hidden');
      setKeyboardFlag(false);
      setImageFlag(false);
      console.log('hide');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const inputRef = useRef();

  return (
    <View style={styles.container}>
      <FillSparkHeader navigation={navigation} />
      <View style={styles.sparkviewflex}>
        {sparkData.map((currentValue, index) => {
          return (
            <View key={index}>
              {currentValue ? (
                <View style={styles.sparktextview}>
                  <Text style={styles.sparktext}>{currentValue}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setKeyBoardFlag(true);
                  }}>
                  {<View style={styles.answerview}></View>}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      {keyboardFlag ? (
        // <KeyboardAccessoryView alwaysVisible={true} androidAdjustResize={true}>
        <View style={styles.inputview}>
          <TextInput
            style={styles.textInputstyle}
            onChangeText={value => {
              setAnswerData(value);
              setdefaultFlag(false);
              setAnswersObject(prev => {
                // prev[indexValue] = value;
                return {...prev, [indexValue]: value};
              });
            }}
            defaultValue={defaultFlag ? '' : answersObject[indexValue]}
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
            disabled={true}
          />
          <TouchableOpacity
            onPress={() => {
              setdefaultFlag(true);
              nextMovingFunction(indexValue);
            }}>
            <View style={styles.nextbutton}>
              <Text style={styles.nexttext}>NEXT</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        // </KeyboardAccessoryView>
        <View></View>
      )}

      {imageFlag ? (
        <View style={styles.imageuploadview}>
          <Text style={styles.uploadtext}>Upload Image</Text>
          <TouchableOpacity onPress={selectImage}>
            <View style={styles.nextbutton}>
              <Text style={styles.nexttext}>NEXT</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default FillSparker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sparkviewflex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  sparktext: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    color: 'rgb(66, 69 ,83)',
    marginBottom: 10,
  },
  answerview: {
    height: 25,
    width: 60,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(213, 219, 230, 0.6)',
    marginBottom: 10,
  },
});
