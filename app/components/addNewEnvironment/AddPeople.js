import React, { useState } from "react";
import {
  StyleSheet, Text, TextInput, SafeAreaView, Pressable, View
} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";


const AddPeople = ({ nextItem, setEnvironmentDetails }) => {
  const [currentNameInput, setCurrentNameInput] = useState("")
  const [listOfPeople, setListOfPeople] = useState([])

  const onAddPersonToList = () => {

  }

  const handleClick = () => {
    setEnvironmentDetails(environmentDetails => ({...environmentDetails, name: flatname}))
    nextItem()
  }

  return (
    <SafeAreaView style={styles.newEnvironmentPage}>
      <ScrollView style={styles.namesScrollView}>
        <Text style={styles.inputText}>Input person's name:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setCurrentNameInput}
          value={currentNameInput}
          placeholder="Person's name"
        />
      </ScrollView>
      
      <View>
        <Pressable style={styles.createNewEnvironmentButton} onPress={handleClick}>
          <Text style={styles.createNewEnvironmentText}>Next</Text>
        </Pressable>
        <Pressable style={styles.backButton} onPress={handleClick}>
          <Text style={styles.backText}>Back</Text>
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
  namesScrollView: {
    flex: 1
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
  backButton: {
    backgroundColor: '#d1d1d1',
    borderWidth: 1,
    marginTop: 5,
    bottom: 0,
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
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
  },
  backText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPeople;