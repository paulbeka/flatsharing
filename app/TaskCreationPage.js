import React, { useState } from "react";
import { 
  SafeAreaView, Text, StyleSheet, View, ScrollView, TextInput, TouchableHighlight, Pressable
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import { Stack, useRouter } from "expo-router";
import CustomHeader from "./components/StackHeader/CustomHeader"
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


const TaskCreationPage = () => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter();
  const environment = environmentsStore.getEnvironmentByIndex(0);
  
  const [suggestions, setSuggestions] = useState([{"title": "Test"}, {"title": "Test"}, {"title": "Test"}])
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskIcons, setTaskIcons] = useState([])
  const [taskType, setTaskType] = useState(null)
  const [flatmatesIncluded, setFlatmatesIncluded] = useState(environment.flatmates)

  const [taskInterval, setTaskInterval] = useState(null)
  const [unit, setUnit] = useState('days');

  const [error, setError] = useState(null)

  const [fontsLoaded] = useFonts({
    Quicksand: Quicksand_400Regular,
    Regular: Quicksand_500Medium,
    Bold: Quicksand_700Bold
  });

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


  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{marginLeft: 10, marginRight: 10}}>
        <Stack.Screen
          component={CustomHeader}
          options={{
            headerShown: true,
            header: ({ route, navigation }) => (
              <CustomHeader title={environment.name} />
            ),
          }}
        />

        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 20, marginTop: 5}}>Task Suggestions</Text>
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

        {/* Add an icon functionality here */}
        
        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 20}}>Create a task</Text>
        </View>

        <View style={styles.inputTextView}>
          <View style={styles.inputForm}>
            <Text style={{fontFamily: 'Regular', marginBottom: 5}}>*Task name:</Text>
            <TextInput
              value={taskName}
              onChangeText={setTaskName} 
              style={styles.inputBar}
              placeholder="Name..."
            />
          </View>

          <View style={styles.inputForm}>
            <Text style={{fontFamily: 'Regular', marginBottom: 5}}>Task description:</Text>
            <TextInput 
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={styles.inputBar}
              placeholder="Description..."
            />
          </View>
        </View>

        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 15, marginTop: 5}}>Task Type</Text>
        </View>

        <View style={styles.typeTaskChooser}>
          <TouchableHighlight underlayColor={'gray'} 
          style={[styles.typeTaskView, taskType === 0 ? styles.taskTypeSelected : null]} onPress={() => setTaskType(0)}>
            <View style={styles.taskType}>
              <View style={styles.taskTypeImage}>
                {/* Add the image for task type here */}
              </View>
              <Text style={{fontFamily: "Regular"}}>Periodic</Text>
              <Text style={{fontFamily: "Regular"}}>Set tasks to rotate periodically.</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'gray'}
          style={[styles.typeTaskView, taskType === 1 ? styles.taskTypeSelected : null]} onPress={() => setTaskType(1)}>
            <View style={styles.taskType}>
              <View style={styles.taskTypeImage}>
                {/* Add the image for task type here */}
              </View>
              <Text style={{fontFamily: "Regular"}}>Ad Hoc</Text>
              <Text style={{fontFamily: "Regular"}}>Set tasks to rotate as they are completed.</Text>
            </View>
          </TouchableHighlight>
        </View>

        {renderTaskTypeSelector()}

        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 15, marginTop: 5}}>Task Type</Text>
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
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
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
    borderColor: '#80BDD7',
    borderRadius: 15,
    padding: 10
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
    width: '40%',
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
    backgroundColor: '#80BDD7',
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTypeImage: {
    width: '50%',
    aspectRatio: 1,
    borderWidth: 1
  },
  taskType: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default TaskCreationPage