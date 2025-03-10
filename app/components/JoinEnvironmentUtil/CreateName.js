import React, { useState } from "react";
import {
  View, Text, StyleSheet, TextInput, Pressable
} from 'react-native'
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";
import { useRouter } from "expo-router";


const CreateName = () => {
  const environmentStore = useEnvironmentsStore()
  const router = useRouter()

  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const submitNameCreated = () => {
    if(name !== "") {
      environmentStore.userData = {
        "username": name
      }
    } else {
      setError("Please input a value.")
    }
    router.replace("/")
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{marginBottom: 10, textAlign: 'center'}}>
        Congratulations! You have joined the flat. What name would you like to use?
      </Text>
      <TextInput style={styles.input} onChangeText={setName} />
      {error !== "" ? <Text style={{ color: 'red' }}></Text> : <></>}
      <Pressable style={styles.setNameButton} onPress={submitNameCreated}>
        <Text>Set Name</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  setNameButton: {
    backgroundColor: '#80BDD7',
    borderRadius: 15,
    width: '90%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 30
  },
  input: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 15,
    paddingLeft: 20,
    height: 60,
    width: '90%',
  },
})

export default CreateName