import React from 'react';
import {View, StyleSheet, Text, Image, FlatList, StatusBar} from 'react-native';

function Conversation() {
  const chatListData = [
    {
      image: require('../images/bluecircle.png'),
      chatName: 'Melody,Mayrose,Satyan,Ol....',
      message: 'Waiting for your answer',
      time: '2:25pm',
      textColor: 'red',
      online: true,
    },
    {
      image: require('../images/ItunesArtwork.png'),
      chatName: 'The Family',
      message: '2 new Answers , 3 new comments',
      time: '1:05pm',
      textColor: 'grey',
      online: true,
    },
    {
      image: require('../images/bluecircle.png'),
      chatName: 'Kopal , Aliyya',
      message: '3 new comments',
      time: '10:14am',
      textColor: 'grey',
      online: true,
    },
    {
      image: require('../images/bluecircle.png'),
      chatName: 'Satyan Gajwani',
      message: '',
      time: 'yesterday',
      textColor: 'yesterday',
      online: false,
    },
  ];
  return (
    <View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
        <View style={styles.header}>
          <Image style={styles.userimage} source={require('../images/b.png')} />
          <Text style={styles.headingtext}>Conversations</Text>
          <Image
            style={{height: 26, width: 26, borderRadius: 10}}
            source={require('../images/write.png')}
          />
        </View>
      </View>
      <View style={styles.midview}>
        <View style={{position: 'absolute'}}>
          <Image
            style={{width: 42, height: 42, borderBottomRightRadius: 40}}
            source={require('../images/topleft.png')}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.subheading}>This week's spark</Text>
        </View>
      </View>

      <View style={styles.horizontalrow}></View>
      <FlatList
        data={chatListData}
        renderItem={({item}) => (
          <View>
            <View style={styles.chatview}>
              <View style={styles.imageandmessageview}>
                <View style={styles.imagemessageflex}>
                  <Image source={item.image} style={styles.imageStyling} />
                  <View style={styles.textmessageflex}>
                    <Text style={styles.chatNameStyle}>{item.chatName}</Text>
                    <Text style={{fontSize: 15, color: item.textColor}}>
                      {item.message}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.onlinestatusandtimeflex}>
                <View style={styles.onlinestatustimeview}>
                  <View style={styles.timeflex}>
                    <Text style={styles.timetext}>{item.time}</Text>
                  </View>
                  <View style={item.online ? styles.onlinestatus : {}}></View>
                </View>
              </View>
            </View>
            <View style={styles.horizontalrow}></View>
          </View>
        )}
      />
    </View>
  );
}

export default Conversation;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  userimage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headingtext: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  midview: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  subheading: {
    fontSize: 17,
    color: 'midnightblue',
  },
  // outerview: {
  //   backgroundColor: 'rgba (6 ,51, 164, 0.1)',
  // },
  imageStyling: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  onlinestatus: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: 'dimgray',
    marginLeft: 50,
    marginTop: 5,
  },
  horizontalrow: {
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  chatview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  chatNameStyle: {
    fontSize: 18,
    color: 'black',
  },
  imagemessageflex: {
    flexDirection: 'row',
  },
  textmessageflex: {
    marginLeft: 15,
  },
  timeflex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
