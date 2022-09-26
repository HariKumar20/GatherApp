import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

function RegisterScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [warnFlag, setWarnFlag] = useState(false);
  const createUser = (email, password) => {
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('logIn');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.registertext}>Register Here!</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.registerformview}>
          <View style={styles.formitemview}>
            <Text style={styles.formlabel}>Enter Your First Name</Text>
            <TextInput
              style={styles.registerforminputstyle}
              placeholder="Enter Your First Name"
            />
          </View>
          <View style={styles.formitemview}>
            <Text style={styles.formlabel}>Enter Your Last Name</Text>
            <TextInput
              style={styles.registerforminputstyle}
              placeholder="Enter Your Last Name"
            />
          </View>
          <View style={styles.formitemview}>
            <Text style={styles.formlabel}>Enter Your E-mail Id</Text>
            <TextInput
              style={styles.registerforminputstyle}
              placeholder="Enter Your E-mail Id"
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View style={styles.formitemview}>
            <Text style={styles.formlabel}>Create Your Password</Text>
            <TextInput
              style={styles.registerforminputstyle}
              placeholder="Create Your Password"
              secureTextEntry={true}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <View style={styles.formitemview}>
            <Text style={styles.formlabel}>Confirm Your Password</Text>
            <TextInput
              style={styles.registerforminputstyle}
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              onChangeText={value => setconfirmPassword(value)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              {
                if (password == confirmPassword) {
                  createUser(email, password);
                } else {
                  setWarnFlag(true);
                }
              }
            }}>
            <View style={styles.createaccountview}>
              <Text style={styles.createaccounttext}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerformview: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  registertext: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: 'teal',
    marginTop: 10,
  },
  registerforminputstyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  formlabel: {
    fontSize: 16,
    color: 'teal',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  formitemview: {
    marginBottom: 20,
  },
  createaccountview: {
    borderRadius: 10,
    backgroundColor: 'teal',
    alignItems: 'center',
  },
  createaccounttext: {
    marginVertical: 15,
    fontSize: 18,
    color: 'white',
    fontFamily: 'Raleway-SemiBold',
  },
});
