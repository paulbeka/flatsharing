import React from "react";
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const CustomButton = ({ doFunction }) => {

  return (
    <Pressable onPress={doFunction}>
      <LinearGradient colors={["#1ABAFF", "#3776D5"]} style={styles.button}>
        <Text style={styles.buttonText}>Create Task</Text>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  }, 
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})

export default CustomButton