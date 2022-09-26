import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

function FindFriends() {
  const [modalValue, setModalValue] = useState(false);
  const [backgroundFlag, setBackgroundFlag] = useState(false);
  return (
    <View style={backgroundFlag ? {opacity: 0.5} : {}}>
      <View style={styles.headerview}>
        <View style={styles.conversationview}>
          <Image
            style={styles.userimagestyle}
            source={require('../images/b.png')}></Image>
          <View style={styles.headingtextflex}>
            <Text style={styles.headingtext}>Conversations</Text>
          </View>
          <Image
            style={styles.writeimagestyle}
            source={require('../images/write.png')}
          />
        </View>
      </View>
      <View style={styles.horizontalrow}></View>

      <TouchableOpacity
        onPress={() => {
          setModalValue(true);
          setBackgroundFlag(true);
        }}>
        <View style={styles.startconversationview}>
          <View style={styles.startconversationflex}>
            <Text style={styles.startconversationheading}>
              Start a Meaningful Conversation
            </Text>
            <Text style={styles.startconversationsubtext}>
              Choose who you want to deepen your relationship with.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalValue}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalValue(false);
          setBackgroundFlag(false);
        }}>
        <View style={styles.centeringview}>
          <View style={styles.modalview}>
            <View style={styles.innermodalviewtop}>
              <Text style={styles.gatherheadingtext}>
                "Gather" Would Like to Access Your Contacts
              </Text>
              <Text style={styles.gathersubtext}>
                Personal Data will be sent(but not stored) to our servers to
                check Contacts that already use Gather.
              </Text>
            </View>
            <View style={styles.gatherhorizontalrow}></View>
            <View style={styles.gatherbottomview}>
              <TouchableOpacity
                onPress={() => {
                  setModalValue(false);
                  setBackgroundFlag(false);
                }}>
                <Text style={styles.gatherbottomtext}>Don't Allow</Text>
              </TouchableOpacity>
              <Text style={styles.gatherbottomtext}>Allow</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default FindFriends;

const styles = StyleSheet.create({
  conversationview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  horizontalrow: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  userimagestyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  writeimagestyle: {
    height: 50,
    width: 50,
  },
  headingtext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headingtextflex: {
    justifyContent: 'center',
  },
  startconversationflex: {
    marginVertical: 10,
  },
  startconversationheading: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  startconversationsubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  startconversationview: {
    borderWidth: 1,
    borderColor: 'rgb(244 , 219, 219)',
    marginTop: 20,
    marginHorizontal: 20,
  },
  modalview: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 0.7,
    marginHorizontal: 25,
  },
  centeringview: {
    alignItems: 'center',
    marginTop: 240,
  },
  gatherheadingtext: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  gathersubtext: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    color: 'black',
  },
  gatherhorizontalrow: {
    borderWidth: 0.7,
    borderColor: 'rgb(4 ,38 ,122)',
  },
  gatherbottomtext: {
    marginLeft: 25,
    marginVertical: 20,
    marginRight: 20,
    fontSize: 18,
    color: 'rgb(74 , 144, 226)',
  },
  gatherbottomview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
