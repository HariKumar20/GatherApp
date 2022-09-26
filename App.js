import React, {createContext, useEffect, useState} from 'react';
import NoContacts from './src/screens/noContacts';
import ShowContacts from './src/screens/showContacts';
import LogIn from './src/screens/logIn';
import CreateGroup from './src/screens/createGroup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SparkScreen from './src/screens/sparkScreen';
import FillSpark from './src/screens/fillSpark';
import FillSparker from './src/screens/fillSparker';
import ImageScreen from './src/screens/imageScreen';
import ShareScreen from './src/screens/shareScreen';
import {CreateGroupHeader} from './src/components/headers/createGroupHeader';
import GroupDetailsScreen from './src/screens/groupDetailsScreen';
import SwipeScreen from './src/screens/swipeScreen';
import SparkScreenHeader from './src/components/headers/sparkScreenHeader';
import RegisterScreen from './src/screens/registerScreen';
import database from '@react-native-firebase/database';
const Stack = createNativeStackNavigator();
export const UserContext = createContext('MyContext');

function App() {
  const [userId, setUserId] = useState('');
  const [selectedContactsListForGroup, setSelectedContactsListForGroup] =
    useState([]);
  const [groupDescription, setGroupDescription] = useState('');
  const [groupName, setGroupName] = useState('');
  const [gatherFlag, setGatherFlag] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const [groupsList, setGroupsList] = useState([]);
  const [contactsData, setContactsData] = useState({});
  const [toShareGroupslist, setToShareGroupsList] = useState([]);
  const [answersObject, setAnswersObject] = useState({});
  const [sparkImageSrc, setSparkImageSrc] = useState();
  sparkData = [
    {text: 'This week is ', viewComponent: false},
    {text: 'all about', viewComponent: true},
    {text: ' for me.', viewComponent: false},
    {text: 'My morning ', viewComponent: true},
    {text: 'energizes me. ', viewComponent: false},
    {text: 'In the evening,', viewComponent: false},
    {text: 'i like to ', viewComponent: false},
    {text: "i'm so ready ", viewComponent: true},
    {text: ' to try ', viewComponent: true},
    {text: ' & stop ', viewComponent: true},
    {
      text: '  real soon.',
      viewComponent: false,
    },
    {
      text: 'This is my favourite ',
      viewComponent: false,
    },
    {
      text: 'spot at home:',
      viewComponent: false,
    },
  ];

  useEffect(() => {
    const newReference = database().ref('/weeklySparks').push();
    newReference.set({
      weekSparkData: sparkData,
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        groupDescription,
        setGroupDescription,
        groupName,
        setGroupName,
        selectedContactsListForGroup,
        setSelectedContactsListForGroup,
        gatherFlag,
        setGatherFlag,
        imageSource,
        setImageSource,
        groupsList,
        setGroupsList,
        contactsData,
        setContactsData,
        toShareGroupslist,
        setToShareGroupsList,
        answersObject,
        setAnswersObject,
        sparkImageSrc,
        setSparkImageSrc,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="logIn"
            component={LogIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="register"
            options={{headerShown: false}}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="noContacts"
            options={{headerShown: false}}
            component={NoContacts}
          />
          <Stack.Screen
            name="swipeScreen"
            component={SwipeScreen}
            options={({navigation}) => ({
              header: () => <SparkScreenHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="sparkScreen"
            component={SparkScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="fillSpark"
            component={FillSpark}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="shareScreen"
            component={ShareScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="contactsList"
            component={ShowContacts}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="createGroup"
            component={CreateGroup}
            options={({navigation}) => ({
              header: () => <CreateGroupHeader navigation={navigation} />,
            })}
          />

          <Stack.Screen
            name="imageScreen"
            component={ImageScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
    // <CreateGroup />
    // <EvaluationScreen />
  );
}

export default App;
