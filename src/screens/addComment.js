import React from 'react';
import {Text, View, Image, TextInput, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
function AddComment() {
  const commentsData = [
    ['What do you mean by that?', "You've got to be kidding."],
    ['I need every little detail', 'Tell me the whole story'],
    ['I need every little detail', 'Tell me the whole story'],
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View style={styles.whitehouseinternview}>
          <Icon name="left" size={30} color="black" />
          <Text style={styles.headerviewtext}>white house interns</Text>
          <Icon name="infocirlceo" size={30} color="black" />
        </View>
        <View style={styles.horizontalrow}></View>
      </View>
      <View style={styles.addcommentview}>
        <View style={styles.inneraddcomment}>
          <View style={styles.addcommentinputflex}>
            <Image
              style={styles.imagestyling}
              source={require('../images/ItunesArtwork.png')}></Image>
            <View style={styles.commentinputflex}>
              <TextInput
                style={styles.addcommentinput}
                placeholder="Add a Comment"></TextInput>
            </View>
            <View style={styles.postflex}>
              <View style={styles.postview}>
                <Text style={styles.posttext}>Post</Text>
              </View>
            </View>
          </View>
          <View style={styles.commentsview}>
            <FlatList
              data={commentsData}
              renderItem={({item}) => (
                <View>
                  <View style={styles.commentsflex}>
                    <View style={styles.commentview}>
                      <Text style={styles.commenttext}>{item[0]}</Text>
                    </View>
                    <View style={styles.commentview}>
                      <Text style={styles.commenttext}>{item[0]}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={styles.swipestyle}>
            <View style={styles.circlemodaltrue}></View>
            <View style={styles.circlemodalfalse}></View>
            <View style={styles.circlemodalfalse}></View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AddComment;

const styles = StyleSheet.create({
  whitehouseinternview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  headerviewtext: {
    fontSize: 18,
    color: 'black',
  },
  horizontalrow: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: 'grey',
  },
  postview: {
    height: 40,
    width: 70,
    backgroundColor: 'rgb(17, 134, 123)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyling: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  addcommentinputflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addcommentinput: {
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 5,
    height: 38,
    width: 240,
  },
  inneraddcomment: {
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  posttext: {
    color: 'white',
    fontSize: 16,
  },
  commentview: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: 'rgb(243 ,233 ,225)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commenttext: {
    fontSize: 16,
    color: 'rgb(17 , 134, 123)',
    marginHorizontal: 15,
    marginVertical: 10,
    textAlign: 'center',
  },
  commentsflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  circlemodaltrue: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'black',
    marginRight: 10,
  },
  circlemodalfalse: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'grey',
    backgroundColor: 'grey',
    marginRight: 10,
  },
  swipestyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  commentinputflex: {
    justifyContent: 'center',
  },
  postflex: {
    justifyContent: 'center',
  },
});
