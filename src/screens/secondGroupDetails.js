import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import GroupDetailsScreen from './groupDetailsScreen';
import SparkFillerComponent from '../components/sparkFillsComponent';
import {UserContext} from '../../App';
import HorizontalRow from '../components/horizontalRow';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
// import database from '@react-native-firebase/database';

function SecondGroupDetails({navigation, route}) {
  const {sparkImageSrc, answersObject, setAnswersObject, setSparkImageSrc} =
    useContext(UserContext);
  const [loveFlag, setLoveFlag] = useState(false);
  const [questionFlag, setQuestionFlag] = useState(false);
  const [commentFlag, setCommentFlag] = useState(false);
  const [questiontemplateFlag, setQuestiontemplateFlag] = useState(false);
  const questionTemplateData = [
    ["That's so Inspiring", 'Have a Good Day', 'Wish You Good Luck'],
    ['Keep Growing', 'Keep Growing', "That's so Inspiring"],
    ['Have a Good Day', 'Wish You Good Luck', "That's so Inspiring"],
    ['Have a Good Day', 'Wish You Good Luck', "That's so Inspiring"],
    ['Have a Good Day', 'Wish You Good Luck', 'Have a Good Day'],
  ];
  const [state, setState] = useState({x: 0, y: 0});
  const [sharedGroupsFirebase, setSharedGroupsFirebase] = useState([]);
  const [weeklySpark, setWeeklySpark] = useState([]);
  const [filledAnswers, setFilledAnswers] = useState([]);
  const varRef = useRef();
  useEffect(() => {
    console.log('spark Data : ', sparkData);
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('KeyBoard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setQuestiontemplateFlag(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  useEffect(() => {
    setWeeklySpark(route.params.weeklySparkData);
    setFilledAnswers(route.params.filledAnswers);
  }, []);

  // useEffect(() => {
  //   database()
  //     .ref('/sharedGroups')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('Shared : ', Object.values(Object.values(snapshot.val())));
  //       setSharedGroupsFirebase(Object.values(Object.values(snapshot.val())));
  //     });

  //   database()
  //     .ref('/weeklySparks')
  //     .once('value')
  //     .then(snapshot => {
  //       setWeeklySpark(Object.values(Object.values(snapshot.val())[0])[0]);
  //     });

  //   for (let i = 0; i < sharedGroupsFirebase.length; i++) {
  //     if (
  //       sharedGroupsFirebase[i].sharedGroup ==
  //       route.params.sharedGroupData.sharedGroup
  //     ) {
  //       console.log('Filled Answers : ', sharedGroupsFirebase[i].filledAnswers);
  //       setFilledAnswers(sharedGroupsFirebase[i].filledAnswers);

  //       break;
  //     }
  //   }
  // }, []);
  // console.log(
  //   'Shared Group Clicked Name : ',
  //   route.params.sharedGroupData.sharedGroup,
  // );
  console.log('Weekly Spark Data - Tab Screen: ', route.params.weeklySparkData);
  console.log('Filled Answers - Tab Screen : ', route.params.filledAnswers);

  return (
    <View style={{flex: 1}}>
      <ScrollView ref={varRef}>
        <View style={{marginTop: 20}}>
          <SparkFillerComponent />
        </View>
        <HorizontalRow borderWidthUnits={1} borderColorUnits="grey" />

        <View style={styles.sharedsparkouterflex}>
          {weeklySpark.map((item, index) => {
            return (
              <View style={styles.sharedsparkflex} key={index}>
                <Text style={styles.sparklinetext}>{item.text}</Text>
                <TouchableOpacity>
                  <Text style={styles.answertextgroupscreen}>
                    {filledAnswers[index]}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.sparkimageview}>
          <Image source={{uri: sparkImageSrc}} style={styles.sparkimagestyle} />
        </View>
        <View style={styles.reactions}>
          <TouchableOpacity
            onPress={() => {
              setQuestionFlag(!questionFlag);
              setCommentFlag(false);
              setQuestiontemplateFlag(true);
            }}>
            <Icon
              name="question-circle-o"
              size={30}
              color="black"
              style={styles.iconstyling}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLoveFlag(!loveFlag);
            }}>
            <Icon
              name={loveFlag ? 'heart' : 'heart-o'}
              size={30}
              style={loveFlag ? styles.loveiconstyle : styles.iconstyling}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCommentFlag(!commentFlag);
              setQuestionFlag(false);
            }}>
            <EvilIcon
              name="comment"
              size={40}
              color="black"
              style={styles.iconstyling}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {questionFlag ? (
        <View style={styles.questionsView}>
          <View style={styles.questioninputview}>
            <Icon name="keyboard-o" color="grey" size={30} />

            <TextInput
              style={styles.questiontextinputstyle}
              placeholder="write your comment"
              onPressIn={() => {
                setQuestiontemplateFlag(false);
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.posttext}>Post</Text>
            </View>
          </View>
          {questiontemplateFlag ? (
            <View style={styles.questiontemplateview}>
              {questionTemplateData.map((value, indexing) => {
                return (
                  <View style={styles.templatesflex} key={indexing}>
                    {value.map((item, index) => {
                      return (
                        <View style={styles.templateitemview} key={index}>
                          <Text style={styles.questiontext}>{item}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
              {/* </View> */}
            </View>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View></View>
      )}

      {commentFlag ? (
        <View style={{marginTop: 20}}>
          <View style={styles.questioninputview}>
            <Icon name="keyboard-o" color="grey" size={30} />

            <TextInput
              style={styles.questiontextinputstyle}
              placeholder="write your comment"
              onPressIn={() => {
                setQuestiontemplateFlag(false);
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.posttext}>Post</Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default SecondGroupDetails;

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
  iconstyling: {
    marginRight: 15,
    color: 'black',
  },
  reactions: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  loveiconstyle: {
    marginRight: 15,
    color: 'red',
  },
  questionsView: {
    marginTop: 20,
  },
  questioninputview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  questiontextinputstyle: {
    width: '70%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
  },
  posttext: {
    fontSize: 16,
    color: 'steelblue',
  },
  questiontemplateview: {
    height: '40%',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  templateitemview: {
    maxWidth: '28%',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 0.8,
  },
  templatesflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%',
    marginBottom: 15,
  },
  questiontext: {
    fontSize: 16,
    color: 'grey',
  },
});
