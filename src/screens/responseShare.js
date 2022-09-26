import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

function ShareResponse() {
  const usersData = [
    {
      chatName: 'Melody, Mayrose , Satyan ,Ol..',
      image: require('../images/bluecircle.png'),
    },
    {
      chatName: 'The Family',
      image: require('../images/bluecircle.png'),
    },
    {
      chatName: 'Kopal , Aliyya',
      image: require('../images/bluecircle.png'),
    },
    {
      chatName: 'Satyan Gajwani',
      image: require('../images/bluecircle.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View></View>
        <View></View>
        <Text style={styles.shareresponsetext}>Share Your Response </Text>

        <Text style={styles.canceltext}>Cancel</Text>
      </View>
      <View style={styles.horizontalrow}></View>
      <View style={styles.existingconversationflex}>
        <Text style={styles.existingtext}>EXISTING CONVERSATIONS</Text>
        <Text style={styles.selectalltext}>Select All</Text>
      </View>
      {/* <ScrollView> */}
      <View>
        <FlatList
          data={usersData}
          renderItem={({item}) => (
            <View>
              <View style={styles.chatview}>
                <View style={styles.imagechatnameview}>
                  <Image
                    source={item.image}
                    style={styles.imagestyling}></Image>
                  <View style={styles.chatnameflex}>
                    <Text style={styles.chatnametext}>{item.chatName}</Text>
                  </View>
                </View>
                <View style={styles.selectshareflex}>
                  <View style={styles.checkbuttonview}></View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <ScrollView>
        <View style={styles.newconversationviewflex}>
          <View style={styles.newconversationview}>
            <Text style={styles.titletext}>
              Start a new conversation on Gather
            </Text>
            <Text style={styles.subtext}>
              Click here and select members of your new conversation
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.shareview}>
        <Text style={styles.sharetext}>Share</Text>
      </View>
    </View>
  );
}

export default ShareResponse;

const styles = StyleSheet.create({
  headerview: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareresponsetext: {
    fontSize: 19,
    color: 'black',
  },
  canceltext: {
    color: 'rgb(74 , 144 ,226)',
    fontSize: 18,
  },
  existingconversationflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  horizontalrow: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  selectalltext: {
    color: 'rgb(74 , 144 ,226)',
    fontSize: 15,
  },
  imagestyling: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  imagechatnameview: {
    flexDirection: 'row',
  },
  chatnametext: {
    marginLeft: 15,
    fontSize: 18,
    color: 'black',
  },
  chatview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 10,
  },
  checkbuttonview: {
    height: 30,
    width: 30,
    borderWidth: 0.8,
    borderRadius: 20,
  },
  chatnameflex: {
    justifyContent: 'center',
  },
  selectshareflex: {
    justifyContent: 'center',
  },
  newconversationview: {
    width: 335,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(244 , 219, 219)',
  },
  newconversationviewflex: {
    alignItems: 'center',
  },
  titletext: {
    marginVertical: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  shareview: {
    height: 60,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sharetext: {
    marginRight: 20,
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 18,
  },
});
