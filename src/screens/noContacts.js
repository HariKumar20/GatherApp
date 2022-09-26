import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import NoContactsComponent from './noContactsComponent';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {UserContext} from '../../App';

function NoContacts({navigation, route}) {
  const {gatherFlag, setGatherFlag} = useContext(UserContext);
  const {contactsData, setContactsData} = useContext(UserContext);
  const getContacts = () => {
    setGatherFlag(false);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(a => {
      if ((a = 'granted')) {
        Contacts.getAll()
          .then(contacts => {
            if (contacts) {
              setContactsData(contacts);
            }
            // console.log(contacts);
          })
          .catch(e => {
            console.log('error :', e);
          });
      }
    });
  };

  return (
    <NoContactsComponent
      getContacts={getContacts}
      navigation={navigation}
      toShareGroupsList={route}
    />
  );
}

export default NoContacts;

const styles = StyleSheet.create({
  groupCreationModal: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  groupview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupiconnameflex: {
    flexDirection: 'row',
  },
  grouptext: {
    fontSize: 20,
    color: 'black',
    marginLeft: 15,
  },
  iconstyling: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
});
