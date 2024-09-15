import React from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/themes.js';
import { useRouter } from 'expo-router';


const WelcomePage = () => {
  const router = useRouter();

  const handleNewEnvironmentPress = () => {
    router.replace('NewEnvironmentPage');
  };

  const handleJoinNewEnvironment = () => {
    router.replace('JoinEnvironmentPage');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the flatmates sharing app!</Text>
      <Pressable style={{...styles.newEnvironmentButton, backgroundColor: "black"}} onPress={handleNewEnvironmentPress}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: "white"}}>Create your living space</Text>
      </Pressable>
      <Pressable style={{...styles.newEnvironmentButton, backgroundColor: "#C2C2C2"}} onPress={handleJoinNewEnvironment}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: "black"}}>Join an existing living space</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  newEnvironmentButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 10,
    width: '85%'
  },
});

export default WelcomePage;
