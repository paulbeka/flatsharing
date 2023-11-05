import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#80BDD7',
    borderRadius: 20,
    padding: 20,
    paddingTop: 45
  },
  headerTitle: {
    color: 'black',
    fontFamily: 'QuicksandBold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CustomHeader;
