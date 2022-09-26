import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HorizontalRow from '../components/horizontalRow';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import GroupScreenHeader from '../components/headers/groupScreenHeader';
import {UserContext} from '../../App';
import database from '@react-native-firebase/database';

function NoContactsComponent({getContacts, navigation}) {
  const [showContactsFlag, setShowContactsFlag] = useState(false);
  const {groupName, setGroupName, gatherFlag, groupsList} =
    useContext(UserContext);
  const {gDescription, setGroupDescription} = useContext(UserContext);
  const {imageSource} = useContext(UserContext);
  const [firebaseGroups, setFirebasegroups] = useState({});
  const [sharedGroupsValues, setSharedGroupsValues] = useState([]);
  const [loader, setLoader] = useState('1');

  const d = async () => {
    try {
      await database()
        .ref('/groups')
        .once('value')
        .then(snapshot => {
          setFirebasegroups(snapshot.val());
        });
    } catch {
      console.log('Some Error...!!');
    }
  };
  useEffect(() => {
    try {
      database()
        .ref('/sharedGroups')
        .on('value', snapshot => {
          setSharedGroupsValues(Object.values(snapshot.val()));
        });
    } catch {}

    d();
  }, []);

  return (
    <View style={styles.container}>
      {console.log({firebaseGroups, sharedGroupsValues})}
      <GroupScreenHeader navigation={navigation} />
      <HorizontalRow />
      {gatherFlag && !groupName ? (
        <View style={styles.gatherview}>
          <Text style={styles.gatherheading}>Find Friends on Gather</Text>
          <Text style={styles.gatherviewsubtext}>
            Gather is about conversations with your friends . We can't help you
            find your friends without access to contacts.
          </Text>
          <TouchableOpacity
            onPress={() => {
              getContacts();
            }}>
            <View style={styles.accesscontactsview}>
              <Text style={styles.accesscontactstext}>Access Contacts</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('sparkScreen')}>
            <View style={styles.weeksparkview}>
              <Text style={styles.titletext}>This Week's Spark</Text>
              <Text style={styles.dayslefttext}>1 day left</Text>
            </View>
          </TouchableOpacity>
          {firebaseGroups ? (
            <View>
              <FlatList
                data={Object.keys(firebaseGroups)}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        for (let i = 0; i < sharedGroupsValues.length; i++) {
                          if (
                            firebaseGroups[item].groupName ==
                            sharedGroupsValues[i].sharedGroup
                          ) {
                            navigation.navigate('swipeScreen', {
                              sharedGroupData: sharedGroupsValues[i],
                            });
                            break;
                          }
                        }
                      }}>
                      <View style={styles.groupView}>
                        <Image
                          source={{uri: firebaseGroups[item].groupImage}}
                          style={styles.groupImageStyle}
                        />

                        <Text style={styles.groupText}>
                          {firebaseGroups[item].groupName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <HorizontalRow
                      borderWidthUnits={0.7}
                      borderColorUnits="rgb(151, 151 ,151)"
                    />
                  </View>
                )}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      )}

      {showContactsFlag ? (
        <View style={styles.showcontactsview}></View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default NoContactsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gatherviewsubtext: {
    fontSize: 15,
    color: 'rgb(6 ,51 ,164)',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Raleway-Medium',
  },
  gatherheading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(6 ,51 ,164)',
    marginBottom: 15,
    fontFamily: 'Raleway-Bold',
  },
  accesscontactsview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(2, 28 ,88)',
    borderRadius: 8,
    width: 172,
  },
  accesscontactstext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    fontFamily: 'Raleway-Bold',
  },
  gatherview: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(248 ,226, 218)',
    alignItems: 'center',
  },
  innergatherview: {
    alignItems: 'center',
  },
  groupView: {
    flexDirection: 'row',
    marginVertical: 25,
    // height: 25,
    marginHorizontal: 10,
  },
  groupImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'grey',
  },
  groupText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 20,
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 1,
  },
  titletext: {
    fontSize: 18,
    marginTop: 25,
    color: 'black',
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 1,
  },
  dayslefttext: {
    fontSize: 13,
    marginBottom: 25,
    fontFamily: 'Raleway-Regular',
    letterSpacing: 0.8,
  },
  weeksparkview: {
    backgroundColor: 'rgb(243, 233 ,225)',
    alignItems: 'center',
  },
});
