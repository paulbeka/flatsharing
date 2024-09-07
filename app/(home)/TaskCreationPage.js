import React, { useState } from "react";
import { 
  Text, StyleSheet, View, ScrollView, TextInput, TouchableHighlight
} from "react-native";
import { useEnvironmentsStore } from '../store/EnvironmentsContext';
import { Stack, useRouter } from "expo-router";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import CustomButton from "../components/Buttons/CustomButton";
import Icon from "react-native-vector-icons/AntDesign";
import { Task } from "../objects/Task";
import TimePicker from "../components/GeneralUtil/TimePicker";
import FlatmatePicker from "../components/GeneralUtil/FlatmatePicker";
import LoadingIcon from "../components/LoadingIcon";


const TaskCreationPage = () => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter();
  const environment = environmentsStore.getEnvironment(0);
  
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskIcons, setTaskIcons] = useState([
    // todo: get the icons dynamically
    {name: "home"}, {name: "save"}, {name: "team"}, {name: "lock"}
  ])
  const [selectedTaskIcon, setSelectedTaskIcon] = useState("home")
  const [taskType, setTaskType] = useState(null)
  const [flatmatesIncluded, setFlatmatesIncluded] = useState(
    environment.flatmates.map((x) => {return {"name": x, "isIncluded": true}})
  )
  const [timeInterval, setTimeInterval] = useState(1)
  const [error, setError] = useState(null)

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium,
    Bold: Quicksand_700Bold
  });

  const handleCreateTask = () => {
    if(taskName === "" || taskType === null || flatmatesIncluded.length <= 0) {
      setError("Please make sure the required fields are completed.")
      return
    }

    if(environment.tasks !== undefined && 
       environment.tasks !== null &&
       environment.tasks.map(item => item.name).includes(taskName)) {
      setError("Name for task already taken. Please choose a different name.")
      return
    }

    const flatmates = flatmatesIncluded.map(item => item.name);

    const time = timeInterval !== "" ? parseInt(timeInterval) : null;
    const newTask = Task(taskName, taskDescription, taskType, flatmates, selectedTaskIcon, time);

    if(environment.tasks) {
      environment.tasks.push(newTask);
    } else {
      environment.tasks = [newTask];
    }
    environmentsStore.setEnvironment(environment);

    router.replace("/");
  }

  if (!fontsLoaded) {
    return <LoadingIcon />
  }

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 20}}>Create a task</Text>
        </View>

        <View style={styles.inputTextView}>
          <View style={styles.inputForm}>
            <Text style={{fontFamily: 'Regular', marginBottom: 5}}>Task name:</Text>
            <TextInput
              value={taskName}
              onChangeText={setTaskName} 
              style={styles.inputBar}
              placeholder="Name..."
            />
          </View>

          <View style={styles.inputForm}>
            <Text style={{fontFamily: 'Regular', marginBottom: 5}}>Task description (optional):</Text>
            <TextInput 
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={styles.inputBar}
              placeholder="Description..."
            />
          </View>
        </View>

        <View style={{width: '90%'}}>
          <Text style={{fontFamily: 'Bold', fontSize: 15, marginTop: 5}}>Choose task icon</Text>
        </View>

        <View style={styles.iconChooserView}>
          <Icon name={selectedTaskIcon} size={50} style={{ padding: 10}}/>
          <ScrollView style={{ maxHeight: 100 }} horizontal={true}>
            {taskIcons.map((icon) => {
              return <Icon size={50} style={styles.iconSelection} name={icon.name} onPress={
                () => {setSelectedTaskIcon(icon.name)}} />
            })}
          </ScrollView>
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
              <Text style={{fontFamily: "Regular"}}>Set tasks to rotate when they are completed.</Text>
            </View>
          </TouchableHighlight>
        </View>

        <TimePicker 
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval} 
          taskType={taskType} 
        />

        <View style={{width:'90%', justifyContent: 'center'}}>
          <FlatmatePicker 
            flatmatesIncluded={flatmatesIncluded}
            setFlatmatesIncluded={setFlatmatesIncluded}
          />
        </View>
        
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : <></>}

        <CustomButton doFunction={handleCreateTask} />

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
  },
  suggestionScrollView: {
    width: '90%',
    height: 120,
    margin: 10,
  },
  suggestionView: {
    padding: 10,
    marginRight: 5,
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
    aspectRatio: 0.8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskTypeSelected: {
    backgroundColor: 'lightgray'
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
  },
  iconChooserView: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 15,
  },
  iconSelection: {
    marginLeft: 10,
    height: 70,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 35,
    padding: 10
  }
})


export default TaskCreationPage