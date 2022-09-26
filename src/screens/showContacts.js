import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {UserContext} from '../../App';
import ShowContactsHeader from '../components/headers/showContactsHeader';

function ShowContacts({navigation}) {
  const bool = false;
  const sectionArray = useRef([]);
  const [selectedContacts, setSelectedContacts] = useState({});
  const [selectedFlag, setSelectedFlag] = useState(bool);
  const [indexFlag, setIndexFlag] = useState();
  const [selectedContactsList, setSelectedContactsList] = useState([]);
  const [filteredContactsList, setFilteredContactsList] = useState([]);
  const [searchData, setSearchedData] = useState('');
  const [contactsList, setContactsList] = useState([]);
  const [sectionContactsList, setSectionContactsList] = useState([]);
  const [unSelectFlag, setUnSelectFlag] = useState(false);
  const {contactsData} = useContext(UserContext);
  const alphabetsList = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let tempArray = [];
  useEffect(() => {
    for (let i = 0; i < contactsData.length; i++) {
      tempArray.push(
        contactsData[i].displayName[0].toUpperCase() +
          contactsData[i].displayName.slice(
            1,
            contactsData[i].displayName.length,
          ),
      );
    }
    tempArray.sort();
    setContactsList(tempArray);
    for (let i = 0; i < alphabetsList.length; i++) {
      let iterObject = {};
      let iterArray = [];
      for (let j = 0; j < tempArray.length; j++) {
        if (tempArray[j][0] == alphabetsList[i]) {
          iterArray.push(tempArray[j]);
        }
      }
      // console.log(iterArray);
      if (iterArray.length > 0) {
        iterObject['title'] = alphabetsList[i];
        iterObject['data'] = iterArray;

        sectionArray.current.push(iterObject);
      }
    }
    // console.log('SectionList : ', sectionArray);
  }, []);

  const showSelectedContacts = (contactName, bool) => {
    setSelectedContactsList(name => {
      if (bool == true) {
        name.push(contactName);
        return name;
      } else {
        for (let i = 0; i < selectedContactsList.length; i++) {
          if (contactName == selectedContactsList[i]) {
            selectedContactsList.splice(i, 1);
          }
        }
        return selectedContactsList;
      }
    });
  };

  const searchAlgorithm = nameData => {
    setSearchedData(nameData);
    let filterContactsTemp = [];
    for (let i = 0; i < contactsList.length; i++) {
      if (contactsList[i].toUpperCase().includes(nameData.toUpperCase())) {
        filterContactsTemp.push(contactsList[i]);
      }
    }
    setFilteredContactsList(filterContactsTemp);
  };

  const removeContact = (indexValue, item) => {
    selectedContactsList.splice(indexValue, 1);
    console.log('Selected Contacts after Removing : ', selectedContactsList);
    setSelectedContactsList(selectedContactsList);
    let unSelectIndex = 0;
    for (let i = 0; i < contactsList.length; i++) {
      if (item == contactsList[i]) {
        unSelectIndex = i;
        break;
      }
    }

    setSelectedContacts(prev => {
      return {...prev, [unSelectIndex]: false};
    });
  };

  return (
    <View style={{flex: 1}}>
      <ShowContactsHeader
        navigation={navigation}
        selectedContactsList={selectedContactsList}
        contactsList={contactsList}
      />
      <View style={styles.searchbarview}>
        <View style={styles.innersearchbarview}>
          <TextInput
            style={styles.inputstyle}
            placeholder="Search for a Friend"
            onChangeText={value => searchAlgorithm(value)}></TextInput>
        </View>
      </View>
      {selectedContactsList.length > 0 ? (
        <View style={styles.selectedcontactsview}>
          <FlatList
            horizontal={true}
            data={selectedContactsList}
            renderItem={({item, index}) => (
              <View style={styles.selectedContactsFlex}>
                <TouchableOpacity
                  onPress={() => {
                    removeContact(index, item);
                  }}>
                  <View style={styles.contacticon}>
                    <Text style={styles.contacticonsymbol}>
                      {item[0].toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.selectedcontactname}>
                  {item.slice(0, 6) + '...'}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.line}></View>
      {searchData.length === 0 ? (
        <View style={styles.contactslistview}>
          <SectionList
            sections={sectionArray.current}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    const bool = false;
                    // setSelectedFlag(!bool);
                    setSelectedContacts(prev => {
                      if (prev[index]) {
                        showSelectedContacts(item, bool);
                        return {...prev, [index]: bool};
                      } else {
                        showSelectedContacts(item, !bool);
                        return {...prev, [index]: !bool};
                      }
                    });
                  }}>
                  <View style={styles.contactview}>
                    <View style={styles.contacticonnameflex}>
                      <View style={styles.contacticon}>
                        <Text style={styles.contacticonsymbol}>
                          {item[0].toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.contactnametext}>{item}</Text>
                    </View>
                    {selectedContacts[index] ? (
                      <View style={styles.selectview}>
                        <View style={styles.innerselectview}></View>
                      </View>
                    ) : (
                      <View style={styles.selectview}></View>
                    )}
                  </View>
                </TouchableOpacity>
                <View style={styles.line}></View>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionTitle}>{title}</Text>
            )}
          />
        </View>
      ) : (
        <View style={styles.filteredContactsListView}>
          <FlatList
            data={filteredContactsList}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    const bool = false;
                    // setSelectedFlag(!bool);
                    setSelectedContacts(prev => {
                      if (prev[index]) {
                        showSelectedContacts(item, bool);
                        return {...prev, [index]: bool};
                      } else {
                        showSelectedContacts(item, !bool);
                        return {...prev, [index]: !bool};
                      }
                    });
                  }}>
                  <View style={styles.contactview}>
                    <View style={styles.contacticonnameflex}>
                      <View style={styles.contacticon}>
                        <Text style={styles.contacticonsymbol}>
                          {item[0].toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.contactnametext}>{item}</Text>
                    </View>
                    {selectedContacts[index] ? (
                      <View style={styles.selectview}>
                        <View style={styles.innerselectview}></View>
                      </View>
                    ) : (
                      <View style={styles.selectview}></View>
                    )}
                  </View>
                </TouchableOpacity>
                <View style={styles.line}></View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

export default ShowContacts;

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
  searchbarview: {
    backgroundColor: 'rgba(6, 51 ,164, 0.1)',
  },
  innersearchbarview: {
    margin: 10,
  },
  inputstyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
  },
  contacticon: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contacticonsymbol: {
    fontSize: 18,
    color: 'white',
  },
  contactview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  selectview: {
    height: 28,
    width: 28,
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: 'grey',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerselectview: {
    height: 18,
    width: 18,
    borderRadius: 18,
    backgroundColor: 'steelblue',
  },
  contacticonnameflex: {
    flexDirection: 'row',
  },
  contactnametext: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'ARIALMTMEDIUM',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    borderWidth: 0.2,
    borderColor: 'grey',
  },
  selectedcontactname: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    fontFamily: 'Raleway-Light',
  },
  selectedcontactsview: {
    margin: 10,
  },
  selectedContactsFlex: {
    marginLeft: 10,
  },
  alphabettext: {
    fontSize: 13,
    color: 'steelblue',
  },
  contactsalphabetsflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alphabetsflex: {
    justifyContent: 'center',
  },
  separatorHeading: {
    fontSize: 20,
    color: 'black',
  },
  selectedParticipants: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 25,
    paddingLeft: 10,
    color: 'black',
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    color: 'coral',
  },
});
