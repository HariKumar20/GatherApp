import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {UserContext} from '../../App';
import HorizontalRow from '../components/horizontalRow';
import database from '@react-native-firebase/database';
function ShareScreen({navigation}) {
  const bool = false;
  const [selectallFlag, setSelectallFlag] = useState(false);
  const [groupObject, setGroupObject] = useState({});
  const [toShareGroupslist, setToShareGroupsList] = useState([]);
  const [groupsList, setGroupsList] = useState({});
  const {answersObject} = useContext(UserContext);
  const firebaseSharedGroups = () => {
    for (let i = 0; i < toShareGroupslist.length; i++) {
      try {
        database().ref('/sharedGroups').push().set({
          filledAnswers: answersObject,
          sharedGroup: toShareGroupslist[i].groupName,
        });
      } catch (err) {
        console.log('Error Vachindi Ayya!!!! - ', err);
      }
    }
  };

  useEffect(() => {
    database()
      .ref('/groups')
      .once('value')
      .then(snapshot => {
        console.log('User Data : ', snapshot.val());
        setGroupsList(snapshot.val());
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <Text style={styles.headingtext}>Share your response</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('fillSpark')}
          style={styles.positioncancel}>
          <Text style={styles.canceltext}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <HorizontalRow />
      <View style={styles.subheadingview}>
        <Text style={styles.existingtext}>EXISTING CONVERSATIONS</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectallFlag(!selectallFlag);
            if (selectallFlag) {
              let tempArray = [];
              Object.keys(groupsList).map(item => {
                tempArray.push(groupsList[item]);
              });
              setToShareGroupsList(tempArray);
              for (let i = 0; i < Object.keys(groupsList).length; i++) {
                setGroupObject(prev => {
                  return {...prev, [i]: true};
                });
              }
              console.log('Selected Contacts to Share: ', toShareGroupslist);
            } else {
              setToShareGroupsList([]);
              for (let i = 0; i < Object.keys(groupsList).length; i++) {
                setGroupObject(prev => {
                  return {...prev, [i]: false};
                });
              }

              console.log('Selected Contacts to Share: ', toShareGroupslist);
            }
          }}>
          <Text style={styles.selecttext}>Select All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Object.keys(groupsList)}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setGroupObject(prev => {
                if (prev[index]) {
                  setToShareGroupsList(value => {
                    value.splice(index, 1);
                    return value;
                  });
                  console.log(
                    'share groups list share screen: ',
                    toShareGroupslist,
                  );
                  return {...prev, [index]: false};
                } else {
                  setToShareGroupsList(value => {
                    value.push(groupsList[item]);
                    return value;
                  });
                  console.log(
                    'share groups list share screen: ',
                    toShareGroupslist,
                  );
                  return {...prev, [index]: true};
                }
              });
            }}>
            <View style={styles.groupviewflex}>
              <View style={styles.groupnameimageflex}>
                <Image
                  style={styles.groupimagestyle}
                  source={{uri: groupsList[item].groupImage}}
                />
                <Text style={styles.groupNametext}>
                  {groupsList[item].groupName}
                </Text>
              </View>
              {groupObject[index] ? (
                <View style={styles.selectview}>
                  <View style={styles.innerview}></View>
                </View>
              ) : (
                <View style={styles.selectview}></View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.newconversationview}>
        <TouchableOpacity onPress={() => navigation.navigate('contactsList')}>
          <View style={styles.newconversationinnerview}>
            <View style={styles.conversationtextview}>
              <Text style={styles.headingconversationtext}>
                Start a new conversation on Gather
              </Text>
              <Text style={styles.conversationsubtext}>
                Click here and select members of your new conversation
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          firebaseSharedGroups();
          navigation.navigate('noContacts');
        }}>
        <View style={styles.shareview}>
          <Text style={styles.sharetext}>Share</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default ShareScreen;
const styles = StyleSheet.create({
  headerview: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headingtext: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  canceltext: {
    fontSize: 16,
    color: 'rgb(74, 144 ,226)',
    position: 'absolute',
    right: 10,
    top: 0,
  },
  subheadingview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  existingtext: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
  selecttext: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: 'rgb(74, 144 ,226)',
  },
  positioncancel: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  groupviewflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  selectview: {
    height: 32,
    width: 32,
    borderRadius: 35,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerview: {
    height: 21,
    width: 21,
    borderRadius: 25,
    backgroundColor: 'steelblue',
  },
  groupnameimageflex: {
    flexDirection: 'row',
  },
  groupNametext: {
    marginLeft: 20,
    fontFamily: 'Raleway-Medium',
    color: 'black',
    fontSize: 18,
  },
  groupimagestyle: {
    height: 50,
    width: 50,
    borderRadius: 35,
  },
  headingconversationtext: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
  conversationsubtext: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  conversationtextview: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
  newconversationinnerview: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgb(244 ,219, 219)',
  },
  newconversationview: {
    marginBottom: 20,
  },
  sharetext: {
    marginVertical: 15,
    marginRight: 20,
    fontSize: 16,
    color: 'white',
  },
  shareview: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
});
