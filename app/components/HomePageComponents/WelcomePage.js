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
      <Pressable style={styles.newEnvironmentButton} onPress={handleNewEnvironmentPress}>
        <Text style={styles.buttonText}>Create New Environment</Text>
      </Pressable>
      <Pressable style={styles.newEnvironmentButton} onPress={handleJoinNewEnvironment}>
        <Text style={styles.buttonText}>Join Environment</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    marginBottom: 10,
    width: '80%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
