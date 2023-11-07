import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


const CustomHeader = ({ title }) => {

  const [fontsLoaded] = useFonts({
    Bold: Quicksand_700Bold
  });
  
  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

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
    fontFamily: 'Bold',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default CustomHeader;
