import React, { useState } from "react";
import {
  StyleSheet, Text, TextInput, SafeAreaView, Pressable, View
} from 'react-native'

const CreateEnvironmentName = ({nextItem, setEnvironmentDetails}) => {
  const [flatname, onChangeFlatname] = useState(null);

  const handleClick = () => {
    setEnvironmentDetails(environmentDetails => ({...environmentDetails, name: flatname}))
    nextItem()
  }

  return (
    <SafeAreaView style={styles.newEnvironmentPage}>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>Input flat name:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeFlatname}
          value={flatname}
          placeholder="Flat name..."
        />
      </View>
      
      
      <View>
        <Pressable style={styles.createNewEnvironmentButton} onPress={handleClick}>
        <Text style={styles.createNewEnvironmentText}>Next</Text>
      </Pressable>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  newEnvironmentPage: {
    flex: 1,
    backgroundColor: '#bdf8ff',
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    width: '100%'
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

export default CreateEnvironmentName