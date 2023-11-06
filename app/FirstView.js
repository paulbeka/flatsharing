import React from "react";
import {
  View, StyleSheet, Pressable, Text
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


const FirstView = () => {

  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold
  });

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen 
        options={{headerShown: false}}
      />
      <View style={styles.logo}>

      </View>

      <View style={styles.buttonView}>
        <Pressable style={{...styles.button, backgroundColor: '#80BDD7'}} onPress={() => { router.replace("Register") }}>
          <Text style={{ fontFamily: 'Quicksand_700Bold' }}>Sign Up</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => { router.replace("Login") }}>
          <Text style={{ fontFamily: 'Quicksand' }}>Log In</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderWidth: 1,
    width: '70%',
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 20
  },
  buttonView: {
    width: '70%'
  },
  button: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})

export default FirstView