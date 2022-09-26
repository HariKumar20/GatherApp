import React, {useEffect, useState, useRef, useContext} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import FillSparkHeader from '../components/headers/fillSparkHeader';
import {UserContext} from '../../App';
import database from '@react-native-firebase/database';

function FillSpark({navigation, route}) {
  const [keyboardFlag, setKeyboardFlag] = useState(false);
  const [answerData, setAnswerData] = useState('');
  const [defaultFlag, setdefaultFlag] = useState(false);
  const [indexValue, setIndexValue] = useState();
  const {answersObject, setAnswersObject} = useContext(UserContext);
  const [imageFlag, setImageFlag] = useState(false);
  const [answeredFlag, setAnsweredFlag] = useState(false);
  const {sparkImageSrc, setSparkImageSrc} = useContext(UserContext);
  const [sparkData, setSparkData] = useState([]);

  const inputRef = useRef();

  const nextMovingFunction = indexValue => {
    if (indexValue < sparkData.length - 1) {
      let i = indexValue + 1;
      let sparkFlag = false;
      while (i < sparkData.length && !sparkData[i].viewComponent) {
        i = i + 1;
        sparkFlag = true;
      }
      if (i < sparkData.length) {
        setIndexValue(i);
      }
      if (i == sparkData.length) {
        setImageFlag(true);
        setKeyboardFlag(false);
      }
    }
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('show');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // setKeyboardStatus('Keyboard Hidden');
      setKeyboardFlag(false);
      // setImageFlag(false);
      console.log('hide');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    try {
      let imageSource = route.params.imagePath;
      setSparkImageSrc(imageSource);
    } catch {}
  });

  useEffect(() => {
    database()
      .ref('/weeklySparks')
      .once('value')
      .then(snapshot => {
        console.log(
          'user data : ',
          Object.values(Object.values(snapshot.val())[0])[0],
        );
        setSparkData(Object.values(Object.values(snapshot.val())[0])[0]);
      });
  }, []);

  const selectImage = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      mediaType: 'mixed',
      // presentationStyle: 'overFullScreen',
    };

    launchImageLibrary(options, response => {
      console.log({response});

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response['assets'][0]['uri']);
        navigation.navigate('imageScreen', {uri: response['assets'][0]['uri']});
      }
    });
  };

  useEffect(() => {
    let count = 0;
    console.log('Ansers Object : ', answersObject);
    Object.values(answersObject).map(item => {
      if (item.length > 0) {
        count = count + 1;
      }
    });
    console.log(
      'Count of AnswersObject : ',
      count,
      Object.keys(answersObject).length,
    );

    if (count == Object.keys(answersObject).length) {
      setAnsweredFlag(true);
    }
  }, [answersObject]);
  return (
    <View style={styles.container}>
      <FillSparkHeader navigation={navigation} answeredFlag={answeredFlag} />

      {/* <ScrollView> */}
      <View style={styles.fillsparkmessageview}>
        {sparkData.map((currentValue, index) => {
          return currentValue.viewComponent ? (
            <View style={styles.viewComponentflex} key={index}>
              <View style={styles.sparktextflex}>
                <Text style={styles.sparktext}>{currentValue.text}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIndexValue(index);
                  setKeyboardFlag(true);
                  setImageFlag(false);
                }}>
                {[index] in answersObject && answersObject[index] ? (
                  // <View>
                  <View
                    style={
                      indexValue == index
                        ? styles.answeractiveborder
                        : styles.answerviewactive
                    }>
                    <Text style={styles.answertext}>
                      {answersObject[index]}
                    </Text>
                  </View>
                ) : (
                  // {/* </View> */}
                  <View>
                    <View
                      style={
                        indexValue == index
                          ? styles.answerviewstyleactive
                          : styles.answerviewstyle
                      }></View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.sparktextflex} key={index}>
              <Text style={styles.sparktext}>{currentValue.text}</Text>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            setImageFlag(true);
            setKeyboardFlag(false);
          }}>
          <View style={styles.addphoto}>
            <Icon name="camera" size={22} color="rgb(40, 41 ,86)" />
            <Text style={styles.addphototext}>Add Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}

      {sparkImageSrc ? (
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Image
            source={{uri: sparkImageSrc}}
            style={keyboardFlag ? styles.smallImageStyle : styles.sparkimaging}
          />
        </View>
      ) : (
        <View></View>
      )}

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
            defaultValue={
              defaultFlag || answersObject[indexValue]
                ? answersObject[indexValue]
                : ''
            }
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
        <View style={styles.outerimageview}>
          <View style={styles.imageuploadview}>
            <Text style={styles.uploadtext}>Upload Image</Text>
            <TouchableOpacity onPress={selectImage}>
              <View style={styles.nextbutton}>
                <Text style={styles.nexttext}>NEXT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default FillSpark;

const styles = StyleSheet.create({
  fillsparkheaderview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sharebutton: {
    backgroundColor: 'rgb(10 ,158 ,136)',
    borderRadius: 2,
  },
  sharetext: {
    color: 'white',
    size: 11,
    fontFamily: 'Raleway-ExtraBold',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  fillsparktext: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color: 'black',
  },
  fillsparkmessageview: {
    flexDirection: 'row',
    marginTop: 18,
    marginHorizontal: 21,
    flexWrap: 'wrap',
  },
  sparktext: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    color: 'rgb(66, 69 ,83)',
    marginBottom: 10,
  },
  answerviewstyle: {
    height: 26,
    width: 60,
    borderWidth: 1,
    borderColor: 'rgba(213 ,219, 230, 0.6)',
    borderRadius: 2,
    backgroundColor: 'rgba(233 ,238, 247, 0.26)',
  },
  answerviewstyleactive: {
    height: 26,
    width: 60,
    borderWidth: 1,
    borderColor: 'rgba(213, 179 ,175, 0.7)',
    borderRadius: 2,
    backgroundColor: 'rgba(233 ,238, 247, 0.26)',
  },
  inputview: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  textInputstyle: {
    height: 55,
    width: '80%',
  },
  nextbutton: {
    borderColor: 'green',
    borderRadius: 4,
    borderWidth: 1,
  },
  nexttext: {
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 10,
    color: 'green',
  },
  container: {
    flex: 1,
  },
  answertext: {
    marginHorizontal: 5,
    marginVertical: 2,
    fontSize: 16,
  },
  answerviewactive: {
    borderWidth: 1,
    borderColor: 'rgba(213 ,219, 230, 0.6)',
    borderRadius: 3,
    backgroundColor: 'rgba(233 ,238, 247, 0.26)',
    marginBottom: 5,
    minWidth: 60,
  },
  answeractiveborder: {
    borderWidth: 1,
    borderColor: 'rgba(213, 179 ,175, 0.7)',
    borderRadius: 3,
    backgroundColor: 'rgba(233 ,238, 247, 0.26)',
    minWidth: 60,
  },
  viewComponentflex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sparktextflex: {
    justifyContent: 'center',
  },
  addphoto: {
    flexDirection: 'row',
    padding: 5,
    borderColor: 'rgb(40, 41 ,86)',
    borderWidth: 1,
    borderRadius: 10,
  },
  addphototext: {
    marginLeft: 10,
    color: 'rgb(40, 41 ,86)',
    fontFamily: 'Raleway-Regular',
  },
  outerimageview: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  imageuploadview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  sparkimaging: {
    height: 200,
    width: 150,
  },
  smallImageStyle: {
    height: 60,
    width: 40,
  },
});
