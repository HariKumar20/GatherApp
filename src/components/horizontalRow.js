import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function HorizontalRow({borderWidthUnits, borderColorUnits}) {
  return (
    <View
      style={{
        borderWidth: borderWidthUnits,
        borderColor: borderColorUnits,
        width: '100%',
        opacity: 0.2,
      }}
    />
  );
}
export default HorizontalRow;
