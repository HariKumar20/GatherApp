import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NoContacts from './noContacts';
import {UserContext} from '../../App';
import auth from '@react-native-firebase/auth';

function LogIn({navigation}) {
  const [stateChanged, setstateChanged] = useState(false);
  const {userId, setUserId} = useContext(UserContext);
  const [secureText, setSecuretext] = useState('');
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPassword, setLogInpassword] = useState('');
  const [usernotFoundFlag, setUserNotFoundFlag] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setstateChanged(true);
      setUserId(user?.uid);
    });
  }, []);

  const emailSignIn = (logInEmail, logInPassword) => {
    if (logInEmail && logInPassword) {
      auth()
        .signInWithEmailAndPassword(logInEmail, logInPassword)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          setUserNotFoundFlag(true);
        });
    }
  };
  return stateChanged ? (
    <NoContacts navigation={navigation} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.headingtext}>Gather </Text>
      <Text style={styles.logintext}>Log In</Text>
      <View style={styles.formview}>
        <Text style={styles.formlabel}>Enter Your Email</Text>
        <View style={styles.textinputview}>
          <TextInput
            style={styles.forminputstyle}
            placeholder="Enter Mail Id"
            onChangeText={value => {
              setLogInEmail(value);
              setUserNotFoundFlag(false);
            }}
          />
          {usernotFoundFlag ? (
            <Text style={styles.warniningtext}>
              Please! Create Your Account and Try Again.
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <Text style={styles.formlabel}>Enter Your Password</Text>
        <View style={styles.textinputview}>
          <TextInput
            style={styles.forminputstyle}
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={value => setLogInpassword(value)}
          />
        </View>
        <TouchableOpacity
          onPress={() => emailSignIn(logInEmail, logInPassword)}>
          <View style={styles.loginview}>
            <Text style={styles.loginviewtext}>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.passwordtextview}>
            <Text style={styles.passwordtext}>Forget Password ?</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.createaccount}>
        <Text style={styles.accountquestion}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.registerheretext}>Register Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  logintext: {
    fontSize: 20,
    color: 'green',
    alignSelf: 'center',
  },
  headingtext: {
    fontSize: 35,
    color: 'teal',
    alignSelf: 'center',
    fontFamily: 'Raleway-Medium',
  },
  signingtext: {
    fontSize: 18,
    color: 'white',
    marginVertical: 15,
    marginHorizontal: 25,
  },
  forminputstyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    // marginHorizontal: 30,
  },
  formview: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  formlabel: {
    marginTop: 20,
    fontSize: 18,
    color: 'teal',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  loginviewtext: {
    marginVertical: 15,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
  loginview: {
    backgroundColor: 'teal',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  passwordtextview: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  passwordtext: {
    fontFamily: 'Raleway-Medium',
    color: 'steelblue',
  },
  createaccount: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  accountquestion: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  registerheretext: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: 'steelblue',
  },
  warniningtext: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
  },
});
