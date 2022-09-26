import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import HorizontalRow from '../components/horizontalRow';

function GroupCreationScreen({navigation, route}) {
  const [selectedGroupContacts, setSelectedGroupContacts] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    setSelectedGroupContacts(route.params.data);
    let groupNameStr = selectedGroupContacts[0] + '& more...';
    setGroupName(groupNameStr);
  });
  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View style={styles.innerheaderview}>
          <Image
            source={require('../images/b.png')}
            style={styles.imagestyling}></Image>
          <Text style={styles.headingtext}>Conversations</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('contactsList', {
                contactsList: route.params.contactsList,
              });
            }}>
            <Image
              style={styles.writeimagestyle}
              source={require('../images/write.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRow />
      <View style={styles.outergroupview}>
        <View style={styles.groupView}>
          <View style={styles.icongrouptextflex}>
            <Image
              source={require('../images/bluecircle.png')}
              style={styles.imagestyling}
            />
            <Text style={styles.groupNametext}>{groupName}</Text>
          </View>
          <View style={styles.onlineflex}>
            <View style={styles.onlineview}></View>
            <Text style={styles.timetext}>2:11 pm</Text>
          </View>
        </View>
      </View>
      <HorizontalRow />
    </View>
  );
}

export default GroupCreationScreen;

const styles = StyleSheet.create({
  innerheaderview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 18,
  },
  imagestyling: {
    height: 50,
    width: 50,
    borderRadius: 26,
  },
  writeimagestyle: {
    height: 50,
    width: 50,
  },
  headingtext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  groupView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  icongrouptextflex: {
    flexDirection: 'row',
  },
  groupNametext: {
    marginLeft: 15,
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  timetext: {
    marginTop: 10,
  },
});
