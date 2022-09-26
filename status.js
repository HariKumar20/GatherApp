import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

function StatusBar() {
  const flatListData = [
    {
      date: 'Today , July 20',
      status: 'Completed , Submitted',
      statusColor: true,
    },
    {
      date: 'Sunday , July 19',
      status: 'Awaiting Submissions (1 site)',
      statusColor: false,
    },
    {
      date: 'Saturday , July 18',
      status: 'Awaiting Approval (2 sites)\nAwaiting Submissions (3 sites)',
      statusColor: false,
    },
    {
      date: 'Friday , July 17',
      status: 'Sent for Signatures',
      statusColor: false,
    },
    {
      date: 'Thursday , July 16',
      status: 'Sent for Signatures',
      statusColor: false,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.allstatusview}>
        <FlatList
          data={flatListData}
          renderItem={({item}) => (
            <View>
              <View style={styles.statuslist}>
                <View
                  style={
                    item.statusColor
                      ? styles.statustellerviewActive
                      : styles.statustellerview
                  }></View>
                <View style={styles.dateandstatustextview}>
                  <View style={styles.datestatusflex}>
                    <Text style={styles.datetext}>{item.date}</Text>
                    <Text style={styles.statustext}>{item.status}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default StatusBar;

const styles = StyleSheet.create({
  statuslist: {
    borderWidth: 1,
    borderColor: '#E9ECF4',
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 12,
    borderRadius: 5,
    overflow: 'hidden',
  },
  statustellerview: {
    width: 5,
    backgroundColor: '#8B94B3',
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  statustellerviewActive: {
    width: 5,
    backgroundColor: 'green',
  },
  datetext: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  statustext: {
    fontSize: 16,
  },
  dateandstatustextview: {
    marginLeft: 16,
  },
  datestatusflex: {
    marginVertical: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
