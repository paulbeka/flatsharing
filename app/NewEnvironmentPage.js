import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const NewEnvironmentPage = () => {
  const [flatname, onChangeFlatname] = useState(null);

  return (
    <SafeAreaView style={styles.newEnvironmentPage}>
      <Text style={styles.inputText}>Input flat name:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeFlatname}
        value={flatname}
        placeholder="Flat name..."
      />
      <Text style={styles.inputText}>Number of people in flat:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeFlatname}
        value={flatname}
        placeholder="Number of people..."
      />
      <Pressable style={styles.createNewEnvironmentButton}>
        <Text style={styles.createNewEnvironmentText}>Create New Environment</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newEnvironmentPage: {
    flex: 1,
    backgroundColor: '#bdf8ff',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  createNewEnvironmentButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
  },
  createNewEnvironmentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default NewEnvironmentPage;
