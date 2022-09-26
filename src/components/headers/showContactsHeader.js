import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

function ShowContactsHeader({navigation, selectedContactsList, contactsList}) {
  return (
    <View style={styles.innercontactsheaderview}>
      <TouchableOpacity onPress={() => navigation.navigate('noContacts')}>
        <Text style={styles.canceltext}>Cancel</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.addparticipantstext}>Add Participants</Text>
        <Text style={styles.selectedParticipants}>
          {selectedContactsList.length}/{contactsList.length}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('createGroup', {
            selectedContacts: selectedContactsList,
          })
        }
        disabled={selectedContactsList.length == 0 ? true : false}>
        <Text
          style={
            selectedContactsList.length
              ? styles.nexttextactive
              : styles.nexttext
          }>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShowContactsHeader;

const styles = StyleSheet.create({
  innercontactsheaderview: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canceltext: {
    color: 'rgb(74, 144 ,226)',
    fontSize: 16,
    fontFamily: 'ARIALMTLIGHT',
  },
  addparticipantstext: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Arial-BoldMT',
    fontWeight: 'bold',
  },
  nexttext: {
    fontSize: 16,
    fontFamily: 'arialmt',
  },
  selectedParticipants: {
    textAlign: 'center',
  },
  nexttextactive: {
    fontSize: 16,
    color: 'steelblue',
    fontFamily: 'arialmt',
  },
});
