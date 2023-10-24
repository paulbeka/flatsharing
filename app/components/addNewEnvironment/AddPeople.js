import React, { useState } from "react";
import {
  StyleSheet, Text, TextInput, SafeAreaView, Pressable, View, Dimensions
} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';


const AddPeople = ({ nextItem, previousItem, setEnvironmentDetails }) => {
  const [currentNameInput, setCurrentNameInput] = useState("")
  const [listOfPeople, setListOfPeople] = useState(["John", "Harris"])
  const [error, setError] = useState(null);

  const onAddPersonToList = () => {
    if (currentNameInput !== "" && !listOfPeople.includes(currentNameInput)) {
      setListOfPeople([...listOfPeople, currentNameInput]);
      setCurrentNameInput("");
      if(error) {
        setError(null)
      }
    }
  }

  const handleClick = () => {
    if(listOfPeople.length <= 0) {
      setError("You need to add people to the list.")
    } else {
      setEnvironmentDetails(environmentDetails => ({...environmentDetails, peopleList: listOfPeople}))
      nextItem()
    }
  }

  const handleBackButton = () => {
    previousItem()
  }

  const removeItemFromList = (person) => {
    const newList = listOfPeople.filter((item) => item !== person);
    setListOfPeople(newList);
  }

  return (
    <SafeAreaView style={styles.newEnvironmentPage}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.namesScrollView}>
        <View style={styles.inputPersonView}>
          <Text style={styles.inputText}>Input person's name:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setCurrentNameInput}
            value={currentNameInput}
            placeholder="Person's name"
          />
          <Pressable onPress={onAddPersonToList} style={styles.addPersonButton}>
            <Text style={{fontWeight: "bold"}}>Add Person</Text>
          </Pressable>
          {error !== null ? 
          <Text style={{color: 'red'}}>{error}</Text> 
          : <></>}
        </View>

        <View
          style={{
            width: Dimensions.get('window').width - 40,
            marginBottom: 10,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        {listOfPeople.map((person, key) => {
          return (
            <View style={styles.personAdded} key={key}>
              <Pressable onPress={() => removeItemFromList(person)}>
                <Ionicons name="md-close" size={32} color="green" style={styles.closeIcon} />
              </Pressable>
              <Text style={styles.personName}>{person}</Text>
            </View>
          );
        })}
      </ScrollView>
      
      <View style={styles.buttonsView}>
        <Pressable style={styles.createNewEnvironmentButton} onPress={handleClick}>
          <Text style={styles.createNewEnvironmentText}>Done</Text>
        </Pressable>
        <Pressable style={styles.backButton} onPress={handleBackButton}>
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
    alignItems: 'center'
  },
  namesScrollView: {
    alignItems: 'center',
    minWidth: Dimensions.get('window').width,
    maxWidth: Dimensions.get('window').width
  },
  inputPersonView: {
    flex: 1,
    width: '90%',
    padding: 20
  },
  input: {
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
    marginTop: 20,
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
  buttonsView: {
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    marginTop: 10
  },
  addPersonButton: {
    borderRadius: 5,
    backgroundColor: '#76d676',
    padding: 10,
    alignItems: 'center',
  },
  personAdded: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d1d1d1'
  },
  closeIcon: {
    color: 'black',
    marginRight: 10,
  },
  personName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPeople;