import React, { useState } from "react";
import { 
  SafeAreaView, Text, StyleSheet, View, ScrollView, TextInput, TouchableHighlight, Pressable
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import { useRouter } from "expo-router";


const TaskCreationPage = () => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter();
  const environment = environmentsStore.getEnvironmentByIndex(0);
  
  const [suggestions, setSuggestions] = useState([{"title": "Test"}, {"title": "Test"}, {"title": "Test"}])
  const [taskName, setTaskName] = useState("TestName")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskIcons, setTaskIcons] = useState([])
  const [taskType, setTaskType] = useState(null)
  const [flatmatesIncluded, setFlatmatesIncluded] = useState(environment.flatmates)

  const [taskInterval, setTaskInterval] = useState(null)
  const [unit, setUnit] = useState('days');

  const [error, setError] = useState(null)
  

  const handleCreateTask = () => {
    if(taskName === "" || taskType === null || flatmatesIncluded.length <= 0) {
      setError("Please make sure the required fields are completed.")
      return
    }

    const newTask = {
      "name": taskName,
      "description": taskDescription,
      "type": taskType,
      "flatmatesIncluded": flatmatesIncluded
    }

    environment.tasks.push(newTask)
    environmentsStore.setEnvironment(environment)

    router.replace("/")
  }

  const renderTaskTypeSelector = () => {
    if (taskType === 0) {
      return (
        <View>
          <Text>Select your task interval here:</Text>
          <Picker
                selectedValue={unit}
                onValueChange={(itemValue) => setUnit(itemValue)}
            >
                <Picker.Item label="Days" value="days" />
                <Picker.Item label="Weeks" value="weeks" />
                {/* Add more time units as needed */}
            </Picker>
          </View>
      )
    } else if (taskType === 1) {
      return (
        <View>
          <Text>Select bins options here.</Text>
        </View>
      )
    } else {
      return <></>
    }
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ width: '90%' }}>
        <Text style={styles.suggestionTitleText}>Suggestions:</Text>
      </View>
      <ScrollView horizontal={true} style={styles.suggestionScrollView}>
        {suggestions.map((suggestion, key) => {
          return (
            <View style={styles.suggestionView}>
              <Text>{suggestion.title}</Text>
            </View>
          )
        })}
      </ScrollView>

      <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 80, textAlign: 'center'}}>Create Task</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      {/* Add an icon functionality here */}

      <View style={styles.inputTextView}>
        <View style={styles.inputForm}>
          <Text>Task name:</Text>
          <TextInput
            value={taskName}
            onChangeText={setTaskName} 
            style={styles.inputBar}
          />
        </View>

        <View style={styles.inputForm}>
          <Text>Task description:</Text>
          <TextInput 
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.inputBar} 
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 10}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 80, textAlign: 'center'}}>Type of Task</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <View style={styles.typeTaskChooser}>
        <TouchableHighlight underlayColor={'gray'} 
        style={[styles.typeTaskView, taskType === 0 ? styles.taskTypeSelected : null]} onPress={() => setTaskType(0)}>
          <View>
            <Text>Task 1</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={'gray'}
        style={[styles.typeTaskView, taskType === 1 ? styles.taskTypeSelected : null]} onPress={() => setTaskType(1)}>
          <View>
            <Text>Task 2</Text>
          </View>
        </TouchableHighlight>
      </View>

      {renderTaskTypeSelector()}

      <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 10}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 120, textAlign: 'center'}}>Flatmates included</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <ScrollView horizontal={true} style={styles.flatmatePicker}>
        {flatmatesIncluded.map((flatmate, key) => {
          return (
            <View style={styles.flatmateView}>
              <Text>{flatmate}</Text>
            </View>
          )
        })}
      </ScrollView>
      
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : <></>}

      <Pressable onPress={handleCreateTask}>
        <View style={styles.createTaskButton}>
          <Text style={styles.buttonText}>Create Task</Text>
        </View>
      </Pressable>


    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
  },
  suggestionTitleText: {
    color: 'lightgray',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'left'
  }, 
  suggestionScrollView: {
    width: '90%',
    margin: 10,
  },
  suggestionView: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: 70,
    height: 70,
    borderWidth: 1
  },
  inputForm: {
    marginTop: 10
  },
  inputTextView: {
    width: '90%'
  }, 
  inputBar: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5
  },
  typeTaskChooser: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 'auto',
    marginBottom: 10
  },
  typeTaskView: {
    borderWidth: StyleSheet.hairlineWidth,
    width: '35%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskTypeSelected: {
    backgroundColor: 'lightgray'
  },
  flatmateView: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  createTaskButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})


export default TaskCreationPage